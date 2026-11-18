// Gera os PDFs de entrega da Kirvano dos 3 extras do app (/meu-protocolo).
// Uso: node tools/pdf_extras.js   → entregas/<produto>.pdf
// O conteúdo sai de site/meu-protocolo/extras.js, o mesmo que o app mostra.
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const { EXTRAS, UPSELLS } = require(path.join(ROOT, "site/meu-protocolo/extras.js"));
const OUT = path.join(ROOT, "entregas");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const TIPOS = ["O", "A", "B", "AB"];
const COR = { O: "#b3122e", A: "#1f6f8b", B: "#8a5a00", AB: "#5b3fa0" };
fs.mkdirSync(OUT, { recursive: true });

const css = `
@page{size:A4;margin:16mm 15mm}
*{box-sizing:border-box}
body{font-family:"Poppins",-apple-system,Helvetica,Arial,sans-serif;color:#2b1418;font-size:11pt;line-height:1.5;margin:0}
.capa{height:250mm;display:flex;flex-direction:column;justify-content:center;text-align:center;page-break-after:always}
.capa .e{font-size:64pt}
.capa h1{font-size:30pt;margin:10px 0 0;color:#b3122e;line-height:1.1}
.capa p{font-size:12pt;color:#6b5257;max-width:120mm;margin:14px auto 0}
.cod{margin:28px auto 0;border:2px dashed #b3122e;border-radius:14px;padding:14px 20px;max-width:120mm;background:#fff5f5}
.cod b{display:block;font-size:22pt;letter-spacing:.12em;color:#b3122e}
.cod small{font-size:9.5pt;color:#6b5257}
h2{font-size:16pt;margin:0 0 6px;padding-bottom:6px;border-bottom:3px solid var(--c,#b3122e);color:var(--c,#b3122e)}
h3{font-size:12pt;margin:14px 0 4px}
.tipo{page-break-before:always}
.tipo.first{page-break-before:auto;margin-top:16px}
.box{border:1px solid #f1d5da;border-radius:10px;padding:10px 14px;margin-top:10px;page-break-inside:avoid}
ul,ol{margin:4px 0 0;padding-left:18px}
li{margin-top:2px}
.chips span{display:inline-block;background:#fee2e2;color:#b91c1c;border-radius:99px;padding:3px 10px;margin:3px 4px 0 0;font-size:10pt}
.intro{color:#6b5257}
.foot{margin-top:20px;font-size:8.5pt;color:#a8949a;text-align:center}
`;
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const lista = (a, tag = "ul") => `<${tag}>${a.map((x) => `<li>${esc(x)}</li>`).join("")}</${tag}>`;
const receita = ([e, n, ing, prep]) => `<div class="box"><h3>${e} ${esc(n)}</h3><b>Ingredientes</b>${lista(ing)}<b>Preparo</b>${lista(prep, "ol")}</div>`;

const capa = (x) => `<div class="capa"><div class="e">${x.emoji}</div><h1>${esc(x.nome)}</h1><p>${esc(x.gancho)}</p>
  <div class="cod"><small>Seu código pra liberar no app Meu Protocolo</small><b>${x.codigo}</b><small>Abra o app → aba Mais → "Já comprou e não liberou?" → digite o código.<br>O conteúdo completo também está neste PDF, separado por tipo sanguíneo.</small></div></div>`;

const corpo = {
  doces: (x) => `<p class="intro">${esc(x.intro)}</p>` + TIPOS.map((t, i) => `<section class="tipo${i ? "" : " first"}" style="--c:${COR[t]}"><h2>Tipo ${t}</h2>${x.porTipo[t].map(receita).join("")}</section>`).join(""),
  barriga: (x) => `<p class="intro">${esc(x.intro)}</p><h2>As 3 fases</h2>${x.fases.map(([n, r]) => `<div class="box"><h3>${esc(n)}</h3>${lista(r)}</div>`).join("")}` +
    TIPOS.map((t) => `<section class="tipo" style="--c:${COR[t]}"><h2>Tipo ${t}</h2>${x.shots[t].map(([n, r]) => `<div class="box"><h3>${esc(n)}</h3>${esc(r)}</div>`).join("")}<h3>O que estufa o tipo ${t}</h3><div class="chips">${x.estufa[t].map((y) => `<span>${esc(y)}</span>`).join("")}</div></section>`).join(""),
  fase2: (x) => {
    const porc = "As porções seguem o seu peso: até 70 kg = 100 g de proteína e 3 colheres de carboidrato; 70 a 90 kg = 130 g e 4 colheres; acima de 90 kg = 160 g e 5 colheres. Ovos: 2 ou 3.";
    const f = (s) => s.replace("{p}", "P").replace("{c}", "C").replace("{o}", "2–3");
    return `<p class="intro">${esc(x.intro)}</p><h2>Quando a balança parar</h2>${x.plato.map(([n, r]) => `<div class="box"><h3>${esc(n)}</h3>${esc(r)}</div>`).join("")}
    <h2 style="margin-top:18px">Fim de semana e festa</h2>${lista(x.fds)}<h2 style="margin-top:18px">Manutenção</h2>${lista(x.manut)}` +
    TIPOS.map((t) => `<section class="tipo" style="--c:${COR[t]}"><h2>Tipo ${t} · refeições novas da Fase 2</h2><p class="intro">${porc} No app, o cardápio dos dias 31 a 90 já vem montado dia a dia com essas refeições.</p>
      <h3>Almoços</h3>${lista(x.meals[t].almoco.map(f))}<h3>Jantares</h3>${lista(x.meals[t].jantar.map(f))}<p class="intro" style="font-size:9.5pt">P = gramas de proteína da sua faixa · C = colheres de carboidrato da sua faixa</p></section>`).join("");
  },
};

