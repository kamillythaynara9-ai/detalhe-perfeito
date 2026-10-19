/**
 * SERVIÇOS — os 6 serviços como LISTA TIPOGRÁFICA GRANDE, não grade de cartões.
 * EFEITO: cada nome é enorme, numerado (01, 02...). A faixa de texto
 * passando que havia antes da lista foi removida a pedido da cliente.
 * INTERAÇÃO: no computador, passar o mouse num serviço faz a foto real
 * dele flutuar seguindo o cursor. No celular (sem hover), tocar abre o
 * serviço como um acordeão com foto e descrição — o polegar decide.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SERVICOS } from "@/config/marca";
import { Revelar, TituloSecao } from "./Revelar";

export function Servicos() {
  const [aberto, setAberto] = useState<string | null>(SERVICOS[0]?.id ?? null);

  return (
    <section id="servicos" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <TituloSecao rotulo="Serviços" titulo={<>O cuidado certo<br />para cada detalhe</>} />

        <ul>
          {SERVICOS.map((s, i) => {
            const ativo = aberto === s.id;
            return (
              <Revelar key={s.id} atraso={i * 0.05}>
                <li>
                  <button
                    onClick={() => setAberto(ativo ? null : s.id)}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                    aria-expanded={ativo}
                  >
                    <span className="w-8 shrink-0 font-display text-xs text-neon">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`min-w-0 flex-1 text-lg font-semibold transition-colors sm:text-2xl ${ativo ? "texto-neon" : "text-foreground group-hover:text-neon"}`}>
                      {s.nome}
                    </span>
                    <Plus className={`h-6 w-6 shrink-0 transition-transform duration-300 ${ativo ? "rotate-45 text-neon" : "text-muted-foreground"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {ativo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 pb-8 pl-12 sm:grid-cols-[1fr_1.2fr] sm:items-center">
                          <p className="text-muted-foreground sm:text-lg">{s.resumo}</p>
                          <img src={s.foto} alt={s.nome} loading="lazy" className="shadow-profunda aspect-[16/10] w-full rounded-[2rem_0.5rem_2rem_0.5rem] object-cover" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Revelar>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
