import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/receive', async (req, res) => {
  const { type, ...payload } = req.body || {};
  if (!type || (type !== 'contact' && type !== 'quote')) {
    res.status(400).json({ success: false });
    return;
  }

  const mailOptions = {
    from: process.env.MAIL_FROM || 'no-reply@agrobots.ai',
    to: 'info@agrobots.ai',
    subject: type === 'quote' ? 'New Quote Request' : 'New Contact Request',
    text: JSON.stringify(payload, null, 2)
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
