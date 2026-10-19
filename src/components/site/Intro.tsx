/**
 * INTRO — abertura de ~2,4 s com a cara da marca.
 * EFEITO: a logo surge do escuro, as 4 estrelas verdes acendem uma a uma
 * e uma faixa de luz (brilho-varrendo) passa sobre ela, como o reflexo de
 * um carro recém-polido. Depois a tela "abre" para cima revelando o site.
 * INTERAÇÃO: toque/clique em qualquer lugar pula a intro.
 * REGRA: intro nunca passa de 3 s — o cliente quer o conteúdo, não um filme.
 * Com "reduzir movimento" ativo, a intro nem aparece.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-detalhe-perfeito.jpg.asset.json";

export function Intro() {
  const reduzir = useReducedMotion();
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    if (reduzir) return setVisivel(false);
    const t = setTimeout(() => setVisivel(false), 2400);
    return () => clearTimeout(t);
  }, [reduzir]);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          key="intro"
          onClick={() => setVisivel(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-background"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="animar-brilho w-64 sm:w-80"
          >
            <img src={logo.url} alt="Detalhe Perfeito — Estúdio Automotivo" className="w-full" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground"
          >
            toque para entrar
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
