"use client";

import { useRouter } from "next/navigation";
import { updateContactStatus, deleteContact } from "@/app/admin/actions";
import { Select } from "@/components/ui/Field";

type Status = "NEW" | "CONTACTED" | "ARCHIVED";
type Request = {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: Status;
  createdAt: string;
};

const statusLabels: Record<Status, string> = {
  NEW: "Yeni",
  CONTACTED: "Arandı",
  ARCHIVED: "Arşivlendi",
};

export function ContactRequests({ rows }: { rows: Request[] }) {
  const router = useRouter();

  async function setStatus(id: string, status: Status) {
    await updateContactStatus(id, status);
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    await deleteContact(id);
    router.refresh();
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 text-center text-ink-2">
        Henüz iletişim talebi yok.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row) => (
        <div
          key={row.id}
          className="rounded-2xl border border-line bg-card p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-[16px] font-semibold text-ink">
                  {row.name}
                </span>
                {row.status === "NEW" && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                    Yeni
                  </span>
                )}
              </div>
              <a
                href={`tel:${row.phone}`}
                className="text-[14px] text-accent hover:underline"
              >
                {row.phone}
              </a>
              <span className="ml-3 text-[12.5px] text-ink-2">
                {new Date(row.createdAt).toLocaleString("tr-TR")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={row.status}
                onChange={(e) => setStatus(row.id, e.target.value as Status)}
                className="w-auto py-2 text-[13px]"
              >
                {(Object.keys(statusLabels) as Status[]).map((s) => (
                  <option key={s} value={s}>
                    {statusLabels[s]}
                  </option>
                ))}
              </Select>
              <button
                onClick={() => remove(row.id)}
                className="text-[13.5px] font-medium text-accent hover:underline"
              >
                Sil
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-[14.5px] text-ink-2">
            {row.message}
          </p>
        </div>
      ))}
    </div>
  );
}
