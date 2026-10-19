/**
 * REVELAR — ajudante reutilizável.
 * EFEITO: o conteúdo sobe e aparece suavemente quando entra na tela.
 * Por que um componente? Para todas as seções entrarem com o MESMO ritmo
 * (consistência = sensação de marca). Mude aqui e muda no site todo.
 */
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Revelar({ children, atraso = 0, className }: { children: ReactNode; atraso?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Título de seção padrão: rótulo neon pequeno + título prata grande. */
export function TituloSecao({ rotulo, titulo }: { rotulo: string; titulo: ReactNode }) {
  return (
    <Revelar className="mb-10">
      <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neon">{rotulo}</p>
      <h2 className="texto-prata text-3xl font-black uppercase leading-tight sm:text-5xl">{titulo}</h2>
    </Revelar>
  );
}