for (const [k, x] of Object.entries(EXTRAS)) {
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${css}</style></head><body>${capa(x)}${corpo[k](x)}
  <p class="foot">Conteúdo educativo, não substitui orientação médica ou de nutricionista. Gestantes, lactantes e quem usa medicamento contínuo devem consultar um profissional. Dieta do Sangue.</p></body></html>`;
  const tmp = path.join(OUT, `.${k}.html`), pdf = path.join(OUT, `${k}.pdf`);
  fs.writeFileSync(tmp, html);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, "file://" + tmp], { stdio: "ignore" });
  fs.unlinkSync(tmp);
  console.log(pdf, fs.statSync(pdf).size);
}

// ===== UPSELLS do funil: mesmo arquivo pro upsell e o downsell, sem código (libera pelo redirecionamento da Kirvano)
const capaUp = (x) => `<div class="capa"><div class="e">${x.emoji}</div><h1>${esc(x.nome)}</h1><p>${esc(x.intro)}</p>
  <div class="cod"><small>No app Meu Protocolo, este conteúdo já aparece liberado em Mais → Seus produtos, montado pro seu tipo.<br>Não apareceu? Fale com o suporte com o e-mail da compra.</small></div></div>`;
const fx = (s) => s.replace("{p}", "P").replace("{c}", "C").replace("{o}", "2–3");
const PORC = "P = gramas de proteína e C = colheres de carboidrato da sua faixa de peso: até 70 kg = 100 g e 3 col.; 70 a 90 kg = 130 g e 4 col.; acima de 90 kg = 160 g e 5 col.";
const corpoUp = {
  acel: (x) => `<h2>As 3 fases</h2>${x.fases.map(([n, r]) => `<div class="box"><h3>${esc(n)}</h3>${esc(r)}</div>`).join("")}` +
    TIPOS.map((t, i) => `<section class="tipo" style="--c:${COR[t]}"><h2>Tipo ${t}</h2><h3>Zero Absoluto (21 dias sem)</h3><div class="chips">${x.zero[t].map((y) => `<span>${esc(y)}</span>`).join("")}</div>
      ${x.bebidas[t].map(([n, r]) => `<div class="box"><h3>${esc(n)}</h3>${esc(r)}</div>`).join("")}
      <h3>Cafés da manhã</h3>${lista(x.menu[t].cafe.map(fx))}<h3>Almoços</h3>${lista(x.menu[t].almoco.map(fx))}<h3>Jantares</h3>${lista(x.menu[t].jantar.map(fx))}<p class="intro" style="font-size:9.5pt">${PORC} Na Fase 1, lanche só se der fome (1 fruta da lista verde). No app, o cardápio sai dia a dia.</p></section>`).join(""),
  intest: (x) => `<h2>Passo a passo dos 7 dias</h2>${lista(x.passos.map(([d, r]) => `${d}: ${r}`))}<h2 style="margin-top:18px">O que esperar</h2>${lista(x.esperar)}` +
    TIPOS.map((t) => `<section class="tipo" style="--c:${COR[t]}"><h2>Tipo ${t}</h2><h3>A ordem certa</h3>${lista(x.ordem[t].map(([h, r]) => `${h}: ${r}`))}
      <h3>Usar</h3><p>${x.ingredientes[t].usar.join(", ")}</p><h3>Evitar, mesmo sendo "natural"</h3><div class="chips">${x.ingredientes[t].evitar.map((y) => `<span>${esc(y)}</span>`).join("")}</div>
      <h3>Cardápio dos 7 dias</h3>${lista(x.menu[t].map((m, i) => `Dia ${i + 1} · ${m}`))}</section>`).join(""),
  familia: (x) => `<h2>Como funciona</h2><p>No app Meu Protocolo, abra Mais → Seus produtos → Protocolo da Família e adicione cada pessoa com nome, tipo sanguíneo e peso. Cada uma ganha o próprio cardápio do dia, e o app monta o cardápio da casa e uma lista de compras única. Quem não sabe o tipo responde 3 perguntas e o app mostra o perfil provável.</p>
    <h2 style="margin-top:18px">Trocas rápidas</h2>${x.trocas.map(([n, r]) => `<div class="box"><h3>${esc(n)}</h3>${esc(r)}</div>`).join("")}` +
    TIPOS.map((t) => `<section class="tipo" style="--c:${COR[t]}"><h2>Tipo ${t}: o que evitar no prato dessa pessoa</h2><div class="chips">${UPSELLS.acel.zero[t].slice(0, 4).map((y) => `<span>${esc(y)}</span>`).join("")}</div></section>`).join(""),
};
for (const [k, x] of Object.entries(UPSELLS)) {
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${css}</style></head><body>${capaUp(x)}<p class="intro">${esc(x.intro)}</p>${corpoUp[k](x)}
  <p class="foot">Conteúdo educativo, não substitui orientação médica ou de nutricionista. Gestantes, lactantes e quem usa medicamento contínuo devem consultar um profissional. Dieta do Sangue.</p></body></html>`;
  const tmp = path.join(OUT, `.${k}.html`), pdf = path.join(OUT, `up-${k}.pdf`);
  fs.writeFileSync(tmp, html);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, "file://" + tmp], { stdio: "ignore" });
  fs.unlinkSync(tmp);
  console.log(pdf, fs.statSync(pdf).size);
}
