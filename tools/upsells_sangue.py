"""Gera as 3 páginas de upsell (TSL) do funil /sangue, cada uma com o seu downsell.

  site/sangue/up1/  Intestino do seu tipo   R$ 27 · down R$ 17
  site/sangue/up2/  Acelerador 21 Dias      R$ 27 · down R$ 17
  site/sangue/up3/  Protocolo da Família    R$ 27 · down R$ 17

Uso: python3 tools/upsells_sangue.py   (reescreve as 3 páginas)
Texto, preço e links ficam aqui. Depois de gerar, os links da Kirvano vão no CONFIG de cada página
(ou aqui em OFERTAS, e roda de novo).
"""
import json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "site/sangue"

# IDs das ofertas de 1 clique da Kirvano (estratégias UP/DOWN) e pra onde vai depois (comprando ou recusando).
BASE = "https://dietadesangue.netlify.app"
OFERTAS = {
    "up2": ("69b5be57-304a-45e4-887c-f1d130ae20b0", "a64dfeb7-6c57-4cf3-809e-639611a5c361", BASE + "/sangue/up3/"),  # Intestino
    "up1": ("dbabc887-7746-486d-b6fe-12d5ff8d2192", "23335337-a9c8-48d9-ac1c-e1768ce7ff11", BASE + "/sangue/up2/"),  # Acelerador
    "up3": ("a659209e-2759-42a1-a9dd-fbab82c9d857", "be64f304-58c8-4727-bc14-c994b333e7a2", BASE + "/meu-protocolo/"),
}
# Códigos que o app /meu-protocolo libera (extras.js → UPSELLS.codigos). Vão no ?lib= da página seguinte
# e ficam guardados no localStorage "sangue_lib" até o app ler.
CODIGOS = {"up2": ("INTEST7X", "INTEST7D"), "up1": ("ACEL21X", "ACEL21D"), "up3": ("FAMILIA3", "FAMILIA1")}

TOTAL = 5  # compra, up1, up2, up3, acesso

