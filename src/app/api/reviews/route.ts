import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().max(120).optional().or(z.literal("")),
  text: z.string().trim().min(5).max(1500),
  rating: z.coerce.number().int().min(1).max(5),
});

// Public review submission. Lands as PENDING for admin moderation.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    await prisma.testimonial.create({
      data: {
        name: parsed.data.name,
        role: parsed.data.role || null,
        text: parsed.data.text,
        rating: parsed.data.rating,
        status: "PENDING",
        source: "VISITOR",
      },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reviews] failed to store review:", err);
    return NextResponse.json(
      { ok: false, error: "server" },
      { status: 500 },
    );
  }
}
