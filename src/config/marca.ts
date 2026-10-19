/**
 * DADOS DA MARCA — fonte única de verdade.
 * --------------------------------------------------------------
 * POR QUE ESTE ARQUIVO EXISTE: telefone, serviços e horários aparecem
 * em várias seções. Se ficassem espalhados, uma mudança de número
 * exigiria caçar em 6 arquivos. Aqui, muda-se uma vez só.
 * Regra: nenhum componente escreve telefone, @ ou horário "na mão".
 */

export const MARCA = {
  nome: "Detalhe Perfeito",
  slogan: "Estúdio Automotivo",
  cidade: "São Paulo, SP",
  telefoneExibicao: "(15) 98801-3276",
  // WhatsApp exige o número só com dígitos, com DDI 55 e sem "+".
  whatsappDigitos: "5515988013276",
  instagram: "detalhe.perfeito",
} as const;

export type Servico = {
  id: string;
  nome: string;
  resumo: string;
  foto: string; // foto real (Unsplash/Pexels) — nunca ilustração
};

// Os serviços que a cliente pediu, nesta ordem.
export const SERVICOS: Servico[] = [
  {
    id: "lavagem-detalhada",
    nome: "Lavagem detalhada",
    resumo: "Cada friso, emblema e roda limpos à mão, com produtos que não agridem a pintura.",
    foto: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "higienizacao-interna",
    nome: "Higienização interna",
    resumo: "Painel, carpete, dutos e cintos sem ácaros, cheiro de novo e ar mais limpo.",
    foto: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "limpeza-estofado",
    nome: "Limpeza de estofado",
    resumo: "Bancos de tecido ou couro extraídos a fundo: manchas e odores vão embora.",
    foto: "https://images.pexels.com/photos/6872163/pexels-photo-6872163.jpeg?auto=compress&w=900",
  },
  {
    id: "polimento",
    nome: "Polimento",
    resumo: "Remove riscos finos e devolve aquele brilho espelhado de carro de vitrine.",
    foto: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "lavagem-convencional",
    nome: "Lavagem convencional",
    resumo: "Lavagem externa caprichada para o dia a dia: carro limpo, rápido e sem complicação.",
    foto: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=70",
  },
  {
    id: "plano-mensal",
    nome: "Plano mensal",
    resumo: "Seu carro sempre impecável, com visitas agendadas e preço fixo todo mês.",
    foto: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=70&sat=-30",
  },
];

// Horários definidos pela cliente.
export const HORARIOS = ["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"] as const;

export const TIPOS_VEICULO = ["Hatch", "Sedã", "SUV", "Picape", "Moto"] as const;
