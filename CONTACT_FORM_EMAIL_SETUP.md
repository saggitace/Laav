# Contact Form Email Setup Guide

This guide explains how to set up email functionality for the contact form.

## Overview

The contact form now sends emails in two directions:
1. **To Company**: Notification email goes to your company email with contact details
2. **To Visitor**: Confirmation email sent to the visitor acknowledging receipt

## Setup Instructions

### 1. Enable Gmail App Password

Since we're using Gmail as the email service, you need to generate an App Password:

#### Steps:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **Mail** and **Windows Computer** (or your device)
5. Google will generate a 16-character password
6. Copy this password (without spaces)

### 2. Configure Environment Variables

Update `backend/.env` with your credentials:

```env
# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=xxxx_xxxx_xxxx_xxxx
```

**Replace:**
- `your_email@gmail.com` with your Gmail address
- `xxxx_xxxx_xxxx_xxxx` with the 16-character app password (without spaces)

### 3. Update Company Email Address

In [src/components/Contact.tsx](../../src/components/Contact.tsx), update the company email:

```typescript
await apiClient.sendContactEmail({
  senderName: formData.name,
  senderEmail: formData.email,
  company: formData.company,
  message: formData.message,
  companyEmail: 'hello@laavit.com', // ← Change this to your company email
});
```

### 4. Install Dependencies

Install nodemailer package:

```bash
cd backend
npm install
```

## How It Works

### Contact Form Flow

1. **User submits form** on the frontend
2. **Frontend validates** the form data
3. **API request sent** to `/api/contact/send-email`
4. **Backend receives** the contact information
5. **Two emails are sent:**
   - Email to company (hello@laavit.com) with contact details
   - Email to visitor confirming we received their message
6. **Response sent back** to frontend with success/error message

### Email Templates

#### Email to Company
- Subject: `New Contact Form Submission from {Name}`
- Contains: Visitor name, email, company, and message
- Reply-To: Automatically set to visitor's email

#### Email to Visitor
- Subject: `We received your message`
- Confirms receipt and sets expectations (24-hour response)
- Professional greeting with company branding

## Troubleshooting

### "Failed to send email" Error

**Check:**
1. ✅ Gmail credentials are correct in `.env`
2. ✅ 2-Step Verification is enabled on Google Account
3. ✅ App Password was generated (not regular password)
4. ✅ App Password is correct (16 characters, no spaces)
5. ✅ Backend is running (`npm run dev` in backend folder)

### "Connection timeout"

- Check internet connection
- Verify Gmail isn't blocking the connection
- Try using a different email service provider

### Testing in Development

1. Fill out the contact form
2. Click "Send Message"
3. Check console for any errors
4. Verify emails arrived in inbox/spam folder
5. Check backend console logs for detailed error messages

## Alternative Email Services

To use a different email provider (SendGrid, Mailgun, etc.), modify `backend/src/routes/contact.routes.ts`:

```typescript
const transporter = nodemailer.createTransport({
  // Your provider's SMTP configuration
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Security Notes

- 🔒 Never commit `.env` file with real credentials
- 🔒 Use App Passwords instead of your main Gmail password
- 🔒 Store credentials in environment variables only
- 🔒 Consider rate limiting for the contact endpoint in production

## Production Deployment

Before deploying to production:

1. Update `EMAIL_USER` and `EMAIL_PASSWORD` with production credentials
2. Update `companyEmail` in Contact.tsx to your actual company email
3. Test sending emails in staging environment
4. Consider adding:
   - Email validation
   - Rate limiting
   - Spam protection (reCAPTCHA)
   - Email queuing service for reliability

## API Endpoint

**POST** `/api/contact/send-email`

### Request Body
```json
{
  "senderName": "John Doe",
  "senderEmail": "john@example.com",
  "company": "Acme Corp",
  "message": "I'm interested in your services...",
  "companyEmail": "hello@laavit.com"
}
```

### Response
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Support

If you encounter issues:
1. Check backend console logs for error details
2. Verify all environment variables are set
3. Test Gmail login separately to confirm credentials work
4. Check email provider's rate limits or sending restrictions
