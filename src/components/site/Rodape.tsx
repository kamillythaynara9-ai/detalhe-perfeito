/**
 * CHAMADA FINAL + RODAPÉ (contato).
 * EFEITO: frase enorme prata com brilho varrendo, botão do WhatsApp
 * pulsando. O rodapé não tem linha em cima: ele "nasce" do degradê.
 * Todos os dados vêm de config/marca.ts.
 */
import { Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { MARCA } from "@/config/marca";
import { linkWhatsapp } from "@/lib/whatsapp";
import logo from "@/assets/logo-detalhe-perfeito.jpg";
import { Revelar } from "./Revelar";

export function Rodape() {
  return (
    <footer id="contato" className="relative pb-28 pt-24">
      <div className="mx-auto max-w-6xl px-5">
        <Revelar className="text-center">
          <h2 className="texto-prata animar-brilho mx-auto inline-block text-3xl font-black uppercase leading-tight sm:text-6xl">
            Pronto para ver<br />seu carro brilhar?
          </h2>
          <div className="mt-10">
            <a href={linkWhatsapp(`Olá, ${MARCA.nome}! Quero agendar um horário.`)} target="_blank" rel="noopener"
              className="corte-hexagono bg-gradiente-neon animar-pulso inline-flex items-center gap-3 px-9 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground">
              <MessageCircle className="h-5 w-5" /> Chamar no WhatsApp
            </a>
          </div>
        </Revelar>

        <div className="mt-24 flex flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <img src={logo} alt="Detalhe Perfeito" className="w-40" loading="lazy" />
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center justify-center gap-2 sm:justify-start"><MapPin className="h-4 w-4 text-neon" />{MARCA.cidade}</li>
            <li><a href={linkWhatsapp("Olá!")} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 hover:text-neon sm:justify-start"><Phone className="h-4 w-4 text-neon" />{MARCA.telefoneExibicao}</a></li>
            <li><a href={`https://instagram.com/${MARCA.instagram}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 hover:text-neon sm:justify-start"><Instagram className="h-4 w-4 text-neon" />@{MARCA.instagram}</a></li>
          </ul>
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {MARCA.nome} · {MARCA.slogan}</p>
      </div>
    </footer>
  );
}
