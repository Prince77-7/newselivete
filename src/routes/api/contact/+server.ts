import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, url }) => {
  try {
    // Dynamic import for Plunk to avoid SSR issues
    const PlunkModule = await import('@plunk/node');
    const Plunk = (PlunkModule.default as any).default || PlunkModule.default;
    const plunk = new Plunk('sk_70c403f6b9aa94db42a5110ba68bb86bc4f18d2a38caa7ff');
    
    const formData = await request.json();
    const { 
      from_name, 
      from_email, 
      phone, 
      message, 
      preferred_agent,
      selectedAgentDetails 
    } = formData;

    // Validate required fields
    if (!from_name || !from_email || !message) {
      return json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Determine recipient email
    const to_email = selectedAgentDetails?.email || 'info@wasaw.com';
    const timestamp = new Date().toLocaleString();
    
    // Use the hosted logo URL
    const logoUrl = 'https://link.storjshare.io/raw/jwxxuieewjxqxp57aohl2gu4x3ka/grey/wasaw_red.png';

    // Send notification email to agent/company
    const agentEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - WASAW</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #B8002D;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            text-align: center;
            margin-bottom: 10px;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .subtitle {
            color: #666;
            font-size: 1.1rem;
        }
        .content-section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #B8002D;
            margin-bottom: 10px;
            border-left: 4px solid #B8002D;
            padding-left: 15px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 10px;
            margin-bottom: 15px;
        }
        .info-label {
            font-weight: bold;
            color: #555;
        }
        .info-value {
            color: #333;
        }
        .message-box {
            background-color: #f8f9fa;
            border-left: 4px solid #B8002D;
            padding: 20px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .message-text {
            font-style: italic;
            line-height: 1.8;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9rem;
        }
        .timestamp {
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            font-size: 0.9rem;
            color: #666;
        }
        .priority-notice {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        }
        @media (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
                gap: 5px;
            }
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">
                <img src="${logoUrl}" alt="WASAW Logo" width="200" height="41">
            </div>
            <div class="subtitle">New Contact Form Submission</div>
        </div>

        <div class="priority-notice">
            <strong>🔔 New Lead Alert!</strong> A potential client has submitted a contact form on your website.
        </div>

        <div class="content-section">
            <div class="section-title">Contact Information</div>
            <div class="info-grid">
                <div class="info-label">Full Name:</div>
                <div class="info-value">${from_name}</div>
                
                <div class="info-label">Email Address:</div>
                <div class="info-value">${from_email}</div>
                
                <div class="info-label">Phone Number:</div>
                <div class="info-value">${phone || 'Not provided'}</div>
                
                <div class="info-label">Preferred Agent:</div>
                <div class="info-value">${preferred_agent || 'No preference'}</div>
            </div>
        </div>

        <div class="content-section">
            <div class="section-title">Client Message</div>
            <div class="message-box">
                <div class="message-text">${message}</div>
            </div>
        </div>

        <div class="content-section">
            <div class="section-title">Submission Details</div>
            <div class="timestamp">
                <strong>Submitted on:</strong> ${timestamp}
            </div>
        </div>

        <div class="footer">
            <p><strong>Next Steps:</strong></p>
            <p>• Respond to this inquiry within 1 hour for best conversion rates</p>
            <p>• Reply directly to: <a href="mailto:${from_email}">${from_email}</a></p>
            <p>• Log this lead in your CRM system</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p>This email was automatically generated from the WASAW website contact form.</p>
            <p>© 2025 WASAW Real Estate. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

    // Send auto-reply to client
    const clientEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You - WASAW Real Estate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #B8002D;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            text-align: center;
            margin-bottom: 10px;
        }
        .logo img {
            max-width: 200px;
            height: auto;
        }
        .subtitle {
            color: #666;
            font-size: 1.1rem;
        }
        .content-section {
            margin-bottom: 25px;
        }
        .highlight-box {
            background-color: #f8f9fa;
            border-left: 4px solid #B8002D;
            padding: 20px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .info-box {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        .contact-item {
            text-align: center;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 4px;
        }
        .contact-label {
            font-weight: bold;
            color: #B8002D;
            font-size: 0.9rem;
        }
        .contact-value {
            color: #333;
            margin-top: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9rem;
        }
        .cta-section {
            background: linear-gradient(135deg, #B8002D, #8B0021);
            color: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 25px 0;
        }
        .cta-title {
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .cta-text {
            margin-bottom: 20px;
            opacity: 0.9;
        }
        .cta-button {
            display: inline-block;
            background-color: white;
            color: #B8002D;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 5px;
        }
        .social-links {
            text-align: center;
            margin: 20px 0;
        }
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #B8002D;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .contact-grid {
                grid-template-columns: 1fr;
            }
            .cta-button {
                display: block;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">
                <img src="${logoUrl}" alt="WASAW Logo" width="200" height="41">
            </div>
            <div class="subtitle">Thank You for Your Inquiry</div>
        </div>

        <div class="content-section">
            <p>Dear ${from_name},</p>
            
            <div class="highlight-box">
                <strong>Thank you for reaching out to WASAW!</strong> We've received your message and appreciate your interest in our real estate services.
            </div>
            
            <p>Your inquiry is important to us, and we're committed to providing you with exceptional service. Here's what happens next:</p>
            
            <ul style="line-height: 2;">
                <li><strong>Response Time:</strong> We'll respond within 1 business hour during office hours</li>
                <li><strong>Personal Consultation:</strong> We'll schedule a convenient time to discuss your needs</li>
                <li><strong>Market Analysis:</strong> We'll provide current market insights relevant to your interests</li>
            </ul>
        </div>

        <div class="info-box">
            <h3 style="color: #B8002D; margin-top: 0;">Your Submission Details</h3>
            <p><strong>Preferred Agent:</strong> ${preferred_agent || 'No preference'}</p>
            <p><strong>Your Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Submitted:</strong> ${timestamp}</p>
        </div>

        <div class="cta-section">
            <div class="cta-title">Explore More</div>
            <div class="cta-text">While you wait, feel free to explore our latest listings and market insights</div>
            <a href="https://wasaw.com/properties" class="cta-button">View Properties</a>
            <a href="https://wasaw.com/blog" class="cta-button">Market Insights</a>
        </div>

        <div class="content-section">
            <h3 style="color: #B8002D;">Contact Information</h3>
            <div class="contact-grid">
                <div class="contact-item">
                    <div class="contact-label">Office Phone</div>
                    <div class="contact-value">(310) 555-7890</div>
                </div>
                <div class="contact-item">
                    <div class="contact-label">Email</div>
                    <div class="contact-value">info@wasaw.com</div>
                </div>
                <div class="contact-item">
                    <div class="contact-label">Office Hours</div>
                    <div class="contact-value">Mon-Fri: 9am-6pm<br>Sat: 10am-4pm</div>
                </div>
                <div class="contact-item">
                    <div class="contact-label">Address</div>
                    <div class="contact-value">123 Luxury Avenue<br>Beverly Hills, CA 90210</div>
                </div>
            </div>
        </div>

        <div class="social-links">
            <a href="#">📘 Facebook</a>
            <a href="#">📷 Instagram</a>
            <a href="#">💼 LinkedIn</a>
            <a href="#">🐦 Twitter</a>
        </div>

        <div class="footer">
            <p><strong>Your Message:</strong></p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; margin: 10px 0; text-align: left; font-style: italic;">
                "${message}"
            </div>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>© 2025 WASAW Real Estate. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

    // Send both emails using Plunk
    const [agentEmail, clientEmail] = await Promise.all([
      // Send notification to agent/company
      plunk.emails.send({
        to: to_email,
        subject: `New Contact Form Submission from ${from_name}`,
        body: agentEmailHtml
      }),
      
      // Send auto-reply to client
      plunk.emails.send({
        to: from_email,
        subject: 'Thank you for contacting WASAW - We\'ll be in touch soon!',
        body: clientEmailHtml
      })
    ]);

    return json({ 
      success: true, 
      message: 'Emails sent successfully',
      agentEmailSent: agentEmail.success,
      clientEmailSent: clientEmail.success
    });

  } catch (error) {
    console.error('Error sending emails:', error);
    return json({ 
      error: 'Failed to send emails. Please try again.' 
    }, { status: 500 });
  }
}; 