import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { createPresignedUpload, s3Configured } from "@/lib/s3";

const schema = z.object({
  filename: z.string().min(1).max(200),
  contentType: z
    .string()
    .regex(/^image\/(png|jpe?g|webp|avif|gif)$/, "Only image uploads allowed"),
});

// Returns a presigned S3 PUT URL so the admin browser can upload directly.
export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!s3Configured) {
    return NextResponse.json(
      { error: "S3 is not configured. Set AWS_* and S3_BUCKET env vars." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 },
    );
  }

  const result = await createPresignedUpload(
    parsed.data.filename,
    parsed.data.contentType,
  );
  return NextResponse.json(result);
}
