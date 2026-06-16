import { Poppins } from "next/font/google";

// Headings use Poppins (matches the original design). Body text uses the
// system UI font stack defined in globals.css. The `--font-poppins` variable
// is consumed by `--font-heading` in the Tailwind theme.
export const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
