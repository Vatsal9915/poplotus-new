import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    // Build attachments if file uploaded
    let attachments: any[] = [];
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer.toString("base64"),
      });
    }

    // Call Resend REST API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PopLotus <contact@poplotus.co>", // later replace with your verified domain
        to: ["contact@poplotus.in"],
        subject: `📩 New Query: ${subject}`,
        html: `
          <h2>New Message from PopLotus Website</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b> ${message}</p>
        `,
        attachments,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to send email");

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
