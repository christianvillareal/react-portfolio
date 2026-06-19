import { Resend } from 'resend';

const resend = new Resend(process.env.REACT_APP_RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${process.env.REACT_APP_FROM_EMAIL}>`,
      to: [process.env.REACT_APP_TO_EMAIL],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0C4A6E; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #0C4A6E; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name:</div>
                  <div>${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div>${email}</div>
                </div>
                <div class="field">
                  <div class="label">Message:</div>
                  <div>${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>Sent from your portfolio contact form</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `New message from ${name} (${email}):\n\n${message}`,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // Optional: Send auto-reply to user
    await resend.emails.send({
      from: `Portfolio <${process.env.REACT_APP_FROM_EMAIL}>`,
      to: [email],
      subject: 'Thank you for contacting me!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0C4A6E; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Thank You, ${name}!</h2>
              </div>
              <div class="content">
                <p>I've received your message and will get back to you within 24-48 hours.</p>
                <p>Here's a copy of your message for reference:</p>
                <div style="background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 15px 0;">
                  "${message}"
                </div>
                <p>Best regards,<br>Christian Villareal</p>
              </div>
              <div class="footer">
                <p>This is an automated confirmation. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Thank you ${name} for contacting me!\n\nI've received your message and will get back to you within 24-48 hours.\n\nYour message:\n"${message}"\n\nBest regards,\nChristian Villareal`,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}