# Detalhe Perfeito · Estúdio Automotivo

Site da Detalhe Perfeito (São Paulo, SP · (15) 98801-3276 · @detalhe.perfeito).

Começou no Lovable e agora é mantido só aqui, sem ligação com ele. Serve também
de referência para ensinar a construir sites autênticos para cada marca, no
padrão DERS: leia `DESIGN.md` (por que o site é assim) e `METODO.md` (o passo a passo).

## Publicado em
https://ders-forms-s43d.vercel.app/p/detalhe-perfeito/

## Rodar e publicar
```sh
bun install
bun run dev          # abre em http://127.0.0.1:5173
bun run test         # regras do agendamento/WhatsApp
bun run build:ders   # gera dist/client para o endereço /p/detalhe-perfeito/
```
Para publicar, copie o conteúdo de `dist/client` para `p/detalhe-perfeito/` no
repositório kamillythaynara9-ai/ders-forms (a Vercel publica sozinha).
