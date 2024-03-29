import { Resend } from 'resend';

const resend = new Resend(`${process.env.NEXT_SEND_EMAIL_KEY}`);

export const sendEmail = async (to: string, subject: string, html: string) => {
	const msg = {
		to,
		from: 'tranan498@gmail.com',
		subject,
		html
	};
	try {
		await resend.emails.send(msg);
	} catch (error) {
		console.error(error);
	}
};
