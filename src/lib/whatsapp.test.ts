import { describe, expect, it } from "vitest";
import { HORARIOS } from "@/config/marca";
import { linkWhatsapp, mensagemAgendamento } from "./whatsapp";

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
});