PAGINAS = {
    # ------------------------------------------------------------------ UP 1
    "up1": dict(
        etapa=2, titulo="Pra não travar no meio", produto="Acelerador 21 Dias",
        preco="27", antes="67", preco2="17", antes2="27",
        h1='<span class="mk">ESPERA!</span> Tem uma semana em que quase toda mulher trava. Deixa eu te mostrar como passar dela.',
        tsl="""
<p class="lead">O seu protocolo do <b class="tp">seu tipo</b> já está no seu e-mail. Na primeira semana o corpo responde rápido: você para de comer o que o seu sangue rejeita e o inchaço começa a sair.</p>
<p class="lead">Aí, lá pela segunda semana, acontece o que mais faz mulher desistir: <b>a balança para</b>. Não é que o protocolo parou de funcionar. É o corpo se acostumando.</p>
<p class="lead">Pra esse momento eu montei 21 dias de reforço, em três fases, cada uma com um objetivo. Você encaixa por cima do seu protocolo e passa da trava sem passar fome.</p>
<h2>Como funcionam os 21 dias</h2>
<div class="fases">
  <div class="fs"><span>Dias 1 a 7</span><b>Limpeza</b><p>Sai tudo o que o seu sangue rejeita de uma vez<span class="rj"></span>, e entra o suco da manhã do seu tipo.</p></div>
  <div class="fs"><span>Dias 8 a 14</span><b>Queima</b><p>O jantar fica mais leve e entra o chá do seu tipo antes de dormir.</p></div>
  <div class="fs"><span>Dias 15 a 21</span><b>Firmeza</b><p>Os alimentos da sua lista verde voltam aos poucos, na ordem que segura o resultado.</p></div>
</div>
<p class="lead">Não muda nada do que você já tem. É um reforço por cima, com começo, meio e fim marcados, pra você saber exatamente o que fazer em cada dia.</p>
<h2>O que vem no Acelerador 21 Dias:</h2>""",
        inc=[
            "O <b>cardápio intensivo de 21 dias</b> do <b class=\"tp\">seu tipo</b>, dividido nas 3 fases",
            "O <b>suco da manhã e o chá da noite</b> do seu tipo, com ingredientes de mercado",
            "A lista <b>Zero Absoluto</b>: os alimentos que mais travam o seu tipo e não podem entrar nesses 21 dias",
            "<b>Check-in diário no app</b> pra marcar o dia e não se perder",
            "Acesso ao <b>grupo do Desafio 21 Dias</b>, junto com as outras meninas",
        ],
        bridge="Na primeira semana você sente o corpo mais leve. Na segunda, a roupa começa a folgar. No fim dos 21 dias, as pessoas em volta começam a perguntar o que você fez.",
        sim="Quero o reforço dos 21 dias por R$&nbsp;{p}&nbsp;→",
        nao="não, obrigada. se eu travar, eu me viro",
        garantia="Se não sentir diferença nos 21 dias, devolvo os R$ {p} e você fica com o Acelerador.",
        down_h1='Entendi. Então deixa eu <span class="mk">fazer uma coisa por você</span>:',
        down_tsl="""<p class="lead">Eu tiro os extras e te deixo só a parte que faz o resultado vir antes: <b>o cardápio intensivo dos 21 dias e a lista Zero Absoluto</b> do seu tipo.</p>""",
        down_inc=[("✅", "Cardápio intensivo de 21 dias, nas 3 fases"), ("✅", "Lista Zero Absoluto do seu tipo"),
                  ("❌", "Suco da manhã e chá da noite"), ("❌", "Check-in diário e grupo do Desafio 21 Dias")],
        sim2="Tudo bem, quero por R$&nbsp;{p}&nbsp;→",
        nao2="não, quero seguir só com o meu protocolo",
    ),
    # ------------------------------------------------------------------ UP 2
    "up2": dict(
        etapa=3, titulo="O intestino do seu tipo", produto="Protocolo Intestino do Seu Tipo",
        preco="27", antes="67", preco2="17", antes2="27",
        h1='<span class="mk">ESPERA!</span> Cada tipo de sangue tem um intestino diferente. E o seu pode estar segurando o inchaço.',
        tsl="""
<p class="lead">Parabéns, o seu protocolo do <b class="tp">seu tipo</b> já está no seu e-mail. Ele cuida do que entra no seu prato <b>daqui pra frente</b>.</p>
<p class="lead">Mas lembra do teste? O seu sangue rejeita alguns alimentos<span class="rj"></span>. Você passou anos comendo eles sem saber.</p>
<p class="lead">Tirar esses alimentos do prato resolve <b>daqui pra frente</b>. Mas o que esses anos deixaram no seu intestino continua lá: ele fica inflamado, travado, e o corpo <b>segura líquido</b>.</p>
<p class="lead">É por isso que algumas mulheres fazem tudo certinho na primeira semana e a barriga demora pra baixar. Elas estão seguindo o protocolo direitinho. O que segura é o que ficou parado lá dentro.</p>
<p class="lead">E aqui tem um detalhe que quase ninguém sabe: <b>a limpeza também muda de um tipo pro outro</b>. Ingrediente que limpa o intestino do tipo O pode ser justamente um que o tipo A rejeita. Por isso receita de limpeza genérica da internet às vezes estufa mais do que ajuda.</p>
<h2>Por isso eu montei o Protocolo Intestino do <span class="tp">Seu Tipo</span>:</h2>""",
        inc=[
            "O <b>passo a passo de 7 dias</b> pra limpar e destravar o intestino, só com o que o <b class=\"tp\">seu tipo</b> aceita",
            "A <b>ordem certa</b>: o que tomar de manhã e o que tomar antes de dormir",
            "Os <b>ingredientes de limpeza do seu tipo</b> e os que você deve evitar, mesmo sendo \"naturais\"",
            "O <b>cardápio dos 7 dias</b>, encaixado no seu protocolo",
            "<b>O que esperar dia a dia</b>: quando o intestino solta, quando o inchaço começa a sair",
        ],
        bridge="Quem faz os 7 dias no começo entra no protocolo com o intestino limpo. Aí o corpo para de segurar e a barriga responde mais rápido.",
        sim="Quero destravar meu intestino por R$&nbsp;{p}&nbsp;→",
        nao="não, obrigada. prefiro começar do jeito que tá",
        garantia="Se não sentir a barriga baixar, devolvo os R$ {p} e você fica com o protocolo.",
        down_h1='Tudo bem. Então fica <span class="mk">só com o essencial</span>:',
        down_tsl="""<p class="lead">Eu tiro o cardápio e o acompanhamento dia a dia e te deixo <b>só o passo a passo da limpeza do seu tipo</b>. É a parte que destrava o intestino.</p>""",
        down_inc=[("✅", "Passo a passo de 7 dias com os ingredientes do seu tipo"), ("✅", "A ordem certa: manhã e antes de dormir"),
                  ("❌", "Cardápio dos 7 dias"), ("❌", "O que esperar dia a dia")],
        sim2="Tudo bem, quero por R$&nbsp;{p}&nbsp;→",
        nao2="não, quero seguir sem a limpeza",
    ),
    # ------------------------------------------------------------------ UP 3
    "up3": dict(
        etapa=4, titulo="E o resto da sua casa?", produto="Protocolo da Família",
        preco="27", antes="67", preco2="17", antes2="27",
        h1='<span class="mk">ÚLTIMA ETAPA:</span> e o resto da sua casa?',
        tsl="""
<p class="lead">Você vai começar a comer pro <b class="tp">seu tipo</b>. Só que lá em casa ninguém come igual a você.</p>
<p class="lead">Marido, filho, mãe: cada um tem o seu tipo. E aí aparece o problema que faz muita mulher largar o protocolo na segunda semana: <b>fazer duas comidas, todo santo dia</b>.</p>
<p class="lead">Ou você cozinha uma panela pra você e outra pra família, e se cansa. Ou come o que todo mundo come e sai do protocolo sem perceber.</p>
<p class="lead">Foi pensando nisso que eu liberei, só pra quem acabou de entrar, o <b>Protocolo da Família</b>: uma comida só na mesa, e cada um ajusta o próprio prato.</p>
<h2>O que vem no Protocolo da Família:</h2>""",
        inc=[
            "<b>Mais 3 perfis no seu app</b>, cada pessoa com o próprio tipo e o próprio cardápio",
            "O <b>cardápio da casa</b>: uma refeição base que serve todo mundo, e o ajuste de cada tipo no prato",
            "<b>Uma lista de compras só</b> pra família inteira, sem comprar coisa repetida",
            "Não sabe o tipo de alguém? O <b>teste do app</b> mostra o perfil provável pelos sinais do corpo",
            "As <b>trocas rápidas</b> pra quando um come uma coisa e o outro não pode",
        ],
        bridge="Quando a casa inteira come do mesmo jeito, você para de lutar contra a própria cozinha. Fica fácil seguir, e o resultado aparece em mais gente além de você.",
        sim="Quero o protocolo da família por R$&nbsp;{p}&nbsp;→",
        nao="não, obrigada. vou fazer só pra mim",
        garantia="Se a família não se adaptar, devolvo os R$ {p} e vocês ficam com o protocolo.",
        down_h1='Entendi. E se for <span class="mk">só mais uma pessoa</span>?',
        down_tsl="""<p class="lead">Às vezes não é a casa inteira. É o marido, ou a mãe, ou a filha que vive dizendo "faz pra mim também". Então eu libero <b>mais um perfil</b> no seu app, com o tipo e o cardápio dessa pessoa.</p>""",
        down_inc=[("✅", "Mais 1 perfil no seu app, com tipo e cardápio próprios"), ("✅", "Lista de compras juntando vocês duas"),
                  ("❌", "Mais 3 perfis e cardápio da casa"), ("❌", "Trocas rápidas da família")],
        sim2="Tudo bem, quero mais 1 perfil por R$&nbsp;{p}&nbsp;→",
        nao2="não, quero seguir só com o meu",
    ),
}

