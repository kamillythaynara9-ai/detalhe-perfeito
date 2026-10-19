/**
 * Monta links do WhatsApp com a mensagem já preenchida.
 * --------------------------------------------------------------
 * COMO FUNCIONA: wa.me/<numero>?text=<mensagem codificada>.
 * SEMPRE use encodeURIComponent — acentos, quebras de linha e "&"
 * quebram o link se não forem codificados.
 */
import { MARCA } from "@/config/marca";

export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${MARCA.whatsappDigitos}?text=${encodeURIComponent(mensagem)}`;
}

export type PedidoAgendamento = {
  servicos: string[];
  tipoVeiculo: string;
  modelo: string;
  data: string; // AAAA-MM-DD
  horario: string;
  nome: string;
};

/** Converte "2026-10-21" em "21/10/2026" sem depender de fuso horário. */
export function formatarData(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/** Texto que chega no WhatsApp da empresa, organizado para leitura rápida. */
export function mensagemAgendamento(p: PedidoAgendamento): string {
  return [
    `Olá, ${MARCA.nome}! Quero agendar:`,
    ``,
    `*Serviço:* ${p.servicos.join(", ")}`,
    `*Veículo:* ${p.tipoVeiculo} · ${p.modelo}`,
    `*Dia:* ${formatarData(p.data)}`,
    `*Horário:* ${p.horario}`,
    `*Nome:* ${p.nome}`,
  ].join("\n");
}

/** Um dia fixo da semana dentro do plano mensal. */
export type DiaPlano = {
  dia: string; // "Segunda", "Terça"...
  horario: string;
  servico: string;
};

export type PedidoPlanoMensal = {
  tipoVeiculo: string;
  modelo: string;
  frequencia: string; // "Toda semana" | "A cada 15 dias"
  dias: DiaPlano[];
  inicio: string; // AAAA-MM-DD
  nome: string;
  observacao?: string | undefined;
};

/** Plano mensal: uma linha por dia escolhido, para a dona montar a agenda fixa. */
export function mensagemPlanoMensal(p: PedidoPlanoMensal): string {
  return [
    `Olá, ${MARCA.nome}! Quero montar um *plano mensal*:`,
    ``,
    `*Veículo:* ${p.tipoVeiculo} · ${p.modelo}`,
    `*Frequência:* ${p.frequencia}`,
    // Personalizado ("A cada 3 dias") não tem dia da semana: só horário e serviços.
    ...(p.dias.length === 1 && p.dias[0]?.dia === p.frequencia
      ? [`*Horário:* ${p.dias[0].horario}`, `*Serviços:* ${p.dias[0].servico}`]
      : [`*Dias:*`, ...p.dias.map((d) => `• ${d.dia}, ${d.horario} · ${d.servico}`)]),
    `*Começar em:* ${formatarData(p.inicio)}`,
    ...(p.observacao ? [`*Observação:* ${p.observacao}`] : []),
    `*Nome:* ${p.nome}`,
  ].join("\n");
}
