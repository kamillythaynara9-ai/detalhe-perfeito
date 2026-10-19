/**
 * Tempo da intro, compartilhado com o topo e o botão do WhatsApp para
 * entrarem logo depois que ela sobe. Ver Intro.tsx.
 */
/** Duração da intro em segundos, contada desde a abertura da página. */
export const DURACAO_INTRO = 2.5;

/** Segundos que faltam até a intro acabar (+ folga), para o topo entrar logo depois dela. */
export function atrasoAposIntro(folga = 0): number {
  const agora = typeof performance === "undefined" ? 0 : performance.now() / 1000;
  return Math.max(0, DURACAO_INTRO + folga - agora);
}
