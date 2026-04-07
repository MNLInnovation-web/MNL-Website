import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  matterType: z.string().min(1, "Legal matter type is required"),
  summary: z.string().min(1, "Summary is required").max(5000),
  honeypot: z.string().optional(),
});

// Initialize safely for build time
const resendKey = process.env.RESEND_API_KEY || 're_123';
const resend = new Resend(resendKey);

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // ── SERVER-SIDE VALIDATION (Zod) ──
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0]?.message || 'Validation error' }, { status: 400 });
    }

    const { fullName, email, matterType, summary, honeypot } = result.data;

    // ── SPAM PROTECTION (Honeypot) ──
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Check for API key and Info Email at runtime before sending
    if (!process.env.RESEND_API_KEY || !process.env.INFO_EMAIL) {
      console.error('RESEND_API_KEY or INFO_EMAIL is missing in environment variables');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // ── SEND EMAIL ──
    const { data, error } = await resend.emails.send({
      from: 'MN Legal Portal <onboarding@resend.dev>',
      to: [process.env.INFO_EMAIL],
      subject: `CONSULTATION INQUIRY: ${matterType.toUpperCase()} - ${fullName.toUpperCase()}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #333333; line-height: 1.6; margin: 0; padding: 0; background-color: #f5f3ef; }
              .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-top: 6px solid #8b1c3f; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
              .header { background-color: #1a2744; padding: 40px; text-align: center; }
              .content { padding: 40px; }
              .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 2px; }
              h1 { font-family: 'Georgia', serif; font-style: italic; color: #ffffff; margin: 0; font-size: 24px; }
              .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #8b1c3f; margin-bottom: 8px; display: block; }
              .value { font-size: 16px; color: #1a2744; margin-bottom: 24px; font-weight: 500; }
              .message-box { background-color: #f5f3ef; padding: 30px; border-left: 2px solid #8b1c3f; margin-top: 30px; }
              .message-text { font-size: 15px; color: #333333; white-space: pre-wrap; font-style: italic; }
              .divider { height: 1px; background-color: #eeeeee; margin: 30px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>MN Advocates LLP</h1>
                <div style="color: rgba(255,255,255,0.4); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; margin-top: 10px;">Consultation Request</div>
              </div>
              <div class="content">
                <span class="label">Prospective Client</span>
                <div class="value">${fullName}</div>
                
                <span class="label">Email Address</span>
                <div class="value">${email}</div>
                
                <span class="label">Legal Area</span>
                <div class="value">${matterType}</div>
                
                <div class="divider"></div>
                
                <div class="message-box">
                  <span class="label">Inquiry Summary</span>
                  <div class="message-text">"${summary}"</div>
                </div>
              </div>
              <div class="footer">
                Privileged & Confidential - Generated via MN Legal Portal
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
