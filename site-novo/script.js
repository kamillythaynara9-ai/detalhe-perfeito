/* ==========================================================================
   Detalhe Perfeito · site novo (DERS)
   Tudo o que muda (contato, serviços, horários, planos, perguntas) fica nos
   objetos abaixo. Troque aqui e o site inteiro se atualiza.
   ========================================================================== */

const MARCA = {
  nome: "Detalhe Perfeito",
  slogan: "Estúdio Automotivo",
  cidade: "São Paulo, SP",
  telefoneExibicao: "(15) 98801-3276",
  whatsappDigitos: "5515988013276", // só dígitos, com 55
  instagram: "detalhe.perfeito",
};

// Serviços que a cliente pediu, nesta ordem. Fotos reais (Pexels).
const SERVICOS = [
  { id: "lavagem-detalhada", nome: "Lavagem detalhada", resumo: "Cada friso, emblema e roda limpos à mão, com produtos que não agridem a pintura.", foto: "servico-lavagem-detalhada.jpg", alt: "Carro coberto de espuma durante a lavagem no estúdio" },
  { id: "higienizacao-interna", nome: "Higienização interna", resumo: "Painel, carpete, dutos e cintos sem ácaros, cheiro de novo e ar mais limpo.", foto: "servico-higienizacao.jpg", alt: "Volante e painel sendo limpos com pano de microfibra" },
  { id: "limpeza-estofado", nome: "Limpeza de estofado", resumo: "Bancos de tecido ou couro extraídos a fundo: manchas e odores vão embora.", foto: "servico-estofado.jpg", alt: "Extratora limpando o banco de tecido do carro" },
  { id: "polimento", nome: "Polimento", resumo: "Remove riscos finos e devolve aquele brilho espelhado de carro de vitrine.", foto: "servico-polimento.jpg", alt: "Politriz trabalhando na lataria" },
  { id: "lavagem-convencional", nome: "Lavagem convencional", resumo: "Lavagem externa caprichada para o dia a dia: carro limpo, rápido e sem complicação.", foto: "servico-lavagem-convencional.jpg", alt: "Carro sendo lavado com espuma num box fechado" },
  { id: "plano-mensal", nome: "Plano mensal", resumo: "Seu carro sempre impecável, com visitas agendadas e preço fixo todo mês.", foto: "servico-plano-mensal.jpg", alt: "Produtos de detalhamento e panos de microfibra prontos para o serviço" },
];
const ID_PLANO_MENSAL = "plano-mensal";

// Horários definidos pela cliente.
const HORARIOS = ["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"];
const TIPOS_VEICULO = ["Hatch", "Sedã", "SUV", "Picape", "Moto"];
// Dias de atendimento (domingo fechado).
const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const FREQUENCIAS_PLANO = ["Toda semana", "A cada 15 dias", "Personalizado"];

const PLANOS = {
  unica: {
    titulo: "Lavagem única",
    texto: "Para aquela ocasião especial, a venda do carro ou só o prazer de ver ele brilhando de novo.",
    itens: ["Escolha um ou mais serviços", "Agendamento no horário que você quiser", "Resultado garantido no mesmo dia"],
    mensagem: "Olá! Quero saber mais sobre uma lavagem única.",
  },
  mensal: {
    titulo: "Plano mensal",
    texto: "Seu carro impecável o mês inteiro, sem precisar lembrar de agendar. Preço fixo e prioridade na agenda.",
    itens: ["Visitas programadas no mês", "Prioridade nos melhores horários", "Valor mais vantajoso por lavagem"],
    mensagem: "Olá! Quero conhecer o plano mensal.",
  },
};

// Respostas de exemplo: confirmar com a cliente.
const FAQ = [
  { p: "Quanto tempo leva o serviço?", r: "Depende do serviço: uma lavagem detalhada leva em média 2 horas; polimento e higienização podem levar o dia. Avisamos certinho no agendamento." },
  { p: "Preciso deixar o carro no estúdio?", r: "Sim, trabalhamos no nosso estúdio para garantir iluminação e produtos ideais. Combine o melhor horário pelo WhatsApp." },
  { p: "Os produtos danificam a pintura?", r: "Não. Usamos produtos de pH neutro e técnicas que protegem verniz, plásticos e couro." },
  { p: "Como funciona o plano mensal?", r: "Você escolhe a frequência, garante prioridade na agenda e paga um valor fixo por mês. Sai mais em conta que lavagens avulsas." },
];

