import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        // Check availability of credentials
        const emailUser = process.env.EMAIL_USER;
        // Google App Passwords might contain spaces; strip them.
        let emailPass = process.env.EMAIL_PASS;

        console.log('[API] Environment Check:');
        console.log(`- EMAIL_USER: ${emailUser ? 'Set' : 'Missing'} (${emailUser})`);
        console.log(`- EMAIL_PASS: ${emailPass ? 'Set' : 'Missing'} (Length: ${emailPass?.length})`);

        if (emailPass) {
            // Remove wrapping quotes if present (just in case)
            emailPass = emailPass.replace(/^"|"$/g, '');
            // Remove spaces
            emailPass = emailPass.replace(/\s+/g, '');
            console.log(`- Validated PASS Length: ${emailPass.length}`);
        }

        if (!emailUser || !emailPass) {
            console.warn('[API] Mocking success because credentials are missing.');
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json({ message: 'Email sent successfully (Mock)' }, { status: 200 });
        }


        // ... inputs ...

        const userIntro = formData.get('userIntro');
        const projectTitle = formData.get('projectTitle');
        const projectContent = formData.get('projectContent');
        // contactName is not in the form, use UserIntro or just omit?
        // Form fields: userIntro, email, phone, projectTitle, projectContent, projectType, schedule, budget
        // User didn't ask to add ContactName field, so maybe use userIntro as contact/name?

        const email = formData.get('email');
        const phone = formData.get('phone');
        const projectType = formData.get('projectType');
        const schedule = formData.get('schedule');
        const budget = formData.get('budget');

        const files = formData.getAll('files'); // Returns File[]

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        // Process Attachments
        const attachments = [];
        for (const file of files) {
            if (file instanceof File && file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                attachments.push({
                    filename: file.name,
                    content: buffer,
                });
            }
        }

        const mailOptions = {
            from: emailUser,
            to: emailUser,
            replyTo: email as string,
            subject: `[Brief] ${projectTitle}`,
            text: `(Use HTML view)`,
            html: `
                <h2>New Project Brief</h2>
                <hr />
                <p><strong>Introduction:</strong> ${userIntro}</p>
                <p><strong>Title:</strong> ${projectTitle}</p>
                <p><strong>Content:</strong> ${projectContent}</p>
                <p><strong>Contact:</strong> ${email} / ${phone}</p>
                <p><strong>Type:</strong> ${projectType}</p>
                <p><strong>Schedule:</strong> ${schedule}</p>
                <p><strong>Budget:</strong> ${budget}</p>
            `,
            attachments: attachments,
        };

        // Fire-and-Forget: Don't await. Send immediately.
        transporter.sendMail(mailOptions).catch(err => {
            console.error('[Background] Email send failed:', err);
        });

        // Return success immediately
        return NextResponse.json({ message: 'Email passed to background worker' }, { status: 200 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error sending email:', error);
        // Log more details if available
        if (error.response) console.error('SMTP Response:', error.response);
        if (error.code) console.error('Error Code:', error.code);

        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
