/**
 * PERGUNTAS FREQUENTES — acordeão leve.
 * EFEITO: só a pergunta aberta ganha cor neon; resposta abre com altura
 * animada. Sem linhas divisórias: o espaço entre itens faz a separação.
 * As respostas são exemplos plausíveis — confirmar com a cliente.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TituloSecao } from "./Revelar";

const FAQ = [
  { p: "Quanto tempo leva o serviço?", r: "Depende do serviço: uma lavagem detalhada leva em média 2 horas; polimento e higienização podem levar o dia. Avisamos certinho no agendamento." },
  { p: "Preciso deixar o carro no estúdio?", r: "Sim, trabalhamos no nosso estúdio para garantir iluminação e produtos ideais. Combine o melhor horário pelo WhatsApp." },
  { p: "Os produtos danificam a pintura?", r: "Não. Usamos produtos de pH neutro e técnicas que protegem verniz, plásticos e couro." },
  { p: "Como funciona o plano mensal?", r: "Você escolhe a frequência, garante prioridade na agenda e paga um valor fixo por mês — sai mais em conta que lavagens avulsas." },
];

export function Perguntas() {
  const [aberta, setAberta] = useState<number | null>(0);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <TituloSecao rotulo="Dúvidas" titulo="Perguntas frequentes" />
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <div key={f.p} className={`rounded-2xl px-5 transition-colors ${aberta === i ? "bg-vidro" : ""}`}>
              <button onClick={() => setAberta(aberta === i ? null : i)} aria-expanded={aberta === i} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                <span className={`min-w-0 font-semibold sm:text-lg ${aberta === i ? "text-neon" : ""}`}>{f.p}</span>
                <Plus className={`h-5 w-5 shrink-0 transition-transform ${aberta === i ? "rotate-45 text-neon" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {aberta === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-muted-foreground">
                    {f.r}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
