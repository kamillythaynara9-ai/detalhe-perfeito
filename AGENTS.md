## Project rules
- Not connected to Lovable anymore. Lives in kamillythaynara9-ai/detalhe-perfeito and is hosted on Vercel: `bun run build` prerenders static files into `dist/client` (see `vercel.json`).
- Brand facts (phone, services, schedule slots) live only in `src/config/marca.ts`; components import them — one place to change.
- All colors, gradients, shadows, shapes and named animations are tokens/utilities in `src/styles.css`; components never use raw color classes — keeps brand consistent.
- One component per page section in `src/components/site/`, each opening with a comment block (EFEITO / INTERAÇÃO / POR QUE) — the project is a teaching reference.
- Booking has no database: it composes a WhatsApp message via `src/lib/whatsapp.ts` — the owner asked for everything to go to WhatsApp.
- Design rationale goes in `DESIGN.md`; the reusable build method in `METODO.md` — keep both updated when sections change.