/* ---------- utilidades ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const linkWhatsapp = (msg) => `https://wa.me/${MARCA.whatsappDigitos}?text=${encodeURIComponent(msg)}`;
const formatarData = (iso) => { const [a, m, d] = iso.split("-"); return `${d}/${m}/${a}`; };
const hojeISO = () => { const d = new Date(); return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10); };
const ehDomingo = (iso) => (iso ? new Date(`${iso}T12:00:00`).getDay() === 0 : false);
const horaCurta = (h) => h.replace(":00", "h").replace(":", "h");
const lerSessao = (k) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const gravarSessao = (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* navegação privada */ } };

/* ---------- links de WhatsApp e Instagram ---------- */
$$("[data-whats]").forEach((a) => { a.href = linkWhatsapp(a.dataset.whats); a.target = "_blank"; a.rel = "noopener"; });
$$("[data-insta]").forEach((a) => { a.href = `https://instagram.com/${MARCA.instagram}`; a.target = "_blank"; a.rel = "noopener"; });
$("#ano").textContent = `© ${new Date().getFullYear()}`;

/* ==========================================================================
   INTRO: só na primeira visita da sessão; um toque pula; nunca trava.
   ========================================================================== */
const intro = $("#intro");
function entrar() {
  document.body.classList.add("entrou");
  document.documentElement.classList.remove("intro-ativa");
  setTimeout(demoLavar, reduzir ? 0 : 900);
}
if (intro && !intro.hidden) {
  let saiu = false;
  const sair = () => {
    if (saiu) return;
    saiu = true;
    intro.classList.add("sai");
    entrar();
    setTimeout(() => intro.remove(), 600);
  };
  gravarSessao("dp-intro", "1");
  intro.addEventListener("pointerdown", sair);
  setTimeout(sair, 2300);
} else {
  intro?.remove();
  entrar();
}

/* ---------- título do topo: palavra por palavra ---------- */
(() => {
  const h1 = $(".titulo-topo");
  let i = 0;
  const quebrar = (no) => {
    [...no.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.append(p); return; }
          const s = document.createElement("span");
          s.className = "palavra"; s.style.setProperty("--i", i++); s.textContent = p;
          frag.append(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {
        n.classList.add("palavra"); n.style.setProperty("--i", i++);
      }
    });
  };
  quebrar(h1);
})();

/* ==========================================================================
   CABEÇALHO e MENU
   ========================================================================== */
const cabecalho = $("#cabecalho");
const menu = $("#menu");
const menuBotao = $("#menu-botao");
const aoRolar = () => cabecalho.classList.toggle("rolou", window.scrollY > 24);
window.addEventListener("scroll", aoRolar, { passive: true });
aoRolar();
const fecharMenu = () => { menu.classList.remove("aberto"); menuBotao.setAttribute("aria-expanded", "false"); menuBotao.setAttribute("aria-label", "Abrir menu"); };
menuBotao.addEventListener("click", () => {
  const abrir = !menu.classList.contains("aberto");
  menu.classList.toggle("aberto", abrir);
  menuBotao.setAttribute("aria-expanded", String(abrir));
  menuBotao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
});
$$("a", menu).forEach((a) => a.addEventListener("click", fecharMenu));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });

/* ==========================================================================
   TOPO: LAVE VOCÊ MESMO
   A foto do carro sujo é desenhada num canvas por cima da foto do carro
   limpo. Onde o dedo ou o mouse passa, a sujeira some. Passou de 55%,
   o resto escorre sozinho e um reflexo corre pela lataria.
   ========================================================================== */
const topo = $("#topo");
const canvas = $("#lavar");
const ctx = canvas.getContext("2d");
const imgSuja = new Image();
imgSuja.src = "carro-sujo.jpg";
const medidor = $("#medidor i");
const dicaTexto = $("#dica-texto");
const botaoSujar = $("#sujar");
const LIMITE = 0.55;
let largura = 0, altura = 0, dpr = 1, pincel = 60, terminou = false, ultimo = null, agendado = false;

