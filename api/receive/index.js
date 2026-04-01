import nodemailer from 'nodemailer';

export default async function (context, req) {
    const { type, ...payload } = req.body || {};
    if (!type || (type !== 'contact' && type !== 'quote')) {
        context.res = { status: 400, body: { success: false } };
        return;
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const mailOptions = {
        from: 'no-reply@agrobots.ai',
        to: 'uvi@agrobots.ai',
        cc: 'mariajose@agrobots.ai',
        subject: type === 'quote' ? 'New Quote Request' : 'New Contact Request',
        text: JSON.stringify(payload, null, 2)
    };

    try {
        await transporter.sendMail(mailOptions);
        context.res = { body: { success: true } };
    } catch (err) {
        context.log.error(err);
        context.res = { status: 500, body: { success: false } };
    }
}
