# Detalhe Perfeito · Estúdio Automotivo

Site da Detalhe Perfeito (São Paulo, SP · (15) 98801-3276 · @detalhe.perfeito).

Começou no Lovable e agora é mantido só aqui, sem ligação com ele. Serve também
de referência para ensinar a construir sites autênticos para cada marca, no
padrão DERS: leia `DESIGN.md` (por que o site é assim) e `METODO.md` (o passo a passo).

## Rodar e publicar
```sh
bun install
bun run dev     # abre em http://127.0.0.1:5173
bun run test    # regras do agendamento/WhatsApp
bun run build   # gera o site pronto em dist/client
```
Hospedado na Vercel: a cada push na `main` ela roda `bun run build` e publica
`dist/client` (configurado em `vercel.json`, sem precisar mexer em nada no painel).
