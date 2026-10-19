/**
 * AGENDAMENTO — "Escolha, agende e pronto."
 * FLUXO EM 4 PASSOS (um por tela, ideal para celular):
 *   1. Serviço(s)  — pode marcar mais de um
 *   2. Veículo     — tipo + modelo
 *   3. Data e hora — horários fixos: 8h, 9h30, 11h, 13h30, 15h, 16h30
 *   4. Nome + resumo -> abre o WhatsApp com tudo preenchido
 * EFEITO: barra de progresso neon cresce a cada passo; cada passo entra
 * deslizando. O botão "Continuar" só acende quando o passo está completo.
 * POR QUE WHATSAPP E NÃO FORMULÁRIO COM BANCO: a cliente pediu que tudo
 * vá para o WhatsApp — é onde ela já atende. Nada é salvo no site.
 * VALIDAÇÃO: nome e modelo têm limite de tamanho e são aparados; datas
 * passadas e domingos são bloqueados.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { HORARIOS, SERVICOS, TIPOS_VEICULO } from "@/config/marca";
import { formatarData, linkWhatsapp, mensagemAgendamento } from "@/lib/whatsapp";
import { Revelar } from "./Revelar";

const PASSOS = ["Serviço", "Veículo", "Data e hora", "Confirmar"];

function hojeISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

const chip = (ativo: boolean) =>
  `corte-hexagono px-4 py-3 text-sm font-semibold transition-all ${ativo ? "bg-gradiente-neon text-primary-foreground shadow-neon" : "bg-secondary text-foreground hover:text-neon"}`;

export function Agendamento() {
  const [passo, setPasso] = useState(0);
  const [servicos, setServicos] = useState<string[]>([]);
  const [tipo, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [nome, setNome] = useState("");

  const domingo = data ? new Date(`${data}T12:00:00`).getDay() === 0 : false;
  const completo = useMemo(
    () => [servicos.length > 0, !!tipo && modelo.trim().length >= 2, !!data && !domingo && !!horario, nome.trim().length >= 2][passo],
    [passo, servicos, tipo, modelo, data, domingo, horario, nome],
  );

  const alternar = (n: string) => setServicos((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));

  const enviar = () => {
    const msg = mensagemAgendamento({ servicos, tipoVeiculo: tipo, modelo: modelo.trim(), data, horario, nome: nome.trim() });
    window.open(linkWhatsapp(msg), "_blank", "noopener");
  };

  return (
    <section id="agendar" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Revelar className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-neon">Agendar</p>
          <h2 className="texto-prata text-3xl font-black uppercase leading-tight sm:text-5xl">Escolha, agende<br />e <span className="texto-neon">pronto.</span></h2>
          <p className="mt-4 text-muted-foreground">Em poucos toques o seu pedido chega no nosso WhatsApp com tudo preenchido.</p>
        </Revelar>

        <div className="bg-vidro shadow-profunda rounded-[2.5rem_0.75rem_2.5rem_0.75rem] p-6 sm:p-10">
          {/* Progresso */}
          <div className="mb-2 flex justify-between text-[11px] uppercase tracking-widest text-muted-foreground">
            <span>Passo {passo + 1} de 4</span><span className="text-neon">{PASSOS[passo]}</span>
          </div>
          <div className="mb-8 h-1 overflow-hidden rounded-full bg-secondary">
            <motion.div className="h-full bg-gradiente-neon" animate={{ width: `${((passo + 1) / 4) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={passo} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              {passo === 0 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Qual serviço?</h3>
                  <div className="flex flex-wrap gap-3">
                    {SERVICOS.map((s) => (
                      <button key={s.id} onClick={() => alternar(s.nome)} className={chip(servicos.includes(s.nome))}>{s.nome}</button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">Pode escolher mais de um.</p>
                </>
              )}

              {passo === 1 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Qual o seu veículo?</h3>
                  <div className="mb-6 flex flex-wrap gap-3">
                    {TIPOS_VEICULO.map((t) => <button key={t} onClick={() => setTipo(t)} className={chip(tipo === t)}>{t}</button>)}
                  </div>
                  <label className="mb-2 block text-sm text-muted-foreground" htmlFor="modelo">Modelo</label>
                  <input id="modelo" value={modelo} maxLength={60} onChange={(e) => setModelo(e.target.value)} placeholder="Ex.: Onix 2022, Compass, CB 500"
                    className="w-full rounded-xl bg-input px-4 py-3.5 text-foreground outline-none ring-neon placeholder:text-muted-foreground focus:ring-2" />
                </>
              )}

              {passo === 2 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Quando?</h3>
                  <input type="date" min={hojeISO()} value={data} onChange={(e) => setData(e.target.value)}
                    className="mb-2 w-full rounded-xl bg-input px-4 py-3.5 text-foreground outline-none ring-neon [color-scheme:dark] focus:ring-2" />
                  {domingo && <p className="mb-2 text-sm text-destructive">Aos domingos não atendemos. Escolha outro dia.</p>}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {HORARIOS.map((h) => <button key={h} onClick={() => setHorario(h)} className={chip(horario === h)}>{h.replace(":00", "h").replace(":", "h")}</button>)}
                  </div>
                </>
              )}

              {passo === 3 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Como podemos te chamar?</h3>
                  <input value={nome} maxLength={80} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome"
                    className="mb-6 w-full rounded-xl bg-input px-4 py-3.5 text-foreground outline-none ring-neon placeholder:text-muted-foreground focus:ring-2" />
                  <dl className="space-y-2 text-sm">
                    {[["Serviço", servicos.join(", ")], ["Veículo", `${tipo} · ${modelo}`], ["Dia", data && formatarData(data)], ["Hora", horario]].map(([k, v]) => (
                      <div key={k} className="flex gap-3"><dt className="w-20 shrink-0 text-muted-foreground">{k}</dt><dd className="min-w-0 font-semibold">{v}</dd></div>
                    ))}
                  </dl>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-4">
            <button onClick={() => setPasso((p) => p - 1)} disabled={passo === 0} className="flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-0">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
            {passo < 3 ? (
              <button onClick={() => setPasso((p) => p + 1)} disabled={!completo}
                className="corte-hexagono bg-gradiente-neon flex items-center gap-2 px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition-opacity disabled:opacity-30">
                Continuar <Check className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={enviar} disabled={!completo}
                className="corte-hexagono bg-gradiente-neon animar-brilho shadow-neon flex items-center gap-2 px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground disabled:opacity-30">
                <MessageCircle className="h-4 w-4" /> Enviar no WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
