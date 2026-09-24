const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for your frontend
app.use(express.json()); // Parse JSON bodies

// POST route to send email
app.post('/send-enquiry', async (req, res) => {
  const { feedback, name } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: 'your-email@gmail.com', // your email
      pass: 'your-app-password',    // your email password or app password
    },
  });

  const mailOptions = {
    from: 'no-reply@yourdomain.com', // or your email
    to: 'lewislally95@sky.com', // your email address
    subject: 'New Enquiry from Contact Form',
    text: `Name: ${name}\nFeedback: ${feedback}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Start server
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});