import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Add your email
      pass: process.env.EMAIL_PASS, // Add your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};
