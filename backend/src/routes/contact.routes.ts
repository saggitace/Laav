import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password',
  },
});

/**
 * POST /api/contact/send-email
 * Send contact form data via email to company email
 */
router.post('/send-email', async (req, res) => {
  try {
    const { senderName, senderEmail, company, message, companyEmail } = req.body;

    // Validate required fields
    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: senderName, senderEmail, message',
      });
    }

    // Email to company
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: companyEmail,
      subject: `New Contact Form Submission from ${senderName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${senderName}</p>
        <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><small>Received on: ${new Date().toLocaleString()}</small></p>
      `,
      replyTo: senderEmail,
    };

    // Email to sender (confirmation)
    const senderMailOptions = {
      from: process.env.EMAIL_USER,
      to: senderEmail,
      subject: 'We received your message',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${senderName},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p>Your message:</p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 15px; color: #666;">
          ${message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>The Laav IT Team</p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(senderMailOptions),
    ]);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error: any) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;
