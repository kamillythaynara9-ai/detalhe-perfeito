/**
 * TOPO (hero) — primeira impressão.
 * EFEITO: vídeo real do carro com reflexos rodando em loop no fundo
 * (com foto de capa enquanto carrega), gotas de água escorrendo
 * (gota-escorrendo) e título prata metálico.
 * INTERAÇÃO ASSINATURA "reflexo de polimento": um ponto de luz segue o
 * dedo/mouse por cima do vídeo, como a lanterna que o detalhista usa para
 * procurar riscos na pintura. Só faz sentido num estúdio de estética
 * automotiva — é o detalhe que a pessoa lembra.
 * ROLAGEM: o vídeo desce mais devagar que a página (parallax) e escurece.
 */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import video from "@/assets/hero-video.mp4.asset.json";
import capa from "@/assets/carro-limpo.jpg";

// Posições fixas (não aleatórias) para o SSR e o navegador renderizarem igual.
const GOTAS = [8, 19, 31, 46, 58, 67, 79, 91].map((left, i) => ({
  left, duracao: 4 + (i % 3) * 1.5, atraso: i * 0.7,
}));

export function Topo() {
  const ref = useRef<HTMLElement>(null);
  const luz = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yVideo = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const escurecer = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  // Move a lanterna direto no estilo (sem re-render) — fluido no celular.
  const moverLuz = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    luz.current?.style.setProperty("--x", `${e.clientX - r.left}px`);
    luz.current?.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section id="topo" ref={ref} onPointerMove={moverLuz} className="relative flex min-h-[100svh] items-end overflow-hidden pb-24 pt-28">
      <motion.div style={{ y: yVideo }} className="absolute inset-0 -z-10">
        <video
          src={video.url}
          poster={capa}
          autoPlay muted loop playsInline
          className="h-full w-full object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity: escurecer }} className="absolute inset-0 -z-10 bg-background" />
      {/* degradê inferior que funde o vídeo com a próxima seção (sem linha) */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-background to-transparent" />

      {/* Lanterna de inspeção que segue o dedo */}
      <div
        ref={luz}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen [background:radial-gradient(180px_circle_at_var(--x,70%)_var(--y,40%),oklch(0.82_0.22_142/0.22),transparent_70%)]"
      />

      {GOTAS.map((g, i) => (
        <span
          key={i}
          aria-hidden
          className="animar-gota absolute top-0 h-10 w-px bg-gradient-to-b from-transparent to-prata"
          style={{ left: `${g.left}%`, animationDuration: `${g.duracao}s`, animationDelay: `${g.atraso}s` }}
        />
      ))}

      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6 }}
          className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-neon"
        >
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="animar-estrela" style={{ animationDelay: `${i * 0.3}s` }}>★</span>
          ))}
          <span className="ml-2">Estúdio automotivo · São Paulo</span>
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.7, duration: 0.8 }}
          className="texto-prata text-4xl font-black uppercase leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          Seu carro com<br />brilho de <span className="texto-neon">vitrine</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
          className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg"
        >
          Lavagem detalhada, higienização e polimento feitos à mão, sem pressa e sem atalho.
          Cada detalhe, perfeito.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.15 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a href="#agendar" className="corte-hexagono bg-gradiente-neon animar-brilho shadow-neon px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground">
            Agendar agora
          </a>
          <a href="#antes-depois" className="px-2 py-4 text-sm uppercase tracking-widest text-prata underline-offset-8 hover:underline">
            Ver resultado →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
