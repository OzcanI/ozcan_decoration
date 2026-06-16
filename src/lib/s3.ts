import "server-only";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const region = process.env.AWS_REGION ?? "eu-central-1";
const bucket = process.env.S3_BUCKET ?? "";

export const s3Configured = Boolean(
  bucket &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY,
);

const s3 = new S3Client({ region });

/** Build the public URL for a stored object key. */
export function publicUrlFor(key: string): string {
  const host = process.env.NEXT_PUBLIC_S3_PUBLIC_HOST;
  if (host) return `https://${host}/${key}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

function sanitize(filename: string): string {
  const dot = filename.lastIndexOf(".");
  const ext = dot >= 0 ? filename.slice(dot).toLowerCase() : "";
  return `${randomUUID()}${ext.replace(/[^a-z0-9.]/g, "")}`;
}

/**
 * Create a short-lived presigned PUT URL. The browser uploads the file
 * directly to S3; we store the resulting public URL in the database.
 */
export async function createPresignedUpload(
  filename: string,
  contentType: string,
) {
  const key = `uploads/${sanitize(filename)}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  return { uploadUrl, key, publicUrl: publicUrlFor(key) };
}
