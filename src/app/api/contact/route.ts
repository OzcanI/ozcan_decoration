import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  message: z.string().trim().min(2).max(2000),
});

// Stores a contact-form lead. Best-effort: the WhatsApp handoff on the client
// is the primary channel, so a DB failure still returns a soft success.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid" },
      { status: 400 },
    );
  }

  try {
    await prisma.contactRequest.create({ data: parsed.data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to store lead:", err);
    return NextResponse.json({ ok: false, stored: false });
  }
}
