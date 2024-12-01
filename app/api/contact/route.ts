// app/api/contact/route.ts
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        // Extract the sender's information from the request body
        const { name, email, message } = await req.json();

        // Create a nodemailer transporter (you can use a service like SendGrid or a simple SMTP server)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or use another service like 'SendGrid', 'Mailgun', etc.
            auth: {
                user: process.env.EMAIL, // Your email (sender email address)
                pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
            },
        });

        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL, // Your email (this will be the 'sender' from the perspective of Gmail)
            to: process.env.EMAIL, // The email where you want to receive the contact form submissions (your email)
            subject: `Message from ${name}`, // Subject line
            text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`, // Text version
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`, // HTML version
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Return a success response
        return new Response(JSON.stringify({ message: 'Message sent successfully' }), {
            status: 200,
        });
    } catch (error: unknown) {
        // Handle errors properly
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({ message: 'Failed to send message', error: error.message }),
                { status: 500 }
            );
        }
        
        // If it's not an instance of Error, return a generic error
        return new Response(
            JSON.stringify({ message: 'Failed to send message', error: 'Unknown error' }),
            { status: 500 }
        );
    }
}