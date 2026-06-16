"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Field, ResourceDef } from "@/lib/admin-resources";
import { saveResource, deleteResource } from "@/app/admin/actions";
import { Input, Textarea, Select, Label } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ImageUploader } from "./ImageUploader";

type Row = Record<string, unknown> & { id: string };

function defaultsFor(def: ResourceDef): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of def.fields) {
    if (f.type === "switch") out[f.name] = true;
    else if (f.type === "number") out[f.name] = 0;
    else if (f.type === "select") out[f.name] = f.options?.[0]?.value ?? "";
    else out[f.name] = "";
  }
  return out;
}

function renderCell(field: Field | undefined, value: unknown) {
  if (!field) return String(value ?? "");
  if (field.type === "switch") {
    return value ? (
      <span className="rounded-full bg-whatsapp/15 px-2 py-0.5 text-[12px] font-semibold text-whatsapp">
        Evet
      </span>
    ) : (
      <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[12px] font-semibold text-ink-2">
        Hayır
      </span>
    );
  }
  if (field.type === "select") {
    const label = field.options?.find((o) => o.value === String(value))?.label;
    return label ?? String(value ?? "");
  }
  const str = String(value ?? "");
  return str.length > 60 ? `${str.slice(0, 60)}…` : str;
}

export function ResourceManager({
  def,
  rows,
}: {
  def: ResourceDef;
  rows: Row[];
}) {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, unknown> | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fieldByName = (name: string) => def.fields.find((f) => f.name === name);

  function openNew() {
    setEditingId(null);
    setForm(defaultsFor(def));
    setError("");
  }

  function openEdit(row: Row) {
    setEditingId(row.id);
    const values: Record<string, unknown> = {};
    for (const f of def.fields) values[f.name] = row[f.name] ?? "";
    setForm(values);
    setError("");
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setError("");
    try {
      await saveResource(def.key, editingId, form);
      setForm(null);
      setEditingId(null);
      router.refresh();
    } catch {
      setError("Kaydedilemedi. Lütfen tekrar deneyin.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    try {
      await deleteResource(def.key, id);
      router.refresh();
    } catch {
      alert("Silinemedi.");
    }
  }

  const setField = (name: string, value: unknown) =>
    setForm((f) => (f ? { ...f, [name]: value } : f));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[26px] text-ink">{def.label}</h1>
          <p className="mt-1 text-[14px] text-ink-2">{rows.length} kayıt</p>
        </div>
        <Button variant="dark" size="md" onClick={openNew}>
          + Yeni Ekle
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-line bg-card">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-line bg-cream-2/50 text-[12.5px] uppercase tracking-wide text-ink-2">
            <tr>
              {def.columns.map((col) => (
                <th key={col} className="px-4 py-3 font-semibold">
                  {fieldByName(col)?.label ?? col}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={def.columns.length + 1}
                  className="px-4 py-8 text-center text-ink-2"
                >
                  Henüz kayıt yok.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                {def.columns.map((col) => (
                  <td key={col} className="px-4 py-3 text-ink">
                    {renderCell(fieldByName(col), row[col])}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => openEdit(row)}
                    className="mr-3 text-[13.5px] font-medium text-ink-2 hover:text-ink"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => remove(row.id)}
                    className="text-[13.5px] font-medium text-accent hover:underline"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form modal */}
      {form && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(26,22,18,0.6)] p-4 backdrop-blur-sm"
          onClick={() => !saving && setForm(null)}
        >
          <div
            className="my-8 w-full max-w-[560px] rounded-2xl border border-line bg-card p-6 shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-5 text-[20px] text-ink">
              {editingId ? "Düzenle" : "Yeni"} — {def.labelSingular}
            </h2>

            <div className="flex flex-col gap-4">
              {def.fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.optional && (
                      <span className="ml-1 font-normal text-ink-2">
                        (opsiyonel)
                      </span>
                    )}
                  </Label>

                  {field.type === "text" && (
                    <Input
                      id={field.name}
                      value={String(form[field.name] ?? "")}
                      placeholder={field.placeholder}
                      onChange={(e) => setField(field.name, e.target.value)}
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      id={field.name}
                      rows={3}
                      value={String(form[field.name] ?? "")}
                      placeholder={field.placeholder}
                      onChange={(e) => setField(field.name, e.target.value)}
                    />
                  )}
                  {field.type === "number" && (
                    <Input
                      id={field.name}
                      type="number"
                      min={field.min}
                      max={field.max}
                      value={String(form[field.name] ?? 0)}
                      onChange={(e) => setField(field.name, e.target.value)}
                    />
                  )}
                  {field.type === "select" && (
                    <Select
                      id={field.name}
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setField(field.name, e.target.value)}
                    >
                      {field.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                  )}
                  {field.type === "switch" && (
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={Boolean(form[field.name])}
                        onChange={(e) =>
                          setField(field.name, e.target.checked)
                        }
                        className="h-5 w-5 accent-[var(--color-accent)]"
                      />
                      <span className="text-[14px] text-ink-2">
                        {form[field.name] ? "Yayında" : "Gizli"}
                      </span>
                    </label>
                  )}
                  {field.type === "image" && (
                    <ImageUploader
                      value={String(form[field.name] ?? "")}
                      onChange={(url) => setField(field.name, url)}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <p className="mt-4 text-[14px] font-medium text-accent">{error}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setForm(null)}
                disabled={saving}
              >
                İptal
              </Button>
              <Button variant="dark" size="md" onClick={save} disabled={saving}>
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
