import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name is too short").max(100),
  email: z.string().email("Invalid email address"),
  matterType: z.enum([
    "Corporate & Commercial",
    "Litigation",
    "Conveyancing",
    "Intellectual Property",
    "Other",
    "Fintech & Regulation",
    "Data Privacy & Protection",
    "Capital Markets & VC",
    "Corporate Advisory & M&A"
  ]),
  summary: z.string().min(10, "Summary must be at least 10 characters").max(2000),
  honeypot: z.string().optional(),
  companyName: z.string().max(100).optional().or(z.literal('')),
  jobTitle: z.string().max(100).optional().or(z.literal('')),
  phone: z.string().max(30).optional().or(z.literal('')),
  contactPreference: z.string().max(50).optional().or(z.literal('')),
});

function firmNotificationHtml(
  fullName: string, 
  email: string, 
  matterType: string, 
  summary: string,
  companyName?: string,
  jobTitle?: string,
  phone?: string,
  contactPreference?: string
): string {
  const timestamp = new Date().toLocaleString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
  });

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Consultation Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f0ede8;font-family:Arial,Helvetica,sans-serif;">

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f0ede8;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Email card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;">

          <!-- Burgundy accent bar -->
          <tr>
            <td style="height:7px;background-color:#8b1c3f;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color:#1a2744;padding:44px 48px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-style:italic;font-weight:400;color:#ffffff;line-height:1.2;">MN Advocates LLP</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#8b9fc0;">Nairobi · Kenya</p>
                  </td>
                  <td align="right" valign="top">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#8b1c3f;padding:6px 14px;">
                          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#ffffff;">New Inquiry</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Thin rule -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;">
                <tr><td style="height:1px;background-color:#2d3e5f;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <p style="margin:20px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7ea0;">Received: ${timestamp}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:48px 48px 40px;">

              <!-- Section label -->
              <p style="margin:0 0 28px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#8b1c3f;">Client Details</p>

              <!-- Corporate Background (Render dynamically if present) -->
              ${companyName || jobTitle ? `
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="border-bottom:1px solid #ede9e2;padding-bottom:20px;">
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b1c3f;">Corporate Background</p>
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:400;color:#1a2744;line-height:1.3;">${jobTitle ? `${jobTitle} at ` : ''}${companyName || 'N/A'}</p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Contact Preferences (Render dynamically if present) -->
              ${phone || contactPreference ? `
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="border-bottom:1px solid #ede9e2;padding-bottom:20px;">
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b1c3f;">Contact Information</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a2744;line-height:1.5;">
                      ${phone ? `<strong>Phone / WhatsApp:</strong> ${phone}<br/>` : ''}
                      ${contactPreference ? `<strong>Channel Preference:</strong> ${contactPreference.toUpperCase()}` : ''}
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Name field -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="border-bottom:1px solid #ede9e2;padding-bottom:20px;">
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b1c3f;">Full Name</p>
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:400;color:#1a2744;line-height:1.3;">${fullName}</p>
                  </td>
                </tr>
              </table>

              <!-- Email field -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:24px;">
                <tr>
                  <td style="border-bottom:1px solid #ede9e2;padding-bottom:20px;">
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b1c3f;">Email Address</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:400;color:#1a2744;">${email}</p>
                  </td>
                </tr>
              </table>

              <!-- Legal area field -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:36px;">
                <tr>
                  <td>
                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b1c3f;">Legal Area</p>
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#1a2744;padding:8px 18px;">
                          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;">${matterType}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:36px;">
                <tr><td style="height:1px;background-color:#ede9e2;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- Inquiry summary -->
              <p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#8b1c3f;">Inquiry Summary</p>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:40px;">
                <tr>
                  <td style="background-color:#f5f3ef;border-left:4px solid #8b1c3f;padding:24px 28px;">
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:#333333;line-height:1.8;">&ldquo;${summary}&rdquo;</p>
                  </td>
                </tr>
              </table>

              <!-- CTA button -->
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#8b1c3f;">
                    <a href="mailto:${email}?subject=RE: Your Consultation Inquiry — ${matterType}" style="display:block;padding:16px 36px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#ffffff;text-decoration:none;">Reply to Client</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f5f3ef;padding:24px 48px;border-top:1px solid #ede9e2;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b1c3f;">MN Advocates LLP</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#999999;">Global Center, 1st Floor, CBC Building · Off Argwings Kodhek Road, Kilimani · Nairobi, Kenya</p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#bbbbbb;">Privileged &amp; Confidential</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Bottom burgundy bar -->
          <tr>
            <td style="height:4px;background-color:#8b1c3f;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

function clientConfirmationHtml(fullName: string, matterType: string, summary: string): string {
  const firstName = fullName.split(' ')[0];

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Inquiry Received — MN Advocates LLP</title>
</head>
<body style="margin:0;padding:0;background-color:#1a2744;font-family:Arial,Helvetica,sans-serif;">

  <!-- Outer wrapper -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#1a2744;padding:48px 16px;">
    <tr>
      <td align="center">

        <!-- Email card -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;">

          <!-- Burgundy accent bar -->
          <tr>
            <td style="height:7px;background-color:#8b1c3f;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color:#1a2744;padding:52px 52px 48px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <!-- Monogram mark -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="width:40px;height:40px;background-color:#8b1c3f;text-align:center;vertical-align:middle;">
                          <span style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-style:italic;color:#ffffff;font-weight:400;">M</span>
                        </td>
                        <td style="width:8px;">&nbsp;</td>
                        <td>
                          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:8px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#8b9fc0;line-height:1;">MN Advocates LLP</p>
                          <p style="margin:2px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:#4a5f80;">Nairobi · Kenya</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 12px 0;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-style:italic;font-weight:400;color:#ffffff;line-height:1.2;">Inquiry Received.</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:400;color:#8b9fc0;line-height:1.6;max-width:400px;">Your consultation request has been transmitted to our partners. We will respond within <strong style="color:#ffffff;font-weight:600;">24 business hours.</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- White content -->
          <tr>
            <td style="padding:52px 52px 44px;background-color:#ffffff;">

              <!-- Greeting -->
              <p style="margin:0 0 24px 0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-style:italic;color:#1a2744;line-height:1.3;">Dear ${firstName},</p>
              <p style="margin:0 0 36px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#555555;line-height:1.8;">Thank you for reaching out to MN Advocates LLP. We have received your request for a consultation and our team has been notified. A qualified advocate will be in contact with you shortly to discuss your matter in confidence.</p>

              <!-- Matter summary box -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:40px;">
                <tr>
                  <td style="background-color:#f5f3ef;border-left:4px solid #8b1c3f;padding:28px 32px;">
                    <p style="margin:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#8b1c3f;">Your Matter on Record</p>

                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">Legal Area</p>
                    <p style="margin:0 0 20px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#1a2744;">${matterType}</p>

                    <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">Your Summary</p>
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#555555;line-height:1.75;">&ldquo;${summary}&rdquo;</p>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:36px;">
                <tr><td style="height:1px;background-color:#ede9e2;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- Urgent contact -->
              <p style="margin:0 0 20px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1a2744;">For Urgent Matters</p>

              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="50%" valign="top" style="padding-right:16px;">
                    <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">Email</p>
                    <a href="mailto:info@mnlegal.net" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#8b1c3f;text-decoration:none;">info@mnlegal.net</a>
                  </td>
                  <td width="50%" valign="top">
                    <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#999999;">Phone</p>
                    <a href="tel:+254700325089" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#8b1c3f;text-decoration:none;">+254 700 325 089</a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#131d33;padding:28px 52px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td valign="middle">
                    <p style="margin:0 0 5px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8b1c3f;">MN Advocates LLP</p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#4a5f80;line-height:1.6;">Global Center, 1st Floor, CBC Building<br>Off Argwings Kodhek Road, Kilimani · Nairobi</p>
                  </td>
                  <td align="right" valign="middle">
                    <p style="margin:0 0 8px 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#2d3e5f;">Connect</p>
                    <a href="https://www.linkedin.com/company/mn-legal" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#4a5f80;text-decoration:none;display:block;margin-bottom:4px;">LinkedIn</a>
                    <a href="https://twitter.com/mnlegaladvocate" style="font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#4a5f80;text-decoration:none;display:block;">Twitter / X</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Confidentiality strip -->
          <tr>
            <td style="background-color:#1a2744;padding:14px 52px;border-top:1px solid #2d3e5f;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:9px;color:#3a4f6a;text-align:center;letter-spacing:1px;">This communication is privileged and confidential. It is intended solely for the named recipient.</p>
            </td>
          </tr>

          <!-- Bottom burgundy bar -->
          <tr>
            <td style="height:4px;background-color:#8b1c3f;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── SERVER-SIDE VALIDATION (Zod) ──
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { 
      fullName, 
      email, 
      matterType, 
      summary, 
      honeypot,
      companyName,
      jobTitle,
      phone,
      contactPreference
    } = result.data;

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

    // ── FIRM NOTIFICATION ──
    const { data, error } = await resend.emails.send({
      from: 'MN Legal Portal <noreply@mnlegal.net>',
      to: ['info@mnlegal.net'],
      subject: `New Inquiry: ${matterType} — ${fullName}`,
      replyTo: email,
      html: firmNotificationHtml(fullName, email, matterType, summary, companyName, jobTitle, phone, contactPreference),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: `Resend: ${error.message || JSON.stringify(error)}` }, { status: 500 });
    }

    // ── CLIENT CONFIRMATION ──
    await resend.emails.send({
      from: 'MN Advocates LLP <noreply@mnlegal.net>',
      to: [email],
      replyTo: 'info@mnlegal.net',
      subject: `Your inquiry has been received — MN Advocates LLP`,
      html: clientConfirmationHtml(fullName, matterType, summary),
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    console.error('Contact route caught error:', err);
    return NextResponse.json({ error: `Internal: ${err?.message || String(err)}` }, { status: 500 });
  }
}
