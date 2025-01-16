import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Missing Resend API Key" },
      { status: 500 }
    );
  }

  try {
    const { email, subject, message } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Mail from Web Portfolio! <noreply@azuaj.com>",
      to: ["un.totem777@gmail.com"],
      subject: subject,
      text: `
From: ${email}

Subject: ${subject}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in sendEmail:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
