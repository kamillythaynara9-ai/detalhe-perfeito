/**
 * CABEÇALHO — logo à esquerda, menu limpo, "Agendar" em destaque.
 * EFEITO: começa transparente; ao rolar ganha vidro fosco (bg-vidro),
 * para não esconder o vídeo do topo mas continuar legível depois.
 * MOBILE (foco do site): menu vira botão que abre painel em tela cheia
 * com links grandes, fáceis de tocar com o polegar.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-detalhe-perfeito-recortada.png";

const LINKS = [
  { href: "#servicos", rotulo: "Serviços" },
  { href: "#planos", rotulo: "Planos" },
  { href: "#contato", rotulo: "Contato" },
];

export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const f = () => setRolou(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${rolou ? "bg-vidro py-2" : "py-4"}`}>
      {/* px-3: barra quase encostada na borda esquerda, como pediu a cliente. */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 md:px-5">
        <a href="#topo" className="flex min-w-0 items-center gap-2" aria-label="Detalhe Perfeito — início">
          {/* Logo sem fundo: um pouco maior e mais para o canto esquerdo */}
          <span className="h-14 w-36 shrink-0 md:h-16 md:w-44">
            <img src={logo} alt="" className="h-full w-full object-contain object-left" />
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-neon">
              {l.rotulo}
            </a>
          ))}
          <a href="#agendar" className="corte-hexagono bg-gradiente-neon animar-brilho px-6 py-2.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground">
            Agendar
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <a href="#agendar" className="corte-hexagono bg-gradiente-neon px-4 py-2 font-display text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
            Agendar
          </a>
          <button onClick={() => setAberto(true)} aria-label="Abrir menu" className="p-2 text-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-vidro fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => setAberto(false)} aria-label="Fechar menu" className="absolute right-5 top-5 p-2">
              <X className="h-7 w-7" />
            </button>
            {[...LINKS, { href: "#agendar", rotulo: "Agendar" }].map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setAberto(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
                className={`font-display text-3xl uppercase ${l.href === "#agendar" ? "texto-neon" : "texto-prata"}`}
              >
                {l.rotulo}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
