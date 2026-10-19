/**
 * DEPOIMENTOS — carrossel arrastável com o dedo.
 * EFEITO: frases grandes entre aspas neon, sem caixas com borda; as
 * estrelas verdes repetem as 4 estrelas da logo (aqui 5, de avaliação).
 * INTERAÇÃO: arrastar para os lados (drag do Framer Motion) — gesto
 * natural no celular. Texto de exemplo: trocar por avaliações reais.
 */
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TituloSecao } from "./Revelar";

const DEPOIMENTOS = [
  { nome: "Rafael M.", carro: "Jeep Compass", texto: "Levei achando que não tinha mais jeito no banco. Voltou parecendo zero. Atendimento nota 10." },
  { nome: "Juliana S.", carro: "Honda Fit", texto: "Agendei pelo WhatsApp em 1 minuto e o carro ficou com cheiro de novo. Virei cliente do plano mensal." },
  { nome: "Carlos A.", carro: "Yamaha MT-07", texto: "Cuidado absurdo com a moto. Corrente limpa, motor brilhando. Recomendo de olhos fechados." },
  { nome: "Patrícia L.", carro: "Toyota Corolla", texto: "O polimento tirou os riscos que eu achava que eram para sempre. Parece outro carro." },
];

export function Depoimentos() {
  const trilho = useRef<HTMLDivElement>(null);
  const [limite, setLimite] = useState(0);

  // Calcula até onde dá para arrastar (largura do conteúdo - largura visível)
  useEffect(() => {
    const calc = () => trilho.current && setLimite(trilho.current.scrollWidth - trilho.current.offsetWidth);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-5">
        <TituloSecao rotulo="Quem já brilhou" titulo={<>Clientes que<br />voltam sempre</>} />
        <div ref={trilho} className="cursor-grab active:cursor-grabbing">
          <motion.div drag="x" dragConstraints={{ left: -limite, right: 0 }} className="flex gap-6">
            {DEPOIMENTOS.map((d) => (
              <figure key={d.nome} className="bg-vidro w-[82vw] max-w-sm shrink-0 rounded-[2rem_0.5rem_2rem_0.5rem] p-7">
                <div className="mb-4 text-neon">★★★★★</div>
                <blockquote className="text-lg leading-relaxed"><span className="texto-neon font-display text-3xl">“</span>{d.texto}</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground"><strong className="text-foreground">{d.nome}</strong> · {d.carro}</figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
        <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">← arraste →</p>
      </div>
    </section>
  );
}
