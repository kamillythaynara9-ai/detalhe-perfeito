/**
 * INTRO — abertura de ~2,5 s com a cara da marca (versão escolhida pela cliente).
 * EFEITO, em 3 tempos:
 *   1. a moldura em hexágono da logo se DESENHA em traço prata (0,1 s → 1,4 s);
 *   2. a logo surge no meio da moldura (1 s → 1,8 s);
 *   3. uma faixa de luz atravessa a tela na diagonal, como o reflexo de uma
 *      lâmpada passando num carro recém-polido (1,5 s → 2,6 s).
 * Depois a tela "abre" para cima como uma porta de garagem.
 * INTERAÇÃO: toque/clique em qualquer lugar pula a intro.
 * REGRAS: nunca passa de 3 s; aparece só uma vez por visita (sessionStorage);
 * com "reduzir movimento" ativo, nem aparece.
 * As animações (hexagono-desenhando, logo-surgindo, luz-atravessando) estão
 * em src/styles.css.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-detalhe-perfeito.png.asset.json";

const CHAVE = "dp-intro-vista";

export function Intro() {
  const reduzir = useReducedMotion();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    let jaViu = false;
    try { jaViu = sessionStorage.getItem(CHAVE) === "1"; } catch { /* modo privado */ }
    if (reduzir || jaViu) return setVisivel(false);
    try { sessionStorage.setItem(CHAVE, "1"); } catch { /* modo privado */ }
    const t = setTimeout(() => setVisivel(false), 2500);
    return () => clearTimeout(t);
  }, [reduzir]);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key="intro"
          aria-hidden
          onClick={() => setVisivel(false)}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center overflow-hidden bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        >
          <svg viewBox="0 0 300 180" className="animar-hexagono absolute w-[min(78vw,420px)]">
            <path d="M60 8 L240 8 L292 90 L240 172 L60 172 L8 90 Z" />
          </svg>
          <img src={logo.url} alt="" className="animar-logo-surgindo relative w-[min(62vw,330px)]" />
          <span className="animar-luz-atravessando absolute h-[140vh] w-[40vw]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
