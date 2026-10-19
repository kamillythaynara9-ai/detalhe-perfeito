/**
 * FUNDO VIVO — o degradê que fica atrás do site inteiro.
 * EFEITO: manchas de luz verde (da logo) "respiram" sem parar (fundo-respirando).
 * INTERAÇÃO DE ROLAGEM: conforme a pessoa rola, a mancha principal desce e
 * muda de lado — o fundo nunca é o mesmo em duas seções. Isso substitui as
 * linhas divisórias: a passagem de seção é sentida pela luz, não por uma borda.
 * TÉCNICA: atualizamos só variáveis CSS (--luz-x / --luz-y) dentro de
 * requestAnimationFrame. Nada de setState a cada pixel de rolagem — isso
 * travaria o celular.
 */
import { useEffect, useRef } from "react";

export function FundoVivo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight || 1;
        const p = window.scrollY / max; // 0 no topo, 1 no fim
        // A luz faz um "S": esquerda -> direita -> esquerda.
        const x = 50 + Math.sin(p * Math.PI * 2) * 35;
        const y = 10 + p * 80;
        ref.current?.style.setProperty("--luz-x", `${x}%`);
        ref.current?.style.setProperty("--luz-y", `${y}%`);
      });
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animar-respirar bg-gradiente-fundo absolute -inset-[10%] transition-[background] duration-700" />
    </div>
  );
}
