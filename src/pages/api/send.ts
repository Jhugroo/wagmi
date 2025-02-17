import type { NextApiRequest, NextApiResponse } from 'next';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const mailerFrom = process.env.OWNER_MAIL;
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: `We're all gonna make it <${mailerFrom}>`,
    to: ['prakash.jhugroo@gmail.com'],
    subject: 'Hello world',
    text: 'nothing',
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