DISC = "Este produto não substitui orientação médica. Consulte um profissional de saúde antes de iniciar, especialmente se estiver gestante, amamentando, tiver alguma condição de saúde pré-existente ou fizer uso de medicamentos. Resultados variam de pessoa para pessoa."

HEAD = r"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>__TITULO__ · Dieta do Sangue</title>
<meta name="robots" content="noindex,nofollow">
<link rel="icon" href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="%23b3122e"/><path d="M12 4c3 4 5 6.6 5 9.2A5 5 0 0 1 7 13.2C7 10.6 9 8 12 4z" fill="%23fff"/></svg>'>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap">
<!-- UTMify Pixel -->
<script>window.pixelId="6afd40662d87d7031cc86ff2";var a=document.createElement("script");a.async=true;a.defer=true;a.src="https://cdn.utmify.com.br/scripts/pixel/pixel.js";document.head.appendChild(a);</script>
<!-- UTMify UTMs -->
<script src="https://cdn.utmify.com.br/scripts/utms/latest.js" data-utmify-prevent-xcod-sck data-utmify-prevent-subids async defer></script>
<style>
:root{
  --bg:#fbf1f2; --card:#ffffff; --card2:#fdf6f7;
  --line:rgba(140,20,40,.13); --line2:rgba(140,20,40,.26);
  --ink:#2a1619; --ink2:#6b5357; --mute:#a3898d;
  --accent:#b3122e; --accent-soft:#fbe4e8;
  --red:#dc2626; --red-soft:#fee2e2; --yellow:#fde047;
  --green:#16a34a; --green-deep:#15803d; --green-soft:#dcfce7;
  --r:20px; --r-sm:14px; --maxw:520px;
  --font:"Poppins",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --shadow:0 18px 44px -18px rgba(120,14,32,.25);
}
*{box-sizing:border-box}
html,body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--font);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased}
.wrap{max-width:var(--maxw);margin:0 auto;padding:18px 18px 60px}
h1{font-size:1.36rem;line-height:1.3;font-weight:800;letter-spacing:-.015em;margin:16px 0 0}
h1 .mk{background:linear-gradient(transparent 55%,var(--yellow) 55%)}
h2{font-size:1.05rem;font-weight:800;margin:30px 0 0;letter-spacing:-.01em}
p{margin:14px 0 0}
.lead{font-size:.98rem;line-height:1.68;color:#4a3236}
.lead b{color:var(--ink)}
.warn{position:sticky;top:0;z-index:30;background:#2a1619;color:#f6d9de;font-weight:600;font-size:.74rem;line-height:1.35;text-align:center;padding:calc(8px + env(safe-area-inset-top,0px)) 16px 8px}
.warn b{color:#ff8fa0;font-weight:700}
.stepbar{margin-top:18px;display:flex;align-items:center;gap:12px}
.stepbar .segs{display:grid;grid-auto-flow:column;grid-auto-columns:1fr;gap:5px;flex:1}
.stepbar .segs i{height:5px;border-radius:99px;background:var(--card2);border:1px solid var(--line)}
.stepbar .segs i.on{background:linear-gradient(90deg,#e0566c,#b3122e);border-color:transparent}
.stepbar .lb{font-size:.74rem;font-weight:700;color:var(--mute);white-space:nowrap}
.paid{display:inline-flex;align-items:center;gap:6px;background:var(--green-soft);color:var(--green-deep);border-radius:99px;padding:5px 11px;font-size:.76rem;font-weight:700;margin-top:14px}
.tipo{display:inline-flex;align-items:center;gap:6px;background:var(--accent-soft);color:var(--accent);border-radius:99px;padding:5px 11px;font-size:.76rem;font-weight:700;margin:14px 0 0 6px}
.fases{margin-top:14px;display:grid;gap:10px}
.fs{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:var(--r-sm);padding:12px 14px}
.fs span{display:block;font-size:.72rem;font-weight:700;color:var(--accent);letter-spacing:.04em;text-transform:uppercase}
.fs b{display:block;font-size:1rem;margin-top:2px}
.fs p{margin:4px 0 0;font-size:.9rem;color:var(--ink2);line-height:1.55}
.inc{margin-top:12px;display:grid;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:4px 14px}
.inc .it{padding:12px 2px;display:grid;grid-template-columns:20px 1fr;gap:11px;align-items:start;font-size:.95rem;line-height:1.55;border-top:1px solid var(--line)}
.inc .it:first-child{border-top:0}
.inc .it>div:first-child{font-size:.9rem;line-height:1.7}
.inc .it.off{opacity:.45}
.mock{margin:22px auto 0}
.mock img{width:100%;border-radius:var(--r);display:block}
.bridge{margin-top:22px;background:var(--accent-soft);border-left:4px solid var(--accent);border-radius:0 var(--r-sm) var(--r-sm) 0;padding:15px 16px;font-weight:600;line-height:1.6}
.price{margin-top:26px;border:2px solid var(--accent);border-radius:var(--r);padding:22px 16px 18px;text-align:center;position:relative;background:var(--card);box-shadow:var(--shadow)}
.price .feat{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;font-size:.68rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:5px 12px;border-radius:99px;white-space:nowrap}
.price .pt{font-size:.85rem;font-weight:700;color:var(--ink2)}
.price .before{color:var(--mute);font-size:.95rem;text-decoration:line-through;margin-top:4px}
.price .arrow{color:var(--accent);font-size:1.25rem;line-height:1}
.price .val{font-size:2.8rem;font-weight:900;line-height:1.1;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.price .val small{font-size:1.1rem;vertical-align:top;margin-right:2px}
.price .pix{font-size:.85rem;color:var(--ink2);margin-top:4px}
.btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:60px;border:0;border-radius:var(--r);font:800 1.02rem var(--font);-webkit-appearance:none;line-height:1.3;color:#fff;background:linear-gradient(180deg,#22c55e 0%,#15803d 100%);cursor:pointer;padding:12px 18px;text-align:center;text-decoration:none;margin-top:20px;animation:pulseG 1.7s infinite}
.btn:active{transform:scale(.985)}
@keyframes pulseG{0%{box-shadow:0 0 0 0 rgba(22,163,74,.5)}70%{box-shadow:0 0 0 14px rgba(22,163,74,0)}100%{box-shadow:0 0 0 0 rgba(22,163,74,0)}}
.no{display:block;width:100%;background:none;border:0;color:var(--mute);font:500 .85rem var(--font);text-align:center;margin-top:16px;cursor:pointer;padding:10px}
.guar{margin-top:22px;background:var(--green-soft);border:1px solid #bbf7d0;border-radius:var(--r);padding:16px;display:grid;grid-template-columns:40px 1fr;gap:12px;align-items:start}
.guar .ic{font-size:30px;line-height:1}
.guar b{display:block;font-size:.95rem}.guar p{margin:4px 0 0;font-size:.85rem;color:var(--ink2)}
.foot{color:var(--mute);font-size:.72rem;text-align:center;line-height:1.6;margin-top:30px}
[hidden]{display:none!important}
</style>
</head>
<body>
"""

SCRIPT = r"""
<script>
/* =====================================================================
   CONFIG — links de 1 clique da Kirvano (Upsell → "link da oferta")
   Gerado por tools/upsells_sangue.py. Pra mudar texto, edite lá e rode de novo.
   ===================================================================== */
const CONFIG = __CONFIG__;

/* params: a Kirvano devolve o que foi na URL do checkout (utms, sid, tipo) */
/* compra de upsell anterior: ?lib=CODIGO chega aqui; guarda pro app liberar e tira da URL */
{ const L = new URLSearchParams(location.search), c = L.get("lib");
  if (c) { try { const a = JSON.parse(localStorage.getItem("sangue_lib") || "[]"); if (!a.includes(c)) a.push(c); localStorage.setItem("sangue_lib", JSON.stringify(a)); } catch (e) {}
    L.delete("lib"); history.replaceState(null, "", location.pathname + (L.toString() ? "?" + L : "")); } }
let search = location.search;
try { if (search && search.length > 1) localStorage.setItem("utm_query", search); else search = localStorage.getItem("utm_query") || ""; } catch (e) {}
const Q = new URLSearchParams(search);
const TIPO = ["O", "A", "B", "AB"].includes((Q.get("tipo") || "").toUpperCase()) ? Q.get("tipo").toUpperCase() : "";
const link = (base, tag) => { try { const u = new URL(base, location.href); Q.forEach((v, k) => u.searchParams.set(k, v)); u.searchParams.set("src", [tag, Q.get("sid") || "", "sangue-" + TIPO].join("|")); return u.toString(); } catch (e) { return base; } };

/* personaliza pelo tipo: "seu tipo" vira "tipo O", e lista o que o tipo rejeita */
const REJ = { O: "pão, leite, milho e feijão", A: "carne vermelha, leite e feijão", B: "frango, milho e pão", AB: "carne vermelha, frango e milho" };
document.querySelectorAll(".tp").forEach(e => { if (TIPO) e.textContent = (e.textContent.startsWith("Seu") ? "Tipo " : "tipo ") + TIPO; });
document.querySelectorAll(".rj").forEach(e => { if (TIPO) e.textContent = ` (no tipo ${TIPO}: ${REJ[TIPO]})`; });
if (TIPO) document.querySelectorAll(".tipo").forEach(e => e.textContent = "🩸 Protocolo Tipo " + TIPO); else document.querySelectorAll(".tipo").forEach(e => e.remove());

/* Firestore: marca na mesma sessão do funil */
let DB = null;
(function () {
  const sid = Q.get("sid"); if (!sid || !CONFIG.firebase.apiKey) return;
  const load = (s) => new Promise((r, j) => { const e = document.createElement("script"); e.src = s; e.onload = r; e.onerror = j; document.head.appendChild(e); });
  const ready = (async () => { const v = "10.12.0"; await load(`https://www.gstatic.com/firebasejs/${v}/firebase-app-compat.js`); await load(`https://www.gstatic.com/firebasejs/${v}/firebase-auth-compat.js`); await load(`https://www.gstatic.com/firebasejs/${v}/firebase-firestore-compat.js`); firebase.initializeApp(CONFIG.firebase); await firebase.auth().signInAnonymously(); return firebase.firestore(); })().catch(() => null);
  DB = { write: (patch) => ready.then(db => { if (db) db.collection("sessions").doc(sid).set({ ...patch, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true }).catch(() => {}); }) };
})();
const K = CONFIG.id, now = () => Math.round(Date.now() / 1000);
const w = (o) => { if (DB) DB.write(Object.fromEntries(Object.entries(o).map(([k, v]) => [K + "_" + k, v]))); };
const track = (ev, d) => { try { if (window.utmify) utmify("track", ev, d); if (window.fbq) fbq("trackCustom", ev, d); } catch (e) {} };

const $ = (id) => document.getElementById(id);
if (CONFIG.foto) $("mock").innerHTML = `<img src="${CONFIG.foto}" alt="">`; else $("mock").remove();

w({ viewed: true, at: now() }); track("UpsellView", { up: K });
$("sim").onclick = () => { w({ clicked: true }); track("InitiateCheckout", { src: K }); };
$("nao").onclick = () => { $("s1").hidden = true; $("s2").hidden = false; scrollTo(0, 0); w({ recusado: true, downViewed: true }); track("UpsellDeclined", { up: K }); };
$("sim2").onclick = () => { w({ downClicked: true }); track("InitiateCheckout", { src: K + "-down" }); };
$("nao2").onclick = () => { w({ downRecusado: true }); track("DownsellDeclined", { up: K }); };  // o redirecionamento da recusa é da Kirvano (refusePageURL)
</script>
<!-- Kirvano 1 clique: UM snippet por página. O offerMap separa upsell (#sim) e downsell (#sim2);
     as globais valem pro botão de recusa do downsell (#nao2). O "não" do upsell (#nao) não é da Kirvano. -->
<script>
  var offer = "__DOWN__";
  var nextPageURL = "__PROX__";
  var refusePageURL = "__PROX__";
  window.offerMap = {
    "sim":  { offer: "__UP__",   nextPageURL: "__PROX__?lib=__CX__", refusePageURL: "__PROX__" },
    "sim2": { offer: "__DOWN__", nextPageURL: "__PROX__?lib=__CD__", refusePageURL: "__PROX__" }
  };
</script>
<script src="https://snippets.kirvano.com/upsell.min.js"></script>
</body>
</html>
"""


def stepbar(n):
    segs = "".join(f'<i class="{"on" if i < n else ""}"></i>' for i in range(TOTAL))
    return f'<div class="stepbar"><div class="segs">{segs}</div><span class="lb">etapa {n} de {TOTAL}</span></div>'


def price(feat, nome, p, a, sub):
    return f'''<div class="price"><span class="feat">{feat}</span><div class="pt">{nome}</div>
    <div class="before">De R$ {a}</div><div class="arrow">↓</div><div class="val"><small>R$</small>{p}</div>
    <div class="pix">{sub}</div></div>'''


def pagina(pid, d):
    up, down, prox = OFERTAS[pid]
    cfg = dict(id=pid, foto={"up2": "../assets/upIntestino.jpg", "up1": "../assets/upAcelerador.jpg", "up3": "../assets/upFamilia.jpg"}[pid],
               firebase={"apiKey": "AIzaSyDbRQJkq7C_lBWa7QSf6bvhTaP_EFP8OUU", "authDomain": "canetinha-4bd2a.firebaseapp.com",
                         "projectId": "canetinha-4bd2a", "appId": "1:298345331983:web:06f6d8092fcbc3e1d5527a"})
    inc = "".join(f'<div class="it"><div>✅</div><div>{t}</div></div>' for t in d["inc"])
    dinc = "".join(f'<div class="it{" off" if ic == "❌" else ""}"><div>{ic}</div><div>{t}</div></div>' for ic, t in d["down_inc"])
    body = f"""
<div class="warn">Não atualize nem feche esta página. <b>Sua compra pode ser cobrada duas vezes.</b></div>

<!-- ===== UPSELL ===== -->
<div class="wrap" id="s1">
  {stepbar(d["etapa"])}
  <span class="paid">✅ Pagamento aprovado</span><span class="tipo"></span>
  <h1>{d["h1"]}</h1>
  <div class="mock" id="mock"></div>
  {d["tsl"]}
  <div class="inc">{inc}</div>
  <p class="bridge">{d["bridge"]}</p>
  {price("Só nesta página", d["produto"], d["preco"], d["antes"], "no mesmo pagamento que você acabou de fazer · 1 clique, sem digitar o cartão de novo")}
  <button class="btn kirvano-payment-trigger" id="sim" type="button"><span>{d["sim"].format(p=d["preco"])}</span></button>
  <button class="no" id="nao" type="button">{d["nao"]}</button>
  <div class="guar"><div class="ic">🛡️</div><div><b>Os mesmos 30 dias de garantia</b><p>{d["garantia"].format(p=d["preco"])}</p></div></div>
  <p class="foot">{DISC}</p>
</div>

<!-- ===== DOWNSELL ===== -->
<div class="wrap" id="s2" hidden>
  {stepbar(d["etapa"])}
  <span class="paid">✅ Pagamento aprovado</span>
  <p class="lead">O seu protocolo continua garantido. O acesso já foi pro seu e-mail.</p>
  <h1>{d["down_h1"]}</h1>
  {d["down_tsl"]}
  <div class="inc">{dinc}</div>
  {price("Última chance", d["produto"], d["preco2"], d["antes2"], "1 clique, no mesmo pagamento")}
  <button class="btn kirvano-payment-trigger" id="sim2" type="button"><span>{d["sim2"].format(p=d["preco2"])}</span></button>
  <button class="no kirvano-refuse-trigger" id="nao2" type="button">{d["nao2"]}</button>
  <p class="foot">{DISC}</p>
  <p class="foot">Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Não vendemos o seu e-mail nem qualquer informação para terceiros.</p>
</div>
"""
    html = HEAD.replace("__TITULO__", d["titulo"]) + body + SCRIPT.replace("__CONFIG__", json.dumps(cfg, ensure_ascii=False, indent=2)).replace("__UP__", up).replace("__DOWN__", down).replace("__CX__", CODIGOS[pid][0]).replace("__CD__", CODIGOS[pid][1]).replace("__PROX__", prox)
    out = SITE / pid / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print("ok", out.relative_to(ROOT))


if __name__ == "__main__":
    for pid, d in PAGINAS.items():
        pagina(pid, d)
