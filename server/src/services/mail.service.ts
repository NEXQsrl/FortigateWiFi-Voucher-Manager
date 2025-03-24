import nodemailer from 'nodemailer';
import { Mail } from '../interfaces/mail';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendMail = async (mail: Mail): Promise<void> => {
    try {
        await transporter.sendMail({
            from: "donotreply@nexq.it",
            to: mail.to,
            subject: mail.subject,
            text: mail.text
        });

        console.log(`📧 Email inviata a ${mail.to}`);
    } catch (error) {
        console.error('Errore nell\'invio della mail:', error);
        throw new Error('Errore durante l\'invio dell\'email');
    }
};