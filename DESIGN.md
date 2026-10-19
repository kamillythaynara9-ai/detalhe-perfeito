# DESIGN.md — Detalhe Perfeito · Estúdio Automotivo

> Este arquivo explica **por que** o site é assim. Para o **método passo a passo** de construir qualquer site neste padrão, leia `METODO.md`.

## 1. Conceito
**"Brilho de vitrine."** O site deve dar a mesma sensação de entrar num estúdio de detalhamento à noite: escuro, luzes de LED refletindo em pintura molhada e um verde neon de "aprovado". Tudo o que se mexe imita **luz passando sobre um carro polido**.

## 2. O que li na logo → como virou design
| Na logo | No site | Onde está |
|---|---|---|
| Fundo preto | `--background` preto levemente azulado (preto puro cansa no celular) | `src/styles.css` |
| Carro e moldura prata | `--prata`, `--gradiente-prata`, utilitário `texto-prata` (títulos metálicos) | `styles.css` |
| Estrelas e "ESTÚDIO AUTOMOTIVO" verde neon | `--neon`, `--gradiente-neon`, `texto-neon`, `shadow-neon` — cor de **ação** (botões, destaques) | `styles.css` |
| Moldura em **hexágono** com pontas | `corte-hexagono` (clip-path) em botões, selos e seletor de plano | `styles.css` |
| Letras largas, técnicas, quadradas | Fonte **Orbitron** nos títulos | `__root.tsx` |
| Leitura | Fonte **Exo 2** (mesma família "automotiva", mas legível em textos longos) | `__root.tsx` |
| 4 estrelas | Estrelas que piscam em sequência (`estrela-piscando`) no topo | `Topo.tsx` |

Cantos assimétricos (`rounded-[2.5rem_0.75rem_...]`) lembram a curva de um para-lama: orgânico, mas com "ponta" como o hexágono.

## 3. Intro (`Intro.tsx`)
2,4 s: logo sai do desfoque → faixa de brilho passa por ela → a tela sobe como uma porta de garagem. Toque pula. "Reduzir movimento" desliga.

## 4. Movimento contínuo (algo sempre se mexe, devagar)
- `fundo-respirando` — manchas de luz do fundo pulsam (14 s).
- `FundoVivo.tsx` — a luz principal muda de lugar conforme a rolagem (substitui linhas divisórias).
- `gota-escorrendo` — gotas descendo no topo.
- `brilho-varrendo` — reflexo passando em títulos e botões.
- `letreiro-deslizando` — faixa com os nomes dos serviços.
- `pulso-whatsapp` — anel no botão flutuante.

## 5. Interação assinatura
**Lanterna de inspeção** (`Topo.tsx`): um ponto de luz verde segue o dedo/mouse sobre o vídeo, como a lanterna que o detalhista usa para achar riscos. Junto com o **antes/depois arrastável** (`AntesDepois.tsx`), são as duas coisas que só fazem sentido neste negócio.

## 6. Seções (ordem = conversa de venda)
1. **Topo** — impacto: vídeo real, promessa, botão Agendar.
2. **Serviços** — lista tipográfica grande (não cartões). Toque abre foto + descrição.
3. **Antes e depois** — prova. Arrastar a linha. Rótulos dentro da imagem.
4. **Planos** — "uma vez ou todo mês?" — um painel que troca, não dois cartões.
5. **Agendar** — 4 passos (serviço → veículo → data/hora → nome) → WhatsApp preenchido.
6. **Depoimentos** — carrossel arrastável (textos de exemplo).
7. **Perguntas frequentes** — acordeão (respostas de exemplo).
8. **Chamada final + contato**.

Menu: Serviços · Planos · **Agendar (destacado)** · Contato. Botão de WhatsApp flutuante sempre visível.

## 7. Bibliotecas
- **Framer Motion** — entradas na rolagem, parallax, arrastar (carrossel), transições entre passos.
- **lucide-react** — ícones pequenos.
- **Tailwind CSS v4** — tokens em `src/styles.css`.

## 8. Fotos e vídeo
- Serviços: Unsplash (photo-1607860108855, 1601362840469, 1520340356584, 1558981806) e Pexels (6872163).
- Antes/depois e capa do topo: imagens geradas do **mesmo carro** (sujo/limpo) — é impossível achar banco de fotos com o mesmo carro nas duas condições. **Trocar por fotos reais do estúdio assim que houver.**
- Vídeo do topo: animação gerada a partir da foto de capa. **Trocar por um vídeo real do estúdio quando possível.**

## 9. Conteúdo a confirmar com a cliente
Depoimentos, respostas do FAQ, "não atendemos domingo" e as promessas do plano mensal foram escritos como exemplo.
