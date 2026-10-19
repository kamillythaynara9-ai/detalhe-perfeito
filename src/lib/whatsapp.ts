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
