# Plunk Setup Guide for WASAW Contact Form

## Overview
This guide explains how the WASAW contact form works with Plunk. **Important**: Unlike EmailJS, Plunk doesn't use pre-created templates. Instead, we send HTML emails directly from our server code.

## How It Actually Works

### 🔧 **The Technical Setup**
1. **Server-Side Processing**: Form submissions go to `/api/contact` endpoint
2. **Direct HTML Emails**: Email templates are built into the server code
3. **Dual Email Sending**: System sends two emails simultaneously:
   - **Agent Notification** → Goes to selected agent or info@wasaw.com
   - **Client Auto-Reply** → Goes to the person who submitted the form

### 📧 **Email Flow**
```
User submits form → Server API → Plunk API → Two emails sent:
├── Agent gets: "New Lead Alert" email
└── Client gets: "Thank You" confirmation email
```

## What You Need to Do

### Step 1: Verify Your Plunk Account
1. Go to [Plunk Dashboard](https://app.useplunk.com/)
2. Sign in with your account
3. Your API key is already configured: `sk_70c403f6b9aa94db42a5110ba68bb86bc4f18d2a38caa7ff`

### Step 2: Set Up Domain (Recommended)
1. In Plunk dashboard → **Settings** → **Domains**
2. Add your domain: `wasaw.com`
3. Follow DNS verification steps
4. This improves email deliverability and prevents spam filtering

### Step 3: Test the System
1. Start your development server: `npm run dev`
2. Go to contact page: `http://localhost:5173/contact`
3. Fill out and submit the form
4. Check that you receive **both emails**:
   - Agent notification (to selected agent or info@wasaw.com)
   - Client confirmation (to the email address entered in form)

## Email Templates Explained

### 🚨 **Agent Notification Email**
**Purpose**: Alert agents about new leads
**Recipient**: Selected agent's email or info@wasaw.com
**Subject**: `New Contact Form Submission from [Client Name]`

**Contains**:
- 🔔 Priority lead alert
- Complete contact information
- Client's message
- Submission timestamp
- Next steps for agent

### ✅ **Client Auto-Reply Email**
**Purpose**: Confirm receipt to client
**Recipient**: Client's email address
**Subject**: `Thank you for contacting WASAW - We'll be in touch soon!`

**Contains**:
- Thank you message
- What happens next
- Response time expectations
- Company contact information
- Copy of their submitted message

## Key Differences from EmailJS

| Feature | EmailJS | Plunk |
|---------|---------|-------|
| **Templates** | Created in dashboard | Built into server code |
| **Security** | Client-side API keys | Server-side only |
| **Customization** | Limited by template system | Full HTML control |
| **Variables** | `{{variable}}` syntax | JavaScript template literals `${variable}` |
| **Setup** | Multiple template IDs | Single API key |

## Agent Email Routing

The system automatically routes emails based on agent selection:

```javascript
// Agent routing logic
const agents = [
  { id: "1", name: "Waiel Grey", email: "waiel@wasaw.com" },
  { id: "2", name: "Albara Al-Shujaa", email: "albara@wasaw.com" },
  { id: "3", name: "Mohamed Aly", email: "mohamed@wasaw.com" }
];

// If agent selected → agent's email
// If no agent selected → info@wasaw.com
```

## Troubleshooting

### ❌ **"Failed to send emails" error**
**Possible causes**:
- Plunk API key is incorrect
- Network connectivity issues
- Plunk service is down

**Solutions**:
1. Check browser console for detailed error
2. Verify API key in server code
3. Test with Plunk dashboard

### 📧 **Emails not being received**
**Check these**:
1. **Spam/Junk folders** (most common issue)
2. **Email address typos** in form submission
3. **Domain verification** in Plunk dashboard
4. **Email provider blocking** (try different email)

### 🔧 **Server errors**
**Debug steps**:
1. Check server console logs
2. Verify `/api/contact` endpoint is accessible
3. Test API endpoint directly with tools like Postman

## Testing Checklist

### ✅ **Form Validation Testing**
- [ ] Submit with empty name → Should show error
- [ ] Submit with invalid email → Should show error
- [ ] Submit with short message → Should show error
- [ ] Submit valid form → Should show success

### ✅ **Email Delivery Testing**
- [ ] Test with agent selection → Agent should receive email
- [ ] Test without agent selection → info@wasaw.com should receive email
- [ ] Client should always receive auto-reply
- [ ] Check both emails have correct content

### ✅ **UI/UX Testing**
- [ ] Loading spinner shows during submission
- [ ] Success message appears after submission
- [ ] Form resets after successful submission
- [ ] Error messages are clear and helpful

## Production Deployment

### Environment Variables (Optional)
If you want to use environment variables instead of hardcoded key:

```bash
# .env
PLUNK_SECRET_KEY=sk_70c403f6b9aa94db42a5110ba68bb86bc4f18d2a38caa7ff
```

Then update server code:
```javascript
const plunk = new Plunk(process.env.PLUNK_SECRET_KEY);
```

### Hosting Platform Setup
- **Vercel**: No additional setup needed
- **Netlify**: No additional setup needed  
- **Railway**: No additional setup needed

## Monitoring & Analytics

### Plunk Dashboard Features
1. **Email Logs**: See all sent emails
2. **Delivery Status**: Track email delivery
3. **Error Logs**: Debug failed sends
4. **Usage Stats**: Monitor email volume

### Recommended Monitoring
- Check Plunk dashboard weekly for delivery issues
- Monitor server logs for API errors
- Test contact form monthly to ensure functionality

## Support & Resources

- **Plunk Documentation**: https://docs.useplunk.com/
- **Plunk GitHub**: https://github.com/useplunk/plunk
- **API Reference**: https://docs.useplunk.com/api-reference

---

## Quick Reference

### 🔑 **Your Configuration**
- **API Key**: `sk_70c403f6b9aa94db42a5110ba68bb86bc4f18d2a38caa7ff`
- **API Endpoint**: `/api/contact`
- **Method**: `POST`

### 📧 **Agent Emails**
- **Waiel Grey**: waiel@wasaw.com
- **Albara Al-Shujaa**: albara@wasaw.com  
- **Mohamed Aly**: mohamed@wasaw.com
- **General**: info@wasaw.com

### ✨ **Features Included**
- ✅ Server-side email processing (secure)
- ✅ Professional HTML email templates
- ✅ Smart agent routing
- ✅ Automatic client confirmations
- ✅ Form validation & error handling
- ✅ Loading states & user feedback
- ✅ Mobile-responsive emails
- ✅ Light/dark mode compatibility

### 🚀 **Ready to Use**
The system is fully configured and ready to use. Just test it and deploy! 