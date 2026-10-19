# METODO.md — Como construir um site de marca do jeito certo

> Guia para ensinar uma IA (ou pessoa) a construir sites **autênticos para cada marca**, mas sempre no **mesmo padrão de qualidade**. Este projeto (Detalhe Perfeito) é o exemplo vivo: cada regra abaixo aponta para onde ela foi aplicada.

---

## Princípio central
**Autêntico na pele, padronizado no esqueleto.**
- O que MUDA de marca para marca: paleta, fontes, formas, a interação assinatura, os textos.
- O que NUNCA muda: a organização do código, os tokens centralizados, mobile primeiro, acessibilidade, ordem de venda das seções, tudo levando ao contato.

---

## Passo 1 — Ler o briefing e anotar os FATOS
Antes de qualquer código, separe:
- **Fatos dados pela cliente** (nome, telefone, serviços, horários, fluxo pedido) → vão para `src/config/marca.ts`. Nunca invente por cima.
- **O que você vai inventar** (depoimentos, FAQ) → marque como exemplo no `DESIGN.md`.
- **O fluxo principal** (aqui: agendar → WhatsApp). É isso que precisa funcionar perfeitamente.

## Passo 2 — Ler a logo como um designer
Olhe a logo e responda por escrito (vira a seção 2 do `DESIGN.md`):
1. **Cores**: qual é o fundo? qual a cor principal? qual a cor de destaque? → a cor de destaque vira a cor de **ação** (botões).
2. **Forma**: círculo, hexágono, gota, traço? → vira `clip-path`, raio de canto ou ornamento.
3. **Letra**: larga/estreita, serifada, técnica, manuscrita? → escolha no Google Fonts uma fonte de **título** parecida e uma de **texto** legível.
4. **Clima**: delicado, forte, divertido, sofisticado, tecnológico? → define a velocidade e o tipo de animação (aqui: tecnológico/luxo = luz deslizando, devagar).
5. **Um elemento icônico** (aqui: as 4 estrelas) → reaproveite como detalhe animado.

## Passo 3 — Montar o design system ANTES dos componentes
Tudo em `src/styles.css`:
- Cores em `oklch`, com nomes da marca (`--neon`, `--prata`), mapeadas em `@theme inline`.
- Degradês, sombras e formas como variáveis (`--gradiente-neon`, `--sombra-neon`, `--corte-hexagono`).
- Utilitários com nome que diz o que fazem (`texto-prata`, `bg-vidro`, `corte-hexagono`).
- Animações com nome descritivo em português (`brilho-varrendo`, `gota-escorrendo`).
- Bloco `prefers-reduced-motion` SEMPRE.

**Regra:** componente nunca escreve cor crua (`text-white`, `#00ff00`). Se precisar de uma cor nova, crie o token primeiro.

## Passo 4 — Um componente por seção, com comentário no topo
Pasta `src/components/site/`. Cada arquivo começa com um bloco dizendo:
- **EFEITO** visual
- **INTERAÇÃO** (mouse, toque, rolagem)
- **POR QUE** foi feito assim (quando não é óbvio)

Ajudantes reutilizáveis (`Revelar.tsx`) garantem que todas as seções tenham o mesmo ritmo.

## Passo 5 — Ordem das seções = conversa de venda
Impacto → o que fazemos → prova → escolha → ação → confiança → última chamada.
Veja `src/routes/index.tsx`.

## Passo 6 — Fazer o site "vivo" sem pesar
- **Movimento contínuo**: 3 a 6 animações CSS lentas e infinitas (fundo, brilho, letreiro). CSS é mais leve que JavaScript.
- **Reação à rolagem**: Framer Motion `useScroll`/`whileInView`, ou variáveis CSS atualizadas em `requestAnimationFrame` (`FundoVivo.tsx`). **Nunca** `setState` a cada pixel de rolagem.
- **Reação ao toque/mouse**: Pointer Events (um código só para mouse e dedo) — ver `AntesDepois.tsx` e a lanterna em `Topo.tsx`.
- **Sem linhas divisórias**: a passagem entre seções é feita por degradê e luz.
- **Sem grade de cartões com borda**: prefira listas tipográficas grandes (`Servicos.tsx`), painéis de vidro que trocam de conteúdo (`Planos.tsx`), carrosséis arrastáveis.

## Passo 7 — Interação assinatura
Pergunte: *"que gesto só faria sentido NESTE negócio?"*
- Estética automotiva → lanterna de inspeção + antes/depois arrastável.
- Confeitaria → passar o dedo e "cobrir" o bolo de calda.
- Floricultura → pétalas que caem e se afastam do cursor.
Uma por site. Bem feita vale mais que dez genéricas.

## Passo 8 — Mobile primeiro
- Teste a 390 px de largura antes do desktop.
- Botões com pelo menos 44 px de altura; ações importantes na zona do polegar (WhatsApp flutuante embaixo à direita).
- Fluxos longos viram **passos** (uma pergunta por tela) — ver `Agendamento.tsx`.
- `min-h-[100svh]` no topo (não `100vh`, que quebra com a barra do navegador no celular).
- `touch-action: pan-y` em áreas arrastáveis horizontalmente, para não travar a rolagem.

## Passo 9 — Contato que funciona de verdade
- Um único `linkWhatsapp()` em `src/lib/whatsapp.ts`, sempre com `encodeURIComponent`.
- Mensagem organizada com os campos em **negrito** (`*Campo:*`) para a dona ler rápido.
- Validação: limite de caracteres, `trim()`, bloquear data passada.
- Teste automático das regras da cliente (número, horários, campos da mensagem) em `src/lib/whatsapp.test.ts`.

## Passo 10 — Documentar
- `DESIGN.md`: conceito, leitura da logo, intro, movimento, assinatura, seções, bibliotecas, origem das fotos, conteúdo a confirmar.
- Cada componente com comentário no topo.
- Ser honesto: o que foi inventado ou gerado está marcado para troca.

---

## Checklist final
- [ ] Logo no canto superior esquerdo, menu limpo, CTA principal destacado
- [ ] Intro ≤ 3 s, pulável, desligada com "reduzir movimento"
- [ ] Vídeo com `poster`, `muted`, `playsInline`, `autoPlay`, `loop`
- [ ] Nenhuma cor crua em componente
- [ ] Nenhuma linha divisória / grade de cartões com borda
- [ ] Interação assinatura ligada ao negócio
- [ ] Testado em 390 px
- [ ] Título e descrição da página (`head()`) com o nome da marca
- [ ] `DESIGN.md` atualizado
