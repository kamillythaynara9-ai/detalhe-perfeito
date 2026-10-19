/**
 * PLANOS — "Como você prefere cuidar: uma vez ou todo mês?"
 * EFEITO: um seletor em forma de hexágono alterna entre "Lavagem única" e
 * "Plano mensal"; o conteúdo troca com deslize suave (sem recarregar).
 * Em vez de dois cartões lado a lado com borda, é UM painel de vidro que
 * muda — menos "caixa", mais conversa.
 * INTERAÇÃO: os dois caminhos levam ao WhatsApp com mensagem pronta.
 * Preços não foram informados pela cliente, então não exibimos valores.
 */
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { linkWhatsapp } from "@/lib/whatsapp";
import { TituloSecao } from "./Revelar";

const OPCOES = {
  unica: {
    rotulo: "Uma vez",
    titulo: "Lavagem única",
    texto: "Para aquela ocasião especial, a venda do carro ou só o prazer de ver ele brilhando de novo.",
    itens: ["Escolha um ou mais serviços", "Agendamento no horário que você quiser", "Resultado garantido no mesmo dia"],
    mensagem: "Olá! Quero saber mais sobre uma lavagem única.",
  },
  mensal: {
    rotulo: "Todo mês",
    titulo: "Plano mensal",
    texto: "Seu carro impecável o mês inteiro, sem precisar lembrar de agendar. Preço fixo e prioridade na agenda.",
    itens: ["Visitas programadas no mês", "Prioridade nos melhores horários", "Valor mais vantajoso por lavagem"],
    mensagem: "Olá! Quero conhecer o plano mensal.",
  },
} as const;

type Chave = keyof typeof OPCOES;

export function Planos() {
  const [escolha, setEscolha] = useState<Chave>("mensal");
  const o = OPCOES[escolha];

  return (
    <section id="planos" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <TituloSecao rotulo="Planos" titulo={<>Como você prefere cuidar: <span className="texto-neon">uma vez ou todo mês?</span></>} />

        <div className="bg-vidro corte-hexagono relative mb-8 grid grid-cols-2 p-1.5">
          {(Object.keys(OPCOES) as Chave[]).map((k) => (
            <button key={k} onClick={() => setEscolha(k)} className="relative z-10 py-3 font-display text-xs font-bold uppercase tracking-widest sm:text-sm">
              {escolha === k && (
                <motion.span layoutId="plano-ativo" className="corte-hexagono bg-gradiente-neon absolute inset-0 -z-10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className={escolha === k ? "text-primary-foreground" : "text-muted-foreground"}>{OPCOES[k].rotulo}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={escolha}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="bg-vidro rounded-[2.5rem_0.75rem_2.5rem_0.75rem] p-7 sm:p-10"
          >
            <h3 className="texto-prata text-2xl font-black uppercase sm:text-3xl">{o.titulo}</h3>
            <p className="mt-3 text-muted-foreground">{o.texto}</p>
            <ul className="mt-6 space-y-3">
              {o.itens.map((it) => (
                <li key={it} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-neon" />{it}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#agendar" className="corte-hexagono bg-gradiente-neon animar-brilho px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground">Agendar</a>
              <a href={linkWhatsapp(o.mensagem)} target="_blank" rel="noopener" className="px-2 py-3.5 text-sm uppercase tracking-widest text-prata hover:text-neon">Tirar dúvidas →</a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
