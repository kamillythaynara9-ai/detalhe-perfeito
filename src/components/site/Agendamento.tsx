/**
 * AGENDAMENTO — "Escolha, agende e pronto."
 * DOIS CAMINHOS, decididos no passo 1:
 *
 * AVULSO (4 passos, um por tela, ideal para celular):
 *   1. Serviço(s)  — pode marcar mais de um
 *   2. Veículo     — tipo + modelo
 *   3. Data e hora — horários fixos: 8h, 9h30, 11h, 13h30, 15h, 16h30
 *   4. Nome + resumo -> abre o WhatsApp com tudo preenchido
 *
 * PLANO MENSAL (5 passos) — é uma agenda fixa, não um dia só:
 *   1. Serviço     — "Plano mensal" (exclusivo: desmarca os avulsos)
 *   2. Veículo     — tipo + modelo
 *   3. Dias        — frequência (toda semana / a cada 15 dias) + dias fixos;
 *                    ou "Personalizado": a pessoa digita o intervalo (ex.: a
 *                    cada 3 dias) e não escolhe dia da semana
 *   4. Cada dia    — horário e um ou mais serviços daquele dia (ex.: terça
 *                    lavagem, sexta lavagem + higienização). Botões, não
 *                    <select>: a lista nativa ficava ilegível no tema escuro.
 *   5. Início + nome + observação -> WhatsApp com a agenda organizada
 *
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
import { DIAS_SEMANA, FREQUENCIAS_PLANO, HORARIOS, ID_PLANO_MENSAL, SERVICOS, TIPOS_VEICULO } from "@/config/marca";
import { formatarData, linkWhatsapp, mensagemAgendamento, mensagemPlanoMensal } from "@/lib/whatsapp";
import { Revelar } from "./Revelar";

const PASSOS_AVULSO = ["Serviço", "Veículo", "Data e hora", "Confirmar"];
const PASSOS_MENSAL = ["Serviço", "Veículo", "Dias", "Horário e serviço", "Confirmar"];

const PLANO = SERVICOS.find((s) => s.id === ID_PLANO_MENSAL)!;
// Serviços que podem ser escolhidos para cada dia do plano.
const SERVICOS_DO_PLANO = SERVICOS.filter((s) => s.id !== ID_PLANO_MENSAL);

function hojeISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

const ehDomingo = (iso: string) => (iso ? new Date(`${iso}T12:00:00`).getDay() === 0 : false);
const horaCurta = (h: string) => h.replace(":00", "h").replace(":", "h");

const chip = (ativo: boolean) =>
  `corte-hexagono px-4 py-3 text-sm font-semibold transition-all ${ativo ? "bg-gradiente-neon text-primary-foreground shadow-neon" : "bg-secondary text-foreground hover:text-neon"}`;
const chipPequeno = (ativo: boolean) =>
  `corte-hexagono px-3 py-2 text-xs font-semibold transition-all ${ativo ? "bg-gradiente-neon text-primary-foreground" : "bg-secondary text-foreground hover:text-neon"}`;
const campo = "w-full rounded-xl bg-input px-4 py-3.5 text-foreground outline-none ring-neon placeholder:text-muted-foreground focus:ring-2";

type ConfigDia = { horario: string; servicos: string[] };
// No personalizado não há dia da semana: um único bloco de horário/serviços.
const CHAVE_PERSONALIZADO = "personalizado";
const DIA_VAZIO: ConfigDia = { horario: "", servicos: [] };

export function Agendamento() {
  const [passo, setPasso] = useState(0);
  const [servicos, setServicos] = useState<string[]>([]);
  const [tipo, setTipo] = useState("");
  const [modelo, setModelo] = useState("");
  const [nome, setNome] = useState("");
  // avulso
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  // plano mensal
  const [frequencia, setFrequencia] = useState<string>(FREQUENCIAS_PLANO[0]);
  const [dias, setDias] = useState<Record<string, ConfigDia>>({});
  const [intervalo, setIntervalo] = useState("");
  const [inicio, setInicio] = useState("");
  const [observacao, setObservacao] = useState("");

  const mensal = servicos.includes(PLANO.nome);
  const PASSOS = mensal ? PASSOS_MENSAL : PASSOS_AVULSO;
  const ultimo = PASSOS.length - 1;
  // Dias escolhidos sempre na ordem da semana, não na ordem do clique.
  const personalizado = frequencia === "Personalizado";
  const nIntervalo = Number(intervalo);
  const intervaloOk = Number.isInteger(nIntervalo) && nIntervalo >= 1 && nIntervalo <= 30;
  const rotuloIntervalo = `A cada ${nIntervalo} ${nIntervalo === 1 ? "dia" : "dias"}`;
  const diasEscolhidos: string[] = personalizado ? [CHAVE_PERSONALIZADO] : DIAS_SEMANA.filter((d) => d in dias);
  const nomeDia = (d: string) => (d === CHAVE_PERSONALIZADO ? rotuloIntervalo : d);
  const cfg = (d: string) => dias[d] ?? DIA_VAZIO;

  const completo = useMemo(() => {
    const veiculoOk = !!tipo && modelo.trim().length >= 2;
    const nomeOk = nome.trim().length >= 2;
    if (!mensal) {
      return [servicos.length > 0, veiculoOk, !!data && !ehDomingo(data) && !!horario, nomeOk][passo];
    }
    return [
      true,
      veiculoOk,
      personalizado ? intervaloOk : diasEscolhidos.length > 0,
      diasEscolhidos.every((d) => cfg(d).horario && cfg(d).servicos.length > 0),
      !!inicio && !ehDomingo(inicio) && nomeOk,
    ][passo];
  }, [mensal, passo, servicos, tipo, modelo, nome, data, horario, dias, diasEscolhidos, inicio, personalizado, intervaloOk]);

  // Plano mensal é exclusivo: escolher ele limpa os avulsos e vice-versa.
  const alternar = (n: string) =>
    setServicos((s) => {
      if (n === PLANO.nome) return s.includes(n) ? [] : [n];
      const sem = s.filter((x) => x !== PLANO.nome);
      return sem.includes(n) ? sem.filter((x) => x !== n) : [...sem, n];
    });

  const alternarDia = (d: string) =>
    setDias((atual) => {
      const novo = { ...atual };
      if (d in novo) delete novo[d];
      else novo[d] = DIA_VAZIO;
      return novo;
    });

  const ajustarDia = (d: string, parte: Partial<ConfigDia>) => setDias((atual) => ({ ...atual, [d]: { ...(atual[d] ?? DIA_VAZIO), ...parte } }));
  // Cada dia pode ter mais de um serviço (ex.: lavagem + higienização).
  const alternarServicoDia = (d: string, n: string) => {
    const atuais = cfg(d).servicos;
    ajustarDia(d, { servicos: atuais.includes(n) ? atuais.filter((x) => x !== n) : [...atuais, n] });
  };

  const enviar = () => {
    const msg = mensal
      ? mensagemPlanoMensal({
          tipoVeiculo: tipo,
          modelo: modelo.trim(),
          frequencia: personalizado ? rotuloIntervalo : frequencia,
          dias: diasEscolhidos.map((d) => ({ dia: nomeDia(d), horario: cfg(d).horario, servico: cfg(d).servicos.join(", ") })),
          inicio,
          nome: nome.trim(),
          observacao: observacao.trim() || undefined,
        })
      : mensagemAgendamento({ servicos, tipoVeiculo: tipo, modelo: modelo.trim(), data, horario, nome: nome.trim() });
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
            <span>Passo {passo + 1} de {PASSOS.length}</span><span className="text-neon">{PASSOS[passo]}</span>
          </div>
          <div className="mb-8 h-1 overflow-hidden rounded-full bg-secondary">
            <motion.div className="h-full bg-gradiente-neon" animate={{ width: `${((passo + 1) / PASSOS.length) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`${mensal}-${passo}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              {passo === 0 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Qual serviço?</h3>
                  <div className="flex flex-wrap gap-3">
                    {SERVICOS.map((s) => (
                      <button key={s.id} onClick={() => alternar(s.nome)} className={chip(servicos.includes(s.nome))}>{s.nome}</button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {mensal ? "No plano mensal você monta sua agenda fixa: dias, horários e o serviço de cada dia." : "Pode escolher mais de um."}
                  </p>
                </>
              )}

              {passo === 1 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Qual o seu veículo?</h3>
                  <div className="mb-6 flex flex-wrap gap-3">
                    {TIPOS_VEICULO.map((t) => <button key={t} onClick={() => setTipo(t)} className={chip(tipo === t)}>{t}</button>)}
                  </div>
                  <label className="mb-2 block text-sm text-muted-foreground" htmlFor="modelo">Modelo</label>
                  <input id="modelo" value={modelo} maxLength={60} onChange={(e) => setModelo(e.target.value)} placeholder="Ex.: Onix 2022, Compass, CB 500" className={campo} />
                </>
              )}

              {/* ---------- AVULSO ---------- */}
              {!mensal && passo === 2 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Quando?</h3>
                  <input type="date" min={hojeISO()} value={data} onChange={(e) => setData(e.target.value)} className={`${campo} mb-2 [color-scheme:dark]`} />
                  {ehDomingo(data) && <p className="mb-2 text-sm text-destructive">Aos domingos não atendemos. Escolha outro dia.</p>}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {HORARIOS.map((h) => <button key={h} onClick={() => setHorario(h)} className={chip(horario === h)}>{horaCurta(h)}</button>)}
                  </div>
                </>
              )}

              {!mensal && passo === 3 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Como podemos te chamar?</h3>
                  <input value={nome} maxLength={80} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className={`${campo} mb-6`} />
                  <Resumo linhas={[["Serviço", servicos.join(", ")], ["Veículo", `${tipo} · ${modelo}`], ["Dia", data && formatarData(data)], ["Hora", horario]]} />
                </>
              )}

              {/* ---------- PLANO MENSAL ---------- */}
              {mensal && passo === 2 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Com que frequência?</h3>
                  <div className="mb-8 flex flex-wrap gap-3">
                    {FREQUENCIAS_PLANO.map((f) => <button key={f} onClick={() => setFrequencia(f)} className={chip(frequencia === f)}>{f}</button>)}
                  </div>
                  {personalizado ? (
                    <>
                      <label htmlFor="intervalo" className="mb-3 block font-display text-lg uppercase">De quantos em quantos dias?</label>
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        <span className="text-muted-foreground">A cada</span>
                        <input id="intervalo" type="number" inputMode="numeric" min={1} max={30} value={intervalo} onChange={(e) => setIntervalo(e.target.value)} placeholder="3" className={`${campo} !w-24 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`} />
                        <span className="text-muted-foreground">dias</span>
                      </div>
                      {intervalo && !intervaloOk && <p className="mt-2 text-sm text-destructive">Digite um número de 1 a 30.</p>}
                    </>
                  ) : (
                    <>
                      <h3 className="mb-5 font-display text-lg uppercase">Em quais dias?</h3>
                      <div className="flex flex-wrap gap-3">
                        {DIAS_SEMANA.map((d) => <button key={d} onClick={() => alternarDia(d)} className={chip(d in dias)}>{d}</button>)}
                      </div>
                      <p className="mt-4 text-xs text-muted-foreground">Pode escolher mais de um. Não atendemos aos domingos.</p>
                    </>
                  )}
                </>
              )}

              {mensal && passo === 3 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">{personalizado ? "Horário e serviço" : "Horário e serviço de cada dia"}</h3>
                  <div className="space-y-8">
                    {diasEscolhidos.map((d) => (
                      <div key={d}>
                        <p className="mb-3 font-display text-sm uppercase text-neon">{nomeDia(d)}</p>
                        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                          {HORARIOS.map((h) => <button key={h} onClick={() => ajustarDia(d, { horario: h })} className={chipPequeno(cfg(d).horario === h)}>{horaCurta(h)}</button>)}
                        </div>
                        <p className="mb-2 text-xs text-muted-foreground">Serviços deste dia (pode marcar mais de um)</p>
                        <div className="flex flex-wrap gap-2" role="group" aria-label={`Serviços de ${nomeDia(d)}`}>
                          {SERVICOS_DO_PLANO.map((s) => (
                            <button key={s.id} onClick={() => alternarServicoDia(d, s.nome)} className={chipPequeno(cfg(d).servicos.includes(s.nome))}>{s.nome}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {mensal && passo === 4 && (
                <>
                  <h3 className="mb-5 font-display text-lg uppercase">Quando começamos?</h3>
                  <input type="date" min={hojeISO()} value={inicio} onChange={(e) => setInicio(e.target.value)} aria-label="Data de início" className={`${campo} mb-2 [color-scheme:dark]`} />
                  {ehDomingo(inicio) && <p className="mb-2 text-sm text-destructive">Aos domingos não atendemos. Escolha outro dia.</p>}
                  <input value={nome} maxLength={80} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className={`${campo} mb-3 mt-4`} />
                  <textarea value={observacao} maxLength={200} rows={2} onChange={(e) => setObservacao(e.target.value)} placeholder="Alguma observação? (opcional)" className={`${campo} mb-6 resize-none`} />
                  <Resumo
                    linhas={[
                      ["Veículo", `${tipo} · ${modelo}`],
                      ["Frequência", personalizado ? rotuloIntervalo : frequencia],
                      ...diasEscolhidos.map((d) => [personalizado ? "Horário" : d, `${horaCurta(cfg(d).horario)} · ${cfg(d).servicos.join(", ")}`] as [string, string]),
                      ["Início", inicio && formatarData(inicio)],
                    ]}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-4">
            <button onClick={() => setPasso((p) => p - 1)} disabled={passo === 0} className="flex items-center gap-2 text-sm text-muted-foreground disabled:opacity-0">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
            {passo < ultimo ? (
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

/** Resumo final antes de enviar: rótulo à esquerda, valor à direita. */
function Resumo({ linhas }: { linhas: [string, string][] }) {
  return (
    <dl className="space-y-2 text-sm">
      {linhas.map(([k, v]) => (
        <div key={k} className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">{k}</dt><dd className="min-w-0 font-semibold">{v}</dd></div>
      ))}
    </dl>
  );
}
