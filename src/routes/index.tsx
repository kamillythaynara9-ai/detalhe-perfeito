/**
 * PÁGINA INICIAL — monta o site na ordem da "conversa de venda":
 *   impacto (Topo) -> o que fazemos (Serviços) -> prova (Antes/Depois)
 *   -> escolha (Planos) -> ação (Agendar) -> confiança (Depoimentos, FAQ)
 *   -> última chamada + contato (Rodapé).
 * Cada seção é um componente em src/components/site/ — leia o comentário
 * no topo de cada um para entender o efeito e a interação.
 */
import { createFileRoute } from "@tanstack/react-router";
import { AntesDepois } from "@/components/site/AntesDepois";
import { Agendamento } from "@/components/site/Agendamento";
import { BotaoWhatsapp } from "@/components/site/BotaoWhatsapp";
import { Cabecalho } from "@/components/site/Cabecalho";
import { Depoimentos } from "@/components/site/Depoimentos";
import { FundoVivo } from "@/components/site/FundoVivo";
import { Intro } from "@/components/site/Intro";
import { Perguntas } from "@/components/site/Perguntas";
import { Planos } from "@/components/site/Planos";
import { Rodape } from "@/components/site/Rodape";
import { Servicos } from "@/components/site/Servicos";
import { Topo } from "@/components/site/Topo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Detalhe Perfeito · Estúdio Automotivo em São Paulo" },
      { name: "description", content: "Lavagem detalhada, higienização, polimento e plano mensal. Agende pelo WhatsApp em poucos toques." },
      { property: "og:title", content: "Detalhe Perfeito · Estúdio Automotivo" },
      { property: "og:description", content: "Seu carro com cara de zero de novo. Agende pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Intro />
      <FundoVivo />
      <Cabecalho />
      <main>
        <Topo />
        {/* Agendar logo após o topo, a pedido da cliente: ação primeiro. */}
        <Agendamento />
        <Servicos />
        <AntesDepois />
        <Planos />
        <Depoimentos />
        <Perguntas />
      </main>
      <Rodape />
      <BotaoWhatsapp />
    </>
  );
}
