import { env } from '@/lib/env';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});