function desenharSujo() {
  if (!imgSuja.complete || !imgSuja.naturalWidth) return;
  const r = topo.getBoundingClientRect();
  largura = r.width; altura = r.height;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(largura * dpr);
  canvas.height = Math.round(altura * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // mesmo enquadramento do object-fit: cover; object-position: 50% 45% da foto limpa
  const esc = Math.max(largura / imgSuja.naturalWidth, altura / imgSuja.naturalHeight);
  const w = imgSuja.naturalWidth * esc, h = imgSuja.naturalHeight * esc;
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(imgSuja, (largura - w) * 0.5, (altura - h) * 0.45, w, h);
  pincel = Math.max(38, Math.min(largura, altura) * 0.085);
  terminou = false;
  topo.classList.remove("limpo");
  canvas.style.transition = "none";
  canvas.style.opacity = "1";
  medidor.style.width = "0%";
  dicaTexto.textContent = matchMedia("(hover: hover)").matches ? "Passe o mouse no carro para lavar" : "Arraste o dedo para o lado e lave o carro";
  botaoSujar.hidden = true;
}

function esfregar(x, y) {
  ctx.globalCompositeOperation = "destination-out";
  const g = ctx.createRadialGradient(x, y, 0, x, y, pincel);
  g.addColorStop(0, "rgba(0,0,0,1)");
  g.addColorStop(0.55, "rgba(0,0,0,.85)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, pincel, 0, Math.PI * 2);
  ctx.fill();
}
function traco(x, y) {
  if (terminou) return;
  if (ultimo) {
    const dx = x - ultimo.x, dy = y - ultimo.y;
    const passos = Math.max(1, Math.ceil(Math.hypot(dx, dy) / (pincel * 0.3)));
    for (let i = 1; i <= passos; i++) esfregar(ultimo.x + (dx * i) / passos, ultimo.y + (dy * i) / passos);
  } else esfregar(x, y);
  ultimo = { x, y };
  if (!agendado) { agendado = true; setTimeout(medir, 250); }
}
// mede quanto já foi limpo olhando uma grade pequena de pixels
function medir() {
  agendado = false;
  if (terminou) return;
  const dados = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const passo = 24, cols = Math.floor(canvas.width / passo), lins = Math.floor(canvas.height / passo);
  let limpos = 0, total = 0;
  for (let j = 0; j < lins; j++) for (let i = 0; i < cols; i++) {
    total++;
    if (dados[((j * passo) * canvas.width + i * passo) * 4 + 3] < 60) limpos++;
  }
  const p = total ? limpos / total : 0;
  medidor.style.width = `${Math.min(100, Math.round((p / LIMITE) * 100))}%`;
  if (p >= LIMITE) concluir();
  else if (p > 0.04) dicaTexto.textContent = "Isso! Continue lavando";
}
function concluir() {
  terminou = true;
  medidor.style.width = "100%";
  canvas.style.transition = "opacity 1s ease";
  canvas.style.opacity = "0";
  topo.classList.add("limpo");
  dicaTexto.textContent = "Pronto. É assim que ele sai daqui.";
  botaoSujar.hidden = false;
}
const ponto = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
canvas.addEventListener("pointermove", (e) => {
  // mouse lava só de passar; no toque, enquanto o dedo arrasta
  if (e.pointerType === "mouse" || e.buttons || e.pressure > 0) { const p = ponto(e); traco(p.x, p.y); }
});
canvas.addEventListener("pointerdown", (e) => { ultimo = null; const p = ponto(e); traco(p.x, p.y); });
canvas.addEventListener("pointerleave", () => { ultimo = null; });
canvas.addEventListener("pointerup", () => { ultimo = null; });
canvas.addEventListener("pointercancel", () => { ultimo = null; });
botaoSujar.addEventListener("click", desenharSujo);

// demonstração: um rodo passa sozinho uma vez, para mostrar que dá para lavar
function demoLavar() {
  if (reduzir || terminou || !largura) return;
  // passa por cima do carro (no computador ele fica à direita do título)
  const largo = largura > 760;
  const x0 = largo ? 0.42 : 0.2, x1 = largo ? 0.9 : 0.85;
  const y0 = altura * (largo ? 0.42 : 0.4), ini = performance.now(), dur = 1200;
  ultimo = null;
  const quadro = (t) => {
    const k = Math.min(1, (t - ini) / dur);
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    traco(largura * (x0 + (x1 - x0) * e), y0 + Math.sin(e * Math.PI * 2) * altura * 0.04);
    if (k < 1) requestAnimationFrame(quadro); else ultimo = null;
  };
  requestAnimationFrame(quadro);
}

if (imgSuja.complete) desenharSujo(); else imgSuja.addEventListener("load", desenharSujo);
let larguraAnterior = window.innerWidth;
window.addEventListener("resize", () => {
  // no celular a barra do navegador muda a altura ao rolar: só redesenha se a largura mudar
  if (window.innerWidth !== larguraAnterior) { larguraAnterior = window.innerWidth; desenharSujo(); }
});

/* ==========================================================================
   AGENDAMENTO: avulso (4 passos) ou plano mensal (5 passos)
   Tudo vira uma mensagem pronta no WhatsApp. Nada é salvo no site.
   ========================================================================== */
const PASSOS_AVULSO = ["Serviço", "Veículo", "Data e hora", "Confirmar"];
const PASSOS_MENSAL = ["Serviço", "Veículo", "Dias", "Horário e serviço", "Confirmar"];
const PLANO = SERVICOS.find((s) => s.id === ID_PLANO_MENSAL);
const SERVICOS_DO_PLANO = SERVICOS.filter((s) => s.id !== ID_PLANO_MENSAL);
const CHAVE_PERSONALIZADO = "personalizado";

const est = { passo: 0, servicos: [], tipo: "", modelo: "", nome: "", data: "", horario: "", frequencia: FREQUENCIAS_PLANO[0], dias: {}, intervalo: "", inicio: "", observacao: "" };

const ehMensal = () => est.servicos.includes(PLANO.nome);
const passos = () => (ehMensal() ? PASSOS_MENSAL : PASSOS_AVULSO);
const personalizado = () => est.frequencia === "Personalizado";
const umDiaSo = () => est.frequencia === "A cada 15 dias";
const nIntervalo = () => Number(est.intervalo);
const intervaloOk = () => Number.isInteger(nIntervalo()) && nIntervalo() >= 1 && nIntervalo() <= 30;
const rotuloIntervalo = () => `A cada ${nIntervalo()} ${nIntervalo() === 1 ? "dia" : "dias"}`;
const diasEscolhidos = () => (personalizado() ? [CHAVE_PERSONALIZADO] : DIAS_SEMANA.filter((d) => d in est.dias));
const nomeDia = (d) => (d === CHAVE_PERSONALIZADO ? rotuloIntervalo() : d);
const cfg = (d) => est.dias[d] || { horario: "", servicos: [] };

function passoCompleto() {
  const veiculoOk = !!est.tipo && est.modelo.trim().length >= 2;
  const nomeOk = est.nome.trim().length >= 2;
  if (!ehMensal()) return [est.servicos.length > 0, veiculoOk, !!est.data && !ehDomingo(est.data) && !!est.horario, nomeOk][est.passo];
  return [
    true,
    veiculoOk,
    personalizado() ? intervaloOk() : diasEscolhidos().length > 0,
    diasEscolhidos().every((d) => cfg(d).horario && cfg(d).servicos.length > 0),
    !!est.inicio && !ehDomingo(est.inicio) && nomeOk,
  ][est.passo];
}

const opcao = (acao, valor, ativo, pequena = false) =>
  `<button type="button" class="opcao${pequena ? " opcao-pequena" : ""}" data-acao="${acao}" data-valor="${esc(valor)}" aria-pressed="${ativo}">${esc(acao.includes("hora") ? horaCurta(valor) : valor)}</button>`;

function telaHTML() {
  const p = est.passo, m = ehMensal();
  if (p === 0) return `
    <h3 class="pergunta">Qual serviço?</h3>
    <div class="opcoes">${SERVICOS.map((s) => opcao("servico", s.nome, est.servicos.includes(s.nome))).join("")}</div>
    <p class="ajuda">${m ? "No plano mensal você monta sua agenda fixa: dias, horários e o serviço de cada dia." : "Pode escolher mais de um."}</p>`;
  if (p === 1) return `
    <h3 class="pergunta">Qual o seu veículo?</h3>
    <div class="opcoes">${TIPOS_VEICULO.map((t) => opcao("tipo", t, est.tipo === t)).join("")}</div>
    <label class="campo-rotulo" for="modelo">Modelo</label>
    <input class="campo" id="modelo" data-campo="modelo" maxlength="60" autocomplete="off" placeholder="Ex.: Onix 2022, Compass, CB 500" value="${esc(est.modelo)}" />`;
  if (!m && p === 2) return `
    <h3 class="pergunta">Quando?</h3>
    <input class="campo" type="date" id="data" data-campo="data" min="${hojeISO()}" value="${esc(est.data)}" aria-label="Dia" />
    <p class="erro" id="erro-data" ${ehDomingo(est.data) ? "" : "hidden"}>Aos domingos não atendemos. Escolha outro dia.</p>
    <div class="opcoes-horas">${HORARIOS.map((h) => opcao("hora", h, est.horario === h)).join("")}</div>`;
  if (!m && p === 3) return `
    <h3 class="pergunta">Como podemos te chamar?</h3>
    <input class="campo" id="nome" data-campo="nome" maxlength="80" autocomplete="given-name" placeholder="Seu nome" value="${esc(est.nome)}" />
    <p class="ajuda">Confira a sua ficha e toque em enviar. O WhatsApp abre com tudo escrito.</p>`;
  if (m && p === 2) {
    const topoFreq = `<h3 class="pergunta">Com que frequência?</h3>
      <div class="opcoes">${FREQUENCIAS_PLANO.map((f) => opcao("frequencia", f, est.frequencia === f)).join("")}</div>`;
    if (personalizado()) return `${topoFreq}
      <label class="pergunta pergunta-menor" for="intervalo" style="display:block">De quantos em quantos dias?</label>
      <div class="intervalo"><span>A cada</span><input class="campo" id="intervalo" data-campo="intervalo" type="number" inputmode="numeric" min="1" max="30" placeholder="3" value="${esc(est.intervalo)}" /><span>dias</span></div>
      <p class="erro" id="erro-intervalo" ${est.intervalo && !intervaloOk() ? "" : "hidden"}>Digite um número de 1 a 30.</p>`;
    return `${topoFreq}
      <h3 class="pergunta pergunta-menor">${umDiaSo() ? "Em qual dia?" : "Em quais dias?"}</h3>
      <div class="opcoes">${DIAS_SEMANA.map((d) => opcao("dia", d, d in est.dias)).join("")}</div>
      <p class="ajuda">${umDiaSo() ? "Um dia da semana, a cada 15 dias." : "Pode escolher mais de um."} Não atendemos aos domingos.</p>`;
  }
  if (m && p === 3) return `
    <h3 class="pergunta">${personalizado() ? "Horário e serviço" : "Horário e serviço de cada dia"}</h3>
    ${diasEscolhidos().map((d) => `
      <div class="dia-bloco">
        <p class="dia-nome">${esc(nomeDia(d))}</p>
        <div class="opcoes-horas seis">${HORARIOS.map((h) => opcao(`hora-dia|${d}`, h, cfg(d).horario === h, true)).join("")}</div>
        <p class="ajuda" style="margin:0 0 8px">Serviços deste dia (pode marcar mais de um)</p>
        <div class="opcoes" role="group" aria-label="Serviços de ${esc(nomeDia(d))}">${SERVICOS_DO_PLANO.map((s) => opcao(`servico-dia|${d}`, s.nome, cfg(d).servicos.includes(s.nome), true)).join("")}</div>
      </div>`).join("")}`;
  if (m && p === 4) return `
    <h3 class="pergunta">Quando começamos?</h3>
    <input class="campo" type="date" id="inicio" data-campo="inicio" min="${hojeISO()}" value="${esc(est.inicio)}" aria-label="Data de início" />
    <p class="erro" id="erro-inicio" ${ehDomingo(est.inicio) ? "" : "hidden"}>Aos domingos não atendemos. Escolha outro dia.</p>
    <label class="campo-rotulo" for="nome">Seu nome</label>
    <input class="campo" id="nome" data-campo="nome" maxlength="80" autocomplete="given-name" placeholder="Seu nome" value="${esc(est.nome)}" />
    <label class="campo-rotulo" for="observacao">Alguma observação? (opcional)</label>
    <textarea class="campo" id="observacao" data-campo="observacao" maxlength="200" rows="2">${esc(est.observacao)}</textarea>`;
  return "";
}

function fichaLinhas() {
  const veic = est.tipo || est.modelo.trim() ? [est.tipo, est.modelo.trim()].filter(Boolean).join(" · ") : "";
  if (!ehMensal()) return [
    ["Serviço", est.servicos.join(", ")],
    ["Veículo", veic],
    ["Dia", est.data && !ehDomingo(est.data) ? formatarData(est.data) : ""],
    ["Horário", est.horario ? horaCurta(est.horario) : ""],
    ["Nome", est.nome.trim()],
  ];
  return [
    ["Serviço", PLANO.nome],
    ["Veículo", veic],
    ["Frequência", personalizado() ? (intervaloOk() ? rotuloIntervalo() : "") : est.frequencia],
    ...diasEscolhidos().map((d) => [personalizado() ? "Horário" : d, [cfg(d).horario && horaCurta(cfg(d).horario), cfg(d).servicos.join(", ")].filter(Boolean).join(" · ")]),
    ["Início", est.inicio && !ehDomingo(est.inicio) ? formatarData(est.inicio) : ""],
    ["Nome", est.nome.trim()],
  ];
}

const tela = $("#agenda-tela");
const botaoAvancar = $("#avancar");
const botaoVoltar = $("#voltar");
let fichaAnterior = {};
function atualizarControles() {
  const lista = passos();
  const ultimoPasso = est.passo === lista.length - 1;
  $("#passo-n").textContent = `Passo ${est.passo + 1} de ${lista.length}`;
  $("#passo-nome").textContent = lista[est.passo];
  $("#trilho").style.width = `${((est.passo + 1) / lista.length) * 100}%`;
  botaoVoltar.disabled = est.passo === 0;
  botaoAvancar.textContent = ultimoPasso ? "Enviar no WhatsApp" : "Continuar";
  botaoAvancar.disabled = !passoCompleto();
  // só a linha que mudou acende (as outras ficam paradas enquanto a pessoa digita)
  const linhas = fichaLinhas();
  $("#ficha").innerHTML = linhas.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd class="${v ? "" : "vazio"}${v && fichaAnterior[k] !== v ? " novo" : ""}">${v ? esc(v) : "a escolher"}</dd></div>`).join("");
  fichaAnterior = Object.fromEntries(linhas);
}
function renderAgenda(animar = true) {
  tela.innerHTML = telaHTML();
  if (animar && !reduzir) { tela.classList.remove("entra"); void tela.offsetWidth; tela.classList.add("entra"); }
  atualizarControles();
}

// Plano mensal é exclusivo: escolher ele limpa os avulsos e vice-versa.
function alternarServico(n) {
  const s = est.servicos;
  if (n === PLANO.nome) est.servicos = s.includes(n) ? [] : [n];
  else { const sem = s.filter((x) => x !== PLANO.nome); est.servicos = sem.includes(n) ? sem.filter((x) => x !== n) : [...sem, n]; }
}
function alternarDia(d) {
  if (d in est.dias) { delete est.dias[d]; return; }
  est.dias = umDiaSo() ? { [d]: est.dias[d] || { horario: "", servicos: [] } } : { ...est.dias, [d]: { horario: "", servicos: [] } };
}
function escolherFrequencia(f) {
  est.frequencia = f;
  // "A cada 15 dias" aceita um dia só: fica o primeiro marcado
  if (f === "A cada 15 dias") { const primeiro = DIAS_SEMANA.find((d) => d in est.dias); est.dias = primeiro ? { [primeiro]: est.dias[primeiro] } : {}; }
}

tela.addEventListener("click", (e) => {
  const b = e.target.closest("[data-acao]");
  if (!b) return;
  const [acao, dia] = b.dataset.acao.split("|");
  const v = b.dataset.valor;
  const eraMensal = ehMensal();
  if (acao === "servico") alternarServico(v);
  else if (acao === "tipo") est.tipo = v;
  else if (acao === "hora") est.horario = v;
  else if (acao === "frequencia") escolherFrequencia(v);
  else if (acao === "dia") alternarDia(v);
  else if (acao === "hora-dia") est.dias[dia] = { ...cfg(dia), horario: v };
  else if (acao === "servico-dia") { const at = cfg(dia).servicos; est.dias[dia] = { ...cfg(dia), servicos: at.includes(v) ? at.filter((x) => x !== v) : [...at, v] }; }
  // re-renderiza sem animar (só troca o estado dos botões)
  const foco = b.dataset.acao + v;
  renderAgenda(false);
  $$("[data-acao]", tela).find((x) => x.dataset.acao + x.dataset.valor === foco)?.focus({ preventScroll: true });
  if (eraMensal !== ehMensal()) atualizarControles();
});
tela.addEventListener("input", (e) => {
  const c = e.target.dataset.campo;
  if (!c) return;
  est[c] = e.target.value;
  if (c === "data") $("#erro-data").hidden = !ehDomingo(est.data);
  if (c === "inicio") $("#erro-inicio").hidden = !ehDomingo(est.inicio);
  if (c === "intervalo") $("#erro-intervalo").hidden = !(est.intervalo && !intervaloOk());
  atualizarControles();
});
tela.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.matches("input") && passoCompleto()) { e.preventDefault(); botaoAvancar.click(); }
});
const irParaTela = () => {
  const alvo = $(".agenda-passos").getBoundingClientRect().top;
  if (alvo < 70 || alvo > window.innerHeight * 0.6) window.scrollBy({ top: alvo - 96, behavior: reduzir ? "auto" : "smooth" });
};
botaoVoltar.addEventListener("click", () => { if (est.passo > 0) { est.passo--; renderAgenda(); irParaTela(); } });
botaoAvancar.addEventListener("click", () => {
  if (!passoCompleto()) return;
  if (est.passo < passos().length - 1) { est.passo++; renderAgenda(); irParaTela(); $("input, button.opcao", tela)?.focus({ preventScroll: true }); return; }
  enviarAgendamento();
});

function enviarAgendamento() {
  let msg;
  if (ehMensal()) {
    const ds = diasEscolhidos().map((d) => ({ dia: nomeDia(d), horario: cfg(d).horario, servico: cfg(d).servicos.join(", ") }));
    const freq = personalizado() ? rotuloIntervalo() : est.frequencia;
    msg = [
      `Olá, ${MARCA.nome}! Quero montar um *plano mensal*:`, ``,
      `*Veículo:* ${est.tipo} · ${est.modelo.trim()}`,
      `*Frequência:* ${freq}`,
      ...(personalizado()
        ? [`*Horário:* ${ds[0].horario}`, `*Serviços:* ${ds[0].servico}`]
        : [`*Dias:*`, ...ds.map((d) => `• ${d.dia}, ${d.horario} · ${d.servico}`)]),
      `*Começar em:* ${formatarData(est.inicio)}`,
      ...(est.observacao.trim() ? [`*Observação:* ${est.observacao.trim()}`] : []),
      `*Nome:* ${est.nome.trim()}`,
    ].join("\n");
  } else {
    msg = [
      `Olá, ${MARCA.nome}! Quero agendar:`, ``,
      `*Serviço:* ${est.servicos.join(", ")}`,
      `*Veículo:* ${est.tipo} · ${est.modelo.trim()}`,
      `*Dia:* ${formatarData(est.data)}`,
      `*Horário:* ${est.horario}`,
      `*Nome:* ${est.nome.trim()}`,
    ].join("\n");
  }
  window.open(linkWhatsapp(msg), "_blank", "noopener");
}

// atalho: "Agendar este serviço" e botões dos planos já chegam com o serviço marcado
function agendarCom(nomeServico) {
  est.servicos = nomeServico ? [nomeServico] : [];
  est.passo = nomeServico ? 1 : 0;
  renderAgenda();
  document.getElementById("agendar").scrollIntoView({ behavior: reduzir ? "auto" : "smooth" });
}
renderAgenda(false);

/* ==========================================================================
   SERVIÇOS: painéis empilhados
   ========================================================================== */
$("#pilha").innerHTML = SERVICOS.map((s, i) => `
  <li class="cartao-servico" style="--i:${i}">
    <div class="servico-foto"><img src="${s.foto}" alt="${esc(s.alt)}" loading="lazy" width="1200" height="800" /></div>
    <div class="servico-corpo">
      <span class="servico-n">${String(i + 1).padStart(2, "0")} / ${String(SERVICOS.length).padStart(2, "0")}</span>
      <h3 class="servico-nome">${esc(s.nome)}</h3>
      <p class="servico-resumo">${esc(s.resumo)}</p>
      <button type="button" class="botao botao-verde" data-agendar="${esc(s.nome)}">${s.id === ID_PLANO_MENSAL ? "Montar meu plano" : "Agendar este"}</button>
    </div>
  </li>`).join("");
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-agendar]");
  if (b) agendarCom(b.dataset.agendar);
});
// o painel de baixo encolhe um pouco quando o próximo cobre ele
const cartoes = $$(".cartao-servico");
function empilhar() {
  if (reduzir) return;
  cartoes.forEach((c, i) => {
    const prox = cartoes[i + 1];
    if (!prox) return;
    const topoC = c.getBoundingClientRect().top;
    const topoP = prox.getBoundingClientRect().top;
    const cobre = Math.max(0, Math.min(1, 1 - (topoP - topoC) / (c.offsetHeight || 1)));
    c.style.transform = `scale(${1 - cobre * 0.05})`;
    c.style.filter = `brightness(${1 - cobre * 0.25})`;
  });
}

/* ==========================================================================
   ACABAMENTO: o vídeo cresce ao entrar na tela e toca com o reflexo
   ========================================================================== */
const vitrine = $("#vitrine");
const video = $("#video");
const videoReflexo = $("#video-reflexo");
function crescerVitrine() {
  if (reduzir) { vitrine.style.setProperty("--escala", 1); return; }
  const r = vitrine.getBoundingClientRect();
  const k = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight * 0.9)));
  vitrine.style.setProperty("--escala", (0.82 + k * 0.18).toFixed(3));
}
const tocar = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
new IntersectionObserver(([en]) => {
  if (en.isIntersecting) {
    [video, videoReflexo].forEach((v) => { if (v.preload === "none") { v.preload = "auto"; v.load(); } });
    if (!reduzir) { tocar(video); tocar(videoReflexo); }
  } else { video.pause(); videoReflexo.pause(); }
}, { threshold: 0.2 }).observe(vitrine);
video.addEventListener("timeupdate", () => { if (Math.abs(videoReflexo.currentTime - video.currentTime) > 0.25) videoReflexo.currentTime = video.currentTime; });

let rolando = false;
window.addEventListener("scroll", () => {
  if (rolando) return;
  rolando = true;
  requestAnimationFrame(() => { empilhar(); crescerVitrine(); rolando = false; });
}, { passive: true });
crescerVitrine();

/* ==========================================================================
   PLANOS: interruptor uma vez / todo mês
   ========================================================================== */
const interruptor = $(".interruptor");
function mostrarPlano(chave) {
  const o = PLANOS[chave];
  interruptor.dataset.ativo = chave;
  $$("[data-plano]", interruptor).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.plano === chave)));
  const painel = $("#plano");
  painel.innerHTML = `
    <h3><span class="reflexo">${esc(o.titulo)}</span></h3>
    <p>${esc(o.texto)}</p>
    <ul>${o.itens.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <div class="plano-acoes">
      <button type="button" class="botao botao-verde" data-agendar-plano="${chave}">${chave === "mensal" ? "Montar meu plano" : "Agendar"}</button>
      <a class="link-claro" href="${linkWhatsapp(o.mensagem)}" target="_blank" rel="noopener">Tirar dúvidas no WhatsApp</a>
    </div>`;
  if (!reduzir) { painel.style.animation = "none"; void painel.offsetWidth; painel.style.animation = ""; }
}
interruptor.addEventListener("click", (e) => { const b = e.target.closest("[data-plano]"); if (b) mostrarPlano(b.dataset.plano); });
$("#plano").addEventListener("click", (e) => {
  const b = e.target.closest("[data-agendar-plano]");
  if (b) agendarCom(b.dataset.agendarPlano === "mensal" ? PLANO.nome : "");
});
mostrarPlano("mensal");

/* ==========================================================================
   DÚVIDAS
   ========================================================================== */
const faq = $("#faq");
faq.innerHTML = FAQ.map((f, i) => `
  <div class="faq-item${i === 0 ? " aberto" : ""}">
    <button type="button" class="faq-pergunta" aria-expanded="${i === 0}" aria-controls="faq-${i}"><span>${esc(f.p)}</span><span class="faq-mais" aria-hidden="true"></span></button>
    <div class="faq-resposta" id="faq-${i}"><p>${esc(f.r)}</p></div>
  </div>`).join("");
faq.addEventListener("click", (e) => {
  const b = e.target.closest(".faq-pergunta");
  if (!b) return;
  const item = b.parentElement;
  const abrir = !item.classList.contains("aberto");
  $$(".faq-item", faq).forEach((it) => { it.classList.remove("aberto"); $(".faq-pergunta", it).setAttribute("aria-expanded", "false"); });
  if (abrir) { item.classList.add("aberto"); b.setAttribute("aria-expanded", "true"); }
});

/* ==========================================================================
   CONTATO
   ========================================================================== */
const icone = {
  local: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>',
  fone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>',
  insta: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
};
$("#contato-lista").innerHTML = `
  <li><span>${icone.local}${esc(MARCA.cidade)}</span></li>
  <li><a href="${linkWhatsapp("Olá!")}" target="_blank" rel="noopener">${icone.fone}${esc(MARCA.telefoneExibicao)}</a></li>
  <li><a href="https://instagram.com/${MARCA.instagram}" target="_blank" rel="noopener">${icone.insta}@${esc(MARCA.instagram)}</a></li>`;

/* ==========================================================================
   ROLAGEM: revelar seções e trocar o tom do fundo
   ========================================================================== */
const revelador = new IntersectionObserver((ents) => ents.forEach((en) => {
  if (en.isIntersecting) { en.target.classList.add("visivel"); revelador.unobserve(en.target); }
}), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
$$(".revelar").forEach((el) => revelador.observe(el));

const tons = new IntersectionObserver((ents) => ents.forEach((en) => {
  if (en.isIntersecting) document.body.dataset.tom = en.target.dataset.tom;
}), { rootMargin: "-50% 0px -50% 0px" });
$$("[data-tom]").forEach((s) => { if (s !== document.body) tons.observe(s); });
