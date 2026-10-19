<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Brand facts (phone, services, schedule slots) live only in `src/config/marca.ts`; components import them — one place to change.
- All colors, gradients, shadows, shapes and named animations are tokens/utilities in `src/styles.css`; components never use raw color classes — keeps brand consistent.
- One component per page section in `src/components/site/`, each opening with a comment block (EFEITO / INTERAÇÃO / POR QUE) — the project is a teaching reference.
- Booking has no database: it composes a WhatsApp message via `src/lib/whatsapp.ts` — the owner asked for everything to go to WhatsApp.
- Design rationale goes in `DESIGN.md`; the reusable build method in `METODO.md` — keep both updated when sections change.
