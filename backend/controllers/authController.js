import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Temporary in-memory OTP storage (for testing only)
// In production, store OTPs in a DB with expiry!
export const otpStore = {};

/**
 * @route POST /send-otp
 * @desc Send OTP to user's email
 */
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log("📨 Request to send OTP to:", email);

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp; // Store OTP in memory
  console.log(`🔐 OTP generated for ${email}: ${otp}`);

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password!
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code for Signup',
    text: `Hello,\n\nYour OTP is: ${otp}\nIt is valid for 5 minutes.\n\nThank you!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent successfully to", email);
    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

/**
 * @route POST /verify-otp
 * @desc Verify OTP entered by user
 */
export const verifyOTP = (req, res) => {
  const { email, otp } = req.body;
  console.log(`🧐 Verifying OTP for ${email}: entered ${otp}, stored ${otpStore[email]}`);

  if (!otpStore[email]) {
    return res.status(400).json({ success: false, error: 'OTP expired or not found' });
  }

  if (parseInt(otp) === otpStore[email]) {
    console.log("✅ OTP verified successfully for", email);
    delete otpStore[email]; // Optional: Invalidate OTP after use
    return res.json({ success: true });
  } else {
    console.warn("❌ Invalid OTP attempt for", email);
    return res.status(400).json({ success: false, error: 'Invalid OTP' });
  }
};
