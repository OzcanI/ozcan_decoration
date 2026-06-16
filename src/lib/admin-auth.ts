import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/** Ensure an admin session exists; redirect to login otherwise. */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
}
