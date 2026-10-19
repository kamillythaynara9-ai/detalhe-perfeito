/**
 * BOTÃO FLUTUANTE DO WHATSAPP — "sempre à mão".
 * Fica no canto inferior direito (zona do polegar no celular) e pulsa
 * (pulso-whatsapp). Só aparece depois que a intro termina.
 */
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { MARCA } from "@/config/marca";
import { linkWhatsapp } from "@/lib/whatsapp";
import { atrasoAposIntro } from "@/lib/intro";

export function BotaoWhatsapp() {
  return (
    <motion.a
      href={linkWhatsapp(`Olá, ${MARCA.nome}! Vim pelo site.`)}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: atrasoAposIntro(0.7), type: "spring" }}
      className="animar-pulso fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
