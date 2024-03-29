import EmailTemplate from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_SEND_EMAIL_KEY);

export async function POST(req: Request) {
	try {
		const { name, selectedSeats, email } = await req.json();
		await resend.emails.send({
			from: 'tranan498@gmail.com',
			to: email,
			subject: 'Hello world',
			react: EmailTemplate(name, selectedSeats)
		});

		return NextResponse.json(
			{
				status: 'Ok'
			},
			{
				status: 200
			}
		);
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(`Failed to send email: ${e.message}`);
		}
		return NextResponse.json(
			{
				error: 'Internal server error.'
			},
			{
				status: 500
			}
		);
	}
}
