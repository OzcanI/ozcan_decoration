import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "./LoginForm";
import { siteConfig } from "@/lib/site-config";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-ink font-heading text-[17px] font-bold text-cream">
            {siteConfig.brandShort}
          </span>
          <div>
            <div className="font-heading text-[18px] font-bold text-ink">
              {siteConfig.brand}
            </div>
            <div className="text-[12px] text-ink-2">Yönetim Paneli</div>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-card p-7 shadow-[0_18px_40px_rgba(44,39,34,0.08)]">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
