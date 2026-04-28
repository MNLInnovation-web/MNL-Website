import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  matterType: z.enum(["Corporate & Commercial", "Litigation", "Conveyancing", "Intellectual Property", "Other"]),
  summary: z.string().min(10, "Summary must be at least 10 characters").max(2000),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── SERVER-SIDE VALIDATION (Zod) ──
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { fullName, email, matterType, summary, honeypot } = result.data;

    // ── SPAM PROTECTION (Honeypot) ──
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // ── API KEY GUARD ──
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing in environment variables');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // ── SEND EMAIL ──
    const { data, error } = await resend.emails.send({
      from: 'MN Legal Portal <noreply@mnlegal.net>',
      to: ['info@mnlegal.net'],
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
      console.error('Resend error:', error);
      return NextResponse.json({ error: `Resend: ${error.message || JSON.stringify(error)}` }, { status: 500 });
    }

    // ── CONFIRMATION EMAIL TO SUBMITTER ──
    await resend.emails.send({
      from: 'MN Legal Portal <noreply@mnlegal.net>',
      to: [email],
      replyTo: 'info@mnlegal.net',
      subject: `We've received your inquiry — MN Advocates LLP`,
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
              h2 { font-family: 'Georgia', serif; font-style: italic; color: #1a2744; font-size: 20px; margin: 0 0 16px; }
              .label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #8b1c3f; margin-bottom: 6px; display: block; }
              .value { font-size: 15px; color: #1a2744; margin-bottom: 20px; font-weight: 500; }
              .highlight-box { background-color: #f5f3ef; padding: 28px 30px; border-left: 3px solid #8b1c3f; margin: 28px 0; }
              .contact-row { display: flex; gap: 40px; margin-top: 24px; }
              .contact-item { font-size: 13px; color: #555; }
              .contact-item a { color: #8b1c3f; text-decoration: none; font-weight: 600; }
              .divider { height: 1px; background-color: #eeeeee; margin: 28px 0; }
              p { font-size: 15px; color: #444; margin: 0 0 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>MN Advocates LLP</h1>
                <div style="color: rgba(255,255,255,0.4); font-size: 9px; letter-spacing: 3px; text-transform: uppercase; margin-top: 10px;">Inquiry Received</div>
              </div>
              <div class="content">
                <h2>Thank you, ${fullName}.</h2>
                <p>We have received your consultation request and our partners have been notified. A member of our team will be in touch within <strong>24 business hours</strong>.</p>

                <div class="highlight-box">
                  <span class="label">Legal Area</span>
                  <div class="value">${matterType}</div>
                  <span class="label">Your Summary</span>
                  <div class="value" style="font-style: italic; color: #555;">"${summary}"</div>
                </div>

                <div class="divider"></div>

                <p style="font-size: 13px; color: #777;">If your matter is urgent, please contact us directly:</p>
                <div style="margin-top: 8px;">
                  <div style="font-size: 13px; color: #555; margin-bottom: 8px;">Email: <a href="mailto:info@mnlegal.net" style="color: #8b1c3f; text-decoration: none; font-weight: 600;">info@mnlegal.net</a></div>
                  <div style="font-size: 13px; color: #555;">Phone: <a href="tel:+254700325089" style="color: #8b1c3f; text-decoration: none; font-weight: 600;">+254 700 325 089</a></div>
                </div>
              </div>
              <div class="footer">
                Privileged & Confidential · MN Advocates LLP · Nairobi, Kenya
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error('Contact route caught error:', err);
    return NextResponse.json({ error: `Internal: ${err?.message || String(err)}` }, { status: 500 });
  }
}
