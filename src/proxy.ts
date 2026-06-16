import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 "proxy" convention (formerly middleware). next-intl handles locale
// detection & prefixing for the public site. Admin (`/admin`), API routes, and
// static assets are excluded via the matcher; admin access control lives in the
// admin (panel) layout.
export default createMiddleware(routing);

export const config = {
  // Match everything except: /api, /admin, Next internals, and files with an extension.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
