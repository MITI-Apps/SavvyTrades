import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as any );

const verifyTransporter = async (): Promise<void> => {
  try {
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error);
  }
};

const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || 'noreply@savvytrades.com',
    to,
    subject,
    html,
  });
};

const sendVerificationEmail = async (email: string, name: string, token: string): Promise<void> => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#1e293b;border-radius:12px;padding:40px;">
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <h1 style="color:#22d3ee;margin:0;font-size:24px;">SavvyTrade</h1>
                </td>
              </tr>
              <tr>
                <td style="color:#e2e8f0;font-size:16px;line-height:24px;padding-bottom:16px;">
                  Hey ${name},
                </td>
              </tr>
              <tr>
                <td style="color:#94a3b8;font-size:14px;line-height:22px;padding-bottom:24px;">
                  Thanks for signing up! Click the button below to verify your email address.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <a href="${verifyUrl}" style="display:inline-block;background-color:#22d3ee;color:#0f172a;font-weight:bold;font-size:14px;text-decoration:none;padding:12px 32px;border-radius:8px;">
                    Verify Email
                  </a>
                </td>
              </tr>
              <tr>
                <td style="color:#64748b;font-size:12px;line-height:18px;">
                  If you didn't create an account, you can safely ignore this email. This link expires in 24 hours.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmail(email, 'Verify your SavvyTrade account', html);
};

const sendPasswordResetEmail = async (email: string, name: string, token: string): Promise<void> => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#0f172a;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f172a;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#1e293b;border-radius:12px;padding:40px;">
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <h1 style="color:#22d3ee;margin:0;font-size:24px;">SavvyTrade</h1>
                </td>
              </tr>
              <tr>
                <td style="color:#e2e8f0;font-size:16px;line-height:24px;padding-bottom:16px;">
                  Hey ${name},
                </td>
              </tr>
              <tr>
                <td style="color:#94a3b8;font-size:14px;line-height:22px;padding-bottom:24px;">
                  We received a request to reset your password. Click the button below to choose a new password.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <a href="${resetUrl}" style="display:inline-block;background-color:#22d3ee;color:#0f172a;font-weight:bold;font-size:14px;text-decoration:none;padding:12px 32px;border-radius:8px;">
                    Reset Password
                  </a>
                </td>
              </tr>
              <tr>
                <td style="color:#64748b;font-size:12px;line-height:18px;">
                  If you didn't request a password reset, you can safely ignore this email. This link expires in 15 minutes.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await sendEmail(email, 'Reset your SavvyTrade password', html);
};

export { sendVerificationEmail, sendPasswordResetEmail, verifyTransporter };
