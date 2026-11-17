// Junta os dois sites da Detalhe Perfeito num deploy só.
//
// sites.json -> "principal": "antigo" ou "novo"
//   "antigo": o site atual (React) fica em /       e o site novo em /novo/
//   "novo":   o site novo fica em /                e o site atual em /antigo/
// O site novo também continua em /novo/ nos dois casos, para o link não quebrar.
//
// Para trocar: mude a palavra em sites.json e faça push. A Vercel roda este
// script (vercel.json -> buildCommand) e publica dist/client.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync } from "node:fs";

const { principal } = JSON.parse(readFileSync("sites.json", "utf8"));
if (!["antigo", "novo"].includes(principal)) throw new Error(`sites.json: "principal" precisa ser "antigo" ou "novo" (veio "${principal}")`);

const SAIDA = "dist/client";
const baseAntigo = principal === "antigo" ? "/" : "/antigo/";

// 1. site atual, sem nenhuma mudança no código: só muda o endereço base
const r = spawnSync("bun", ["run", "build"], { stdio: "inherit", env: { ...process.env, SITE_BASE: baseAntigo } });
if (r.status !== 0) process.exit(r.status ?? 1);

const copiarNovo = (destino) => cpSync("site-novo", destino, { recursive: true, filter: (f) => !f.endsWith("README.md") });

if (principal === "antigo") {
  copiarNovo(`${SAIDA}/novo`);
} else {
  // o build do site atual vira a pasta /antigo/ e o novo ocupa a raiz
  const temp = "dist/antigo-temp";
  rmSync(temp, { recursive: true, force: true });
  renameSync(SAIDA, temp);
  mkdirSync(SAIDA, { recursive: true });
  copiarNovo(SAIDA);
  copiarNovo(`${SAIDA}/novo`);
  renameSync(temp, `${SAIDA}/antigo`);
}
if (!existsSync(`${SAIDA}/index.html`)) throw new Error("build sem index.html na raiz");
console.log(`\nPronto: site ${principal} na raiz. Novo também em /novo/${principal === "novo" ? ", atual em /antigo/" : ""}.`);
