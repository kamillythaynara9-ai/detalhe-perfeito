# Detalhe Perfeito · site novo (DERS)

Site refeito do zero em HTML, CSS e JavaScript puros, sem build. O site antigo
(React, em `src/`) continua intacto. Os dois vão juntos no mesmo deploy:
veja "Trocar o site principal" no README da raiz.

## Conceito
"Do sabão ao espelho": a página faz a lavagem. Começa no carro sujo, passa pela
névoa clara da espuma (agendar, serviços) e termina no preto espelhado do estúdio.
Cores da logo: preto, prata cromado e o verde das estrelas. Fontes: Archivo
(larga, como as letras da logo) + Hanken Grotesk.

## O que tem
- Intro (2,3 s, só na primeira visita): espuma cobre a tela, um rodo passa e seca, a logo aparece com um reflexo.
- Topo "lave você mesmo": a foto do carro sujo cobre a do carro limpo; passar o dedo ou o mouse lava. Um rodo passa sozinho uma vez para mostrar. Passou de 55%, o resto some, um reflexo corre e aparece "Sujar de novo".
- Agendar logo depois do topo: avulso em 4 passos e plano mensal em 5 (frequência, dias fixos, a cada 15 dias com um dia só, personalizado a cada N dias, horário e serviços por dia), com a ficha do pedido se preenchendo ao lado. Tudo vai para o WhatsApp, nada é salvo.
- Serviços em painéis que se empilham ao rolar, com foto real e "Agendar este" (já chega com o serviço marcado).
- O vídeo do topo antigo virou a vitrine "O acabamento": cresce ao entrar na tela e tem reflexo no chão molhado.
- Planos (uma vez / todo mês) num interruptor.
- Perguntas frequentes, contato, WhatsApp flutuante.
- Modo escuro do aparelho: as seções claras viram grafite.

## Onde mudar o conteúdo
Tudo no topo de `script.js`: `MARCA`, `SERVICOS`, `HORARIOS`, `TIPOS_VEICULO`, `DIAS_SEMANA`, `FREQUENCIAS_PLANO`, `PLANOS`, `FAQ`. Cores e fontes em `:root` no `styles.css`.

## Real x exemplo
- Real: nome, logo, serviços, horários, dias de atendimento, WhatsApp, Instagram, cidade, regras do agendamento e do plano mensal.
- Exemplo, confirmar: respostas das perguntas frequentes e as promessas dos planos (vieram do site antigo).
- Avaliações: espaço reservado; os depoimentos do site antigo eram inventados e não entraram.
- Fotos dos serviços: Pexels (licença livre). Carro sujo/limpo e vídeo: os mesmos do site antigo. Trocar por fotos reais do estúdio quando houver.
