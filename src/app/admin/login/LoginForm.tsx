"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../auth-actions";
import { Field, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {},
  );

  return (
    <form action={formAction}>
      <h1 className="mb-1 text-[22px] text-ink">Giriş Yap</h1>
      <p className="mb-6 text-[14px] text-ink-2">
        Yönetim paneline erişmek için giriş yapın.
      </p>

      <Field label="E-posta" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@ozcandekorasyon.com"
        />
      </Field>
      <Field label="Şifre" htmlFor="password">
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />
      </Field>

      {state.error && (
        <p className="mb-4 text-[14px] font-medium text-accent">{state.error}</p>
      )}

      <Button type="submit" variant="dark" disabled={pending} className="w-full">
        {pending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </Button>
    </form>
  );
}
