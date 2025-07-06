import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Extract request metadata
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const referer = request.headers.get('referer') || 'Direct';
    const acceptLanguage = request.headers.get('accept-language') || 'Unknown';
    const xForwardedFor = request.headers.get('x-forwarded-for');
    const xRealIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    
    // Get IP address (try different headers in order of preference)
    const ipAddress = cfConnectingIp || xRealIp || xForwardedFor?.split(',')[0]?.trim() || 'Unknown';
    
    // Get browser and OS info from user agent
    const getBrowserInfo = (ua: string) => {
      const browsers = [
        { name: 'Chrome', regex: /Chrome\/([0-9.]+)/ },
        { name: 'Firefox', regex: /Firefox\/([0-9.]+)/ },
        { name: 'Safari', regex: /Safari\/([0-9.]+)/ },
        { name: 'Edge', regex: /Edg\/([0-9.]+)/ },
        { name: 'Opera', regex: /OPR\/([0-9.]+)/ }
      ];
      
      for (const browser of browsers) {
        const match = ua.match(browser.regex);
        if (match) return `${browser.name} ${match[1]}`;
      }
      return 'Unknown Browser';
    };
    
    const getOSInfo = (ua: string) => {
      if (ua.includes('Windows NT 10.0')) return 'Windows 10/11';
      if (ua.includes('Windows NT 6.3')) return 'Windows 8.1';
      if (ua.includes('Windows NT 6.1')) return 'Windows 7';
      if (ua.includes('Mac OS X')) return 'macOS';
      if (ua.includes('X11; Linux')) return 'Linux';
      if (ua.includes('Android')) return 'Android';
      if (ua.includes('iPhone')) return 'iOS (iPhone)';
      if (ua.includes('iPad')) return 'iOS (iPad)';
      return 'Unknown OS';
    };
    
    const browserInfo = getBrowserInfo(userAgent);
    const osInfo = getOSInfo(userAgent);
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'kushkansal0@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
          <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #1f2937; border-bottom: 3px solid #3b82f6; padding-bottom: 15px; margin-top: 0;">
              📧 New Contact Form Submission
            </h2>
            
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 20px; border-radius: 8px; margin: 20px 0; color: white;">
              <h3 style="color: white; margin-top: 0; display: flex; align-items: center;">
                👤 Contact Information
              </h3>
              <div style="background-color: rgba(255,255,255,0.1); padding: 15px; border-radius: 6px; margin-top: 15px;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #bfdbfe;">${email}</a></p>
                ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #bfdbfe;">${phone}</a></p>` : ''}
              </div>
            </div>
            
            <div style="background-color: #f8fafc; padding: 20px; border: 2px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0; display: flex; align-items: center;">
                💬 Message Content
              </h3>
              <div style="background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                <p style="white-space: pre-wrap; line-height: 1.6; margin: 0; color: #374151;">${message}</p>
              </div>
            </div>
            
            <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #92400e; margin-top: 0; display: flex; align-items: center;">
                🌐 Technical Information
              </h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div style="background-color: white; padding: 12px; border-radius: 6px;">
                  <strong style="color: #1f2937;">IP Address:</strong><br>
                  <span style="color: #6b7280; font-family: monospace;">${ipAddress}</span>
                </div>
                <div style="background-color: white; padding: 12px; border-radius: 6px;">
                  <strong style="color: #1f2937;">Browser:</strong><br>
                  <span style="color: #6b7280;">${browserInfo}</span>
                </div>
                <div style="background-color: white; padding: 12px; border-radius: 6px;">
                  <strong style="color: #1f2937;">Operating System:</strong><br>
                  <span style="color: #6b7280;">${osInfo}</span>
                </div>
                <div style="background-color: white; padding: 12px; border-radius: 6px;">
                  <strong style="color: #1f2937;">Language:</strong><br>
                  <span style="color: #6b7280;">${acceptLanguage.split(',')[0] || 'Unknown'}</span>
                </div>
                <div style="background-color: white; padding: 12px; border-radius: 6px;">
                  <strong style="color: #1f2937;">Referrer:</strong><br>
                  <span style="color: #6b7280; word-break: break-all;">${referer}</span>
                </div>
                <div style="background-color: white; padding: 12px; border-radius: 6px;">
                  <strong style="color: #1f2937;">Timestamp:</strong><br>
                  <span style="color: #6b7280;">${timestamp}</span>
                </div>
              </div>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 30px; text-align: center; border-top: 2px solid #e2e8f0;">
              <p style="margin: 5px 0; font-size: 14px; color: #64748b;">
                📨 This email was automatically generated from your portfolio contact form
              </p>
              <p style="margin: 5px 0; font-size: 12px; color: #94a3b8;">
                Portfolio: kushkansal.me | Sent at: ${timestamp}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
🔔 NEW CONTACT FORM SUBMISSION
====================================

👤 CONTACT INFORMATION:
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

💬 MESSAGE:
${message}

🌐 TECHNICAL DETAILS:
IP Address: ${ipAddress}
Browser: ${browserInfo}
Operating System: ${osInfo}
Language: ${acceptLanguage.split(',')[0] || 'Unknown'}
Referrer: ${referer}
User Agent: ${userAgent}

📅 TIMESTAMP: ${timestamp}

====================================
This email was sent from kushkansal.me contact form.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
