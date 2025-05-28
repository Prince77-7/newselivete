# EmailJS Setup Guide for WASAW Contact Form

## Overview
This guide will help you set up EmailJS to handle contact form submissions from your WASAW real estate website.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (e.g., `service_v3mqdmw`)

### For Gmail:
- You'll need to enable 2-factor authentication
- Generate an App Password specifically for EmailJS
- Use your Gmail address and the App Password

## Step 3: Create Email Templates

### Template 1: Main Contact Form (for agents)
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set Template Name: `WASAW Contact Form`
4. Set Template ID: `template_laljpsw`
5. Copy and paste the HTML template from `emailjs-template.html`

### Template 2: Auto-Reply (for clients) - RECOMMENDED METHOD
1. Click **Create New Template** again
2. Set Template Name: `WASAW Auto Reply`
3. Set Template ID: `template_0rmbida`
4. **IMPORTANT**: Use the simplified template from `emailjs-auto-reply-simple.html` (not the original one)
5. **IMPORTANT**: In the auto-reply template settings:
   - **To Email**: `{{from_email}}` (this sends to the client)
   - **From Name**: `WASAW Real Estate`
   - **From Email**: Your verified email address
   - **Subject**: `Thank you for contacting WASAW - We'll be in touch soon!`
   - **Reply To**: `info@wasaw.com`

**Why the simplified template?** 
- EmailJS doesn't support Handlebars conditional logic (`{{#if}}`)
- The original template had conditional statements that EmailJS can't process
- The simplified template uses only basic variable substitution that EmailJS supports

### Step 3.5: Link Auto-Reply to Main Template (RECOMMENDED)
1. Go back to your main template (`template_laljpsw`)
2. Click on the **Auto-Reply** tab
3. Select your auto-reply template (`template_0rmbida`) from the dropdown
4. Click **Save**

**This method is preferred because:**
- EmailJS automatically sends the auto-reply when the main email is sent
- It counts as one email toward your quota instead of two
- It's more reliable and simpler to manage

### Template Variables Used:
- `{{from_name}}` - Client's full name
- `{{from_email}}` - Client's email address
- `{{phone}}` - Client's phone number
- `{{message}}` - Client's message
- `{{preferred_agent}}` - Selected agent name
- `{{preferred_agent_email}}` - Selected agent's email
- `{{to_email}}` - Recipient email (agent or info@wasaw.com)
- `{{reply_to}}` - Client's email for replies
- `{{subject}}` - Email subject line
- `{{timestamp}}` - Submission timestamp

### Template Settings:

**For Main Contact Form:**
- **To Email**: `{{to_email}}`
- **From Name**: `WASAW Website`
- **From Email**: Your verified email address
- **Subject**: `{{subject}}`
- **Reply To**: `{{reply_to}}`

**For Auto-Reply:**
- **To Email**: `{{to_email}}` (client's email)
- **From Name**: `WASAW Real Estate`
- **From Email**: Your verified email address
- **Subject**: `Thank you for contacting WASAW - We'll be in touch soon!`
- **Reply To**: `info@wasaw.com`

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (starts with something like `user_...`)
3. Copy this key

## Step 5: Update Your Website Code

1. Open `src/routes/contact/+page.svelte`
2. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key:

```javascript
const EMAILJS_PUBLIC_KEY = 'your_actual_public_key_here';
```

3. Verify the Service ID and Template ID match what you created:

```javascript
const EMAILJS_SERVICE_ID = 'service_v3mqdmw';
const EMAILJS_TEMPLATE_ID = 'template_laljpsw';
```

**Note**: You don't need the auto-reply template ID in your code when using the linked auto-reply method.

## Step 6: Test the Form

1. Build and run your website
2. Go to the contact page
3. Fill out the form with test data
4. Submit the form
5. Check that you receive both emails:
   - Agent notification email
   - Client auto-reply confirmation

## Step 7: Set Up Email Routing (Optional)

To route emails to specific agents based on selection:

1. In your EmailJS template, use `{{to_email}}` as the recipient
2. The form automatically sets this to:
   - Selected agent's email if an agent is chosen
   - `info@wasaw.com` if no agent is selected

## Troubleshooting

### Common Issues:

1. **"Failed to send email" error**:
   - Check your Public Key is correct
   - Verify Service ID and Template IDs match your dashboard
   - Ensure your email service is properly configured

2. **Emails not being received**:
   - Check spam/junk folders
   - Verify the "To Email" field in your templates
   - Test with a different email address

3. **Template variables not working**:
   - Ensure variable names match exactly (case-sensitive)
   - Check that variables are wrapped in double curly braces: `{{variable_name}}`

4. **Auto-reply not working**:
   - Check that both templates are created and active
   - Verify the auto-reply template ID is correct
   - Auto-reply failures won't prevent main form submission

### Testing Tips:

1. Use EmailJS's test feature in the dashboard
2. Check the browser console for error messages
3. Start with a simple template and add complexity gradually
4. Test both templates separately

## Security Notes

- Your Public Key is safe to expose in client-side code
- Never expose your Private Key
- Consider setting up domain restrictions in EmailJS settings
- Monitor your usage to avoid hitting rate limits

## Upgrade Options

- **Free Plan**: 200 emails/month
- **Personal Plan**: $15/month for 1,000 emails
- **Team Plan**: $50/month for 5,000 emails

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

## Quick Reference

### Your Configuration:
- **Service ID**: `service_v3mqdmw`
- **Main Template ID**: `template_laljpsw`
- **Auto-Reply Template ID**: `template_0rmbida` (linked in dashboard, not used in code)
- **Public Key**: `wT5SGa2cg2CMDddwx`

### Agent Emails:
- Waiel Grey: waiel@wasaw.com
- Albara Al-Shujaa: albara@wasaw.com
- Mohamed Aly: mohamed@wasaw.com
- General: info@wasaw.com

### Features Included:
- ✅ Form validation with detailed error messages
- ✅ Loading states and disabled submit button
- ✅ Agent-specific email routing
- ✅ Auto-reply confirmation to clients
- ✅ Professional email templates
- ✅ Mobile-responsive design
- ✅ Light/dark mode compatibility