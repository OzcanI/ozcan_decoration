type ClassValue = string | number | null | false | undefined | ClassValue[];

/** Minimal classnames joiner — flattens, drops falsy values, joins with spaces. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const v of inputs) {
    if (!v) continue;
    if (Array.isArray(v)) out.push(cn(...v));
    else out.push(String(v));
  }
  return out.join(" ");
}
