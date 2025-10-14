import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  rating: z.enum(['1', '2', '3', '4', '5']),
  message: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      FEEDBACK_TO,
    } = process.env as Record<string, string | undefined>;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !FEEDBACK_TO) {
      return NextResponse.json(
        { error: 'Server email configuration is missing' },
        { status: 500 }
      );
    }

    // Support shorthand "gmail" host and enforce secure when port 465 is used
    const resolvedHost = SMTP_HOST === 'gmail' ? 'smtp.gmail.com' : SMTP_HOST;
    const resolvedPort = Number(SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: resolvedHost,
      port: resolvedPort,
      secure: resolvedPort === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const subject = `New Feedback from ${data.name} (Rating: ${data.rating}/5)`;
    const textBody = `You have received new feedback:\n\n` +
      `Name: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || 'N/A'}\n` +
      `Rating: ${data.rating}/5\n` +
      `\nMessage:\n${data.message}\n`;
    const htmlBody = `
      <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px 0">New Feedback Received</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tbody>
            <tr>
              <td style="padding:6px 8px;font-weight:bold;width:120px">Name</td>
              <td style="padding:6px 8px">${data.name}</td>
            </tr>
            <tr>
              <td style="padding:6px 8px;font-weight:bold">Email</td>
              <td style="padding:6px 8px">${data.email}</td>
            </tr>
            <tr>
              <td style="padding:6px 8px;font-weight:bold">Phone</td>
              <td style="padding:6px 8px">${data.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding:6px 8px;font-weight:bold">Rating</td>
              <td style="padding:6px 8px">${data.rating}/5</td>
            </tr>
          </tbody>
        </table>
        <h3 style="margin:16px 0 8px 0">Message</h3>
        <div style="white-space:pre-wrap;background:#f6f7f9;border:1px solid #e5e7eb;border-radius:8px;padding:12px">${data.message
      }</div>
      </div>
    `;

    await transporter.sendMail({
      from: SMTP_FROM,
      to: FEEDBACK_TO,
      subject,
      text: textBody,
      html: htmlBody,
      replyTo: data.email,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return NextResponse.json({ error: err.flatten() }, { status: 400 });
    }
    console.error('Feedback API error:', err);
    return NextResponse.json({ error: 'Failed to send feedback' }, { status: 500 });
  }
}
