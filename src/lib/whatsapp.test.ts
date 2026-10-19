import { describe, expect, it } from "vitest";
import { HORARIOS } from "@/config/marca";
import { linkWhatsapp, mensagemAgendamento, mensagemPlanoMensal } from "./whatsapp";

describe("agendamento via WhatsApp", () => {
  it("envia para o número (15) 98801-3276", () => {
    expect(linkWhatsapp("oi")).toBe("https://wa.me/5515988013276?text=oi");
  });

  it("oferece exatamente os horários 8h, 9h30, 11h, 13h30, 15h e 16h30", () => {
    expect([...HORARIOS]).toEqual(["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"]);
  });

  it("mensagem traz serviço, veículo, dia, hora e nome", () => {
    const msg = mensagemAgendamento({
      servicos: ["Polimento"],
      tipoVeiculo: "SUV",
      modelo: "Compass",
      data: "2026-10-21",
      horario: "09:30",
      nome: "Ana",
    });
    expect(msg).toContain("*Serviço:* Polimento");
    expect(msg).toContain("*Veículo:* SUV · Compass");
    expect(msg).toContain("*Dia:* 21/10/2026");
    expect(msg).toContain("*Horário:* 09:30");
    expect(msg).toContain("*Nome:* Ana");
  });

  it("plano mensal traz veículo, frequência, cada dia com horário e serviço, início e nome", () => {
    const msg = mensagemPlanoMensal({
      tipoVeiculo: "Sedã",
      modelo: "Corolla",
      frequencia: "Toda semana",
      dias: [
        { dia: "Terça", horario: "08:00", servico: "Lavagem convencional" },
        { dia: "Sexta", horario: "15:00", servico: "Higienização interna" },
      ],
      inicio: "2026-11-03",
      nome: "Ana",
    });
    expect(msg).toContain("*plano mensal*");
    expect(msg).toContain("*Veículo:* Sedã · Corolla");
    expect(msg).toContain("*Frequência:* Toda semana");
    expect(msg).toContain("• Terça, 08:00 · Lavagem convencional");
    expect(msg).toContain("• Sexta, 15:00 · Higienização interna");
    expect(msg).toContain("*Começar em:* 03/11/2026");
    expect(msg).not.toContain("Observação");
  });

  it("plano personalizado (a cada N dias) traz horário e serviços sem dia da semana", () => {
    const msg = mensagemPlanoMensal({
      tipoVeiculo: "SUV",
      modelo: "Compass",
      frequencia: "A cada 3 dias",
      dias: [{ dia: "A cada 3 dias", horario: "09:30", servico: "Lavagem detalhada, Polimento" }],
      inicio: "2026-11-03",
      nome: "Rui",
    });
    expect(msg).toContain("*Frequência:* A cada 3 dias");
    expect(msg).toContain("*Horário:* 09:30");
    expect(msg).toContain("*Serviços:* Lavagem detalhada, Polimento");
    expect(msg).not.toContain("*Dias:*");
  });
});
