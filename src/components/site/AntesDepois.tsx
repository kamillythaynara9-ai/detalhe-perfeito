/**
 * ANTES E DEPOIS — comparador arrastável (pedido da cliente).
 * EFEITO: duas fotos do MESMO carro empilhadas — suja embaixo, limpa por
 * cima. A limpa é recortada por clip-path até a posição da linha.
 * INTERAÇÃO: arrastar a alça (mouse ou dedo) move a linha; também funciona
 * com setas do teclado (acessibilidade). Rótulos "ANTES" e "DEPOIS" ficam
 * dentro da própria imagem. Ao entrar na tela, a linha faz um "convite"
 * (vai e volta sozinha) para mostrar que dá para arrastar.
 * TÉCNICA: Pointer Events + setPointerCapture = um código só para mouse e toque.
 * touch-action: pan-y deixa a pessoa rolar a página na vertical sem travar.
 */
import { animate, useInView } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import limpo from "@/assets/carro-limpo.jpg";
import sujo from "@/assets/carro-sujo.jpg";
import { TituloSecao } from "./Revelar";

export function AntesDepois() {
  const caixa = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // % da largura
  const arrastando = useRef(false);
  const visto = useInView(caixa, { once: true, amount: 0.6 });

  // Animação-convite: 50 -> 25 -> 70 -> 50
  useEffect(() => {
    if (!visto) return;
    const c = animate(50, [50, 25, 72, 50], { duration: 2.2, ease: "easeInOut", onUpdate: setPos });
    return () => c.stop();
  }, [visto]);

  const moverPara = (clientX: number) => {
    const r = caixa.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section id="antes-depois" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <TituloSecao rotulo="Antes e depois" titulo={<>Arraste e veja<br />a <span className="texto-neon">diferença</span></>} />

        <div
          ref={caixa}
          className="shadow-profunda relative aspect-[4/3] w-full select-none overflow-hidden rounded-[2.5rem_0.75rem_2.5rem_0.75rem] [touch-action:pan-y] sm:aspect-[16/9]"
          onPointerDown={(e) => { arrastando.current = true; e.currentTarget.setPointerCapture(e.pointerId); moverPara(e.clientX); }}
          onPointerMove={(e) => arrastando.current && moverPara(e.clientX)}
          onPointerUp={() => (arrastando.current = false)}
          onPointerCancel={() => (arrastando.current = false)}
        >
          <img src={sujo} alt="Carro sujo antes da lavagem" className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
          <img
            src={limpo}
            alt="Mesmo carro limpo e polido depois do serviço"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            draggable={false}
            loading="lazy"
          />

          <span className="bg-vidro absolute left-4 top-4 rounded-full px-4 py-1.5 font-display text-xs font-bold tracking-widest">ANTES</span>
          <span className="absolute right-4 top-4 rounded-full bg-gradiente-neon px-4 py-1.5 font-display text-xs font-bold tracking-widest text-primary-foreground">DEPOIS</span>

          {/* Linha + alça */}
          <div className="absolute inset-y-0 w-0.5 bg-neon shadow-neon" style={{ left: `${pos}%` }}>
            <button
              role="slider"
              aria-label="Comparar antes e depois"
              aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
                if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
              }}
              className="corte-hexagono absolute left-1/2 top-1/2 flex h-12 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gradiente-neon text-primary-foreground"
            >
              <ChevronsLeftRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
