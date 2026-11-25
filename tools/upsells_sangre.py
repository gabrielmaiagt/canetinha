"""Genera las 3 páginas de upsell (TSL) del funil en español /sangre, cada una con su downsell.

  site/sangre/up1/  Acelerador 21 Días de tu tipo        US$ 19.90 · down US$ 9.90
  site/sangre/up2/  Intestino de tu tipo                 US$ 14.90 · down US$ 7.90
  site/sangre/up3/  Protocolo de la Familia              US$ 19.90 · down US$ 9.90

Uso: python3 tools/upsells_sangre.py   (reescribe las 3 páginas)
Reaprovecha el CSS y el script de tools/upsells_sangue.py (versión PT) y cambia:
  - textos en español y precios en US$;
  - el snippet de 1 clic de Kirvano sale. Los botones van a los links de LINKS (checkout Cakto de cada oferta).
    Cuando el upsell de 1 clic de Cakto esté configurado, se cambia aquí.
"""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import upsells_sangue as PT

ROOT = PT.ROOT
SITE = ROOT / "site/sangre"
BASE = "https://dietadesangue.netlify.app"

# Links de checkout (Cakto, USD) del upsell y del downsell de cada página + adónde va después
LINKS = {
    "up1": ("https://pay.cakto.com.br/6ppjdip", "https://pay.cakto.com.br/oihxqsz", BASE + "/sangre/up2/"),
    "up2": ("https://pay.cakto.com.br/udhtqhp", "https://pay.cakto.com.br/u7n7xkp", BASE + "/sangre/up3/"),
    "up3": ("https://pay.cakto.com.br/ytrjtju", "https://pay.cakto.com.br/3em4b5o", BASE + "/mi-protocolo/"),
}
CODIGOS = PT.CODIGOS  # mismos códigos que libera la app (ACEL21X, ACEL21D, ...)
TOTAL = PT.TOTAL

PAGINAS = {
    "up1": dict(
        etapa=2, titulo="Tu resultado más rápido", produto="Acelerador 21 Días",
        preco="19.90", antes="47", preco2="9.90", antes2="19.90",
        h1='<span class="mk">¡ESPERA!</span> Puedes sentir el resultado de tu protocolo mucho antes. Pero hay un orden correcto.',
        tsl="""
<p class="lead">Tu protocolo del <b class="tp">tu tipo</b> ya llegó a tu correo. Funciona a ritmo normal: sacas del plato lo que tu sangre rechaza y el cuerpo se va desinflamando de a poco, a lo largo de los 30 días.</p>
<p class="lead">Pero casi todas las mujeres me hacen la misma pregunta apenas compran: <b>"¿se puede ir más rápido?"</b></p>
<p class="lead">Se puede. Y sin pasar hambre. El secreto es apretar el menú de tu tipo durante 21 días, en tres fases, cada una con un objetivo.</p>
<h2>Cómo funcionan los 21 días</h2>
<div class="fases">
  <div class="fs"><span>Días 1 a 7</span><b>Limpieza</b><p>Sale de una vez todo lo que tu sangre rechaza<span class="rj"></span>, y entra el jugo de la mañana de tu tipo.</p></div>
  <div class="fs"><span>Días 8 a 14</span><b>Quema</b><p>La cena se hace más liviana y entra el té de tu tipo antes de dormir.</p></div>
  <div class="fs"><span>Días 15 a 21</span><b>Firmeza</b><p>Los alimentos de tu lista verde vuelven de a poco, en el orden que sostiene el resultado.</p></div>
</div>
<p class="lead">Es el mismo protocolo que compraste, solo que más intenso y con un principio, un medio y un final marcados. Sabes exactamente qué hacer cada día.</p>
<h2>Lo que trae el Acelerador 21 Días:</h2>""",
        inc=[
            "El <b>menú intensivo de 21 días</b> de <b class=\"tp\">tu tipo</b>, dividido en las 3 fases",
            "El <b>jugo de la mañana y el té de la noche</b> de tu tipo, con ingredientes de supermercado",
            "La lista <b>Cero Absoluto</b>: los alimentos que más frenan a tu tipo y no pueden entrar en estos 21 días",
            "<b>Check-in diario en la app</b> para marcar el día y no perderte",
            "Acceso al <b>grupo del Reto 21 Días</b>, junto con las demás chicas",
        ],
        bridge="En la primera semana sientes el cuerpo más liviano. En la segunda, la ropa empieza a quedarte floja. Al final de los 21 días, la gente a tu alrededor empieza a preguntarte qué hiciste.",
        sim="Quiero acelerar mi resultado por US$&nbsp;{p}&nbsp;→",
        nao="no, gracias. prefiero seguir a ritmo normal",
        garantia="Si no sientes diferencia en los 21 días, te devuelvo los US$ {p} y te quedas con el Acelerador.",
        down_h1='Entiendo. Entonces déjame <span class="mk">hacer algo por ti</span>:',
        down_tsl="""<p class="lead">Quito los extras y te dejo solo la parte que hace que el resultado llegue antes: <b>el menú intensivo de los 21 días y la lista Cero Absoluto</b> de tu tipo.</p>""",
        down_inc=[("✅", "Menú intensivo de 21 días, en las 3 fases"), ("✅", "Lista Cero Absoluto de tu tipo"),
                  ("❌", "Jugo de la mañana y té de la noche"), ("❌", "Check-in diario y grupo del Reto 21 Días")],
        sim2="Está bien, lo quiero por US$&nbsp;{p}&nbsp;→",
        nao2="no, quiero seguir solo con mi protocolo",
    ),
    "up2": dict(
        etapa=3, titulo="El intestino de tu tipo", produto="Protocolo Intestino de Tu Tipo",
        preco="14.90", antes="37", preco2="7.90", antes2="14.90",
        h1='<span class="mk">¡ESPERA!</span> Cada tipo de sangre tiene un intestino distinto. Y el tuyo puede estar reteniendo la hinchazón.',
        tsl="""
<p class="lead">¿Recuerdas el test? Tu sangre rechaza algunos alimentos<span class="rj"></span>. Pasaste años comiéndolos sin saberlo.</p>
<p class="lead">Sacar esos alimentos del plato lo resuelve <b>de aquí en adelante</b>. Pero lo que esos años dejaron en tu intestino sigue ahí: se queda inflamado, trabado, y el cuerpo <b>retiene líquido</b>.</p>
<p class="lead">Por eso algunas mujeres hacen todo bien la primera semana y la barriga tarda en bajar. Están siguiendo el protocolo al pie de la letra. Lo que frena es lo que quedó estancado adentro.</p>
<p class="lead">Y aquí hay un detalle que casi nadie sabe: <b>la limpieza también cambia de un tipo a otro</b>. Un ingrediente que limpia el intestino del tipo O puede ser justo uno que el tipo A rechaza. Por eso las recetas detox genéricas de internet a veces hinchan más de lo que ayudan.</p>
<h2>Por eso armé el Protocolo Intestino de <span class="tp">Tu Tipo</span>:</h2>""",
        inc=[
            "El <b>paso a paso de 7 días</b> para limpiar y destrabar el intestino, solo con lo que <b class=\"tp\">tu tipo</b> acepta",
            "El <b>orden correcto</b>: qué tomar en la mañana y qué tomar antes de dormir",
            "Los <b>ingredientes de limpieza de tu tipo</b> y los que debes evitar, aunque sean \"naturales\"",
            "El <b>menú de los 7 días</b>, encajado en tu protocolo",
            "<b>Qué esperar día a día</b>: cuándo se suelta el intestino, cuándo empieza a salir la hinchazón",
        ],
        bridge="Quien hace los 7 días al principio entra al protocolo con el intestino limpio. Entonces el cuerpo deja de retener y la barriga responde más rápido.",
        sim="Quiero destrabar mi intestino por US$&nbsp;{p}&nbsp;→",
        nao="no, gracias. prefiero empezar así como estoy",
        garantia="Si no sientes que la barriga baja, te devuelvo los US$ {p} y te quedas con el protocolo.",
        down_h1='Está bien. Entonces quédate <span class="mk">solo con lo esencial</span>:',
        down_tsl="""<p class="lead">Quito el menú y el seguimiento día a día y te dejo <b>solo el paso a paso de la limpieza de tu tipo</b>. Es la parte que destraba el intestino.</p>""",
        down_inc=[("✅", "Paso a paso de 7 días con los ingredientes de tu tipo"), ("✅", "El orden correcto: mañana y antes de dormir"),
                  ("❌", "Menú de los 7 días"), ("❌", "Qué esperar día a día")],
        sim2="Está bien, lo quiero por US$&nbsp;{p}&nbsp;→",
        nao2="no, quiero seguir sin la limpieza",
    ),
    "up3": dict(
        etapa=4, titulo="¿Y el resto de tu casa?", produto="Protocolo de la Familia",
        preco="19.90", antes="47", preco2="9.90", antes2="19.90",
        h1='<span class="mk">ÚLTIMA ETAPA:</span> ¿y el resto de tu casa?',
        tsl="""
<p class="lead">Vas a empezar a comer para <b class="tp">tu tipo</b>. Pero en tu casa nadie come igual que tú.</p>
<p class="lead">Esposo, hijos, mamá: cada uno tiene su tipo. Y ahí aparece el problema que hace que muchas mujeres abandonen el protocolo en la segunda semana: <b>cocinar dos comidas, todos los benditos días</b>.</p>
<p class="lead">O cocinas una olla para ti y otra para la familia, y te cansas. O comes lo que comen todos y sales del protocolo sin darte cuenta.</p>
<p class="lead">Pensando en eso liberé, solo para quien acaba de entrar, el <b>Protocolo de la Familia</b>: una sola comida en la mesa, y cada uno ajusta su propio plato.</p>
<h2>Lo que trae el Protocolo de la Familia:</h2>""",
        inc=[
            "<b>3 perfiles más en tu app</b>, cada persona con su propio tipo y su propio menú",
            "El <b>menú de la casa</b>: una comida base que sirve para todos, y el ajuste de cada tipo en el plato",
            "<b>Una sola lista de compras</b> para toda la familia, sin comprar cosas repetidas",
            "¿No sabes el tipo de alguien? El <b>test de la app</b> muestra el perfil probable por las señales del cuerpo",
            "Los <b>cambios rápidos</b> para cuando uno come algo que el otro no puede",
        ],
        bridge="Cuando toda la casa come igual, dejas de pelear contra tu propia cocina. Se vuelve fácil seguirlo, y el resultado aparece en más gente además de ti.",
        sim="Quiero el protocolo de la familia por US$&nbsp;{p}&nbsp;→",
        nao="no, gracias. lo voy a hacer solo para mí",
        garantia="Si tu familia no se adapta, te devuelvo los US$ {p} y se quedan con el protocolo.",
        down_h1='Entiendo. ¿Y si es <span class="mk">solo una persona más</span>?',
        down_tsl="""<p class="lead">A veces no es toda la casa. Es tu esposo, o tu mamá, o tu hija que siempre te dice "hazlo para mí también". Entonces te libero <b>un perfil más</b> en tu app, con el tipo y el menú de esa persona.</p>""",
        down_inc=[("✅", "1 perfil más en tu app, con tipo y menú propios"), ("✅", "Lista de compras que junta a las dos"),
                  ("❌", "3 perfiles más y menú de la casa"), ("❌", "Cambios rápidos de la familia")],
        sim2="Está bien, quiero 1 perfil más por US$&nbsp;{p}&nbsp;→",
        nao2="no, quiero seguir solo con el mío",
    ),
}

DISC = "Este producto no sustituye la orientación médica. Consulta a un profesional de la salud antes de empezar, especialmente si estás embarazada, en lactancia, tienes alguna condición de salud preexistente o tomas medicamentos. Los resultados varían de persona a persona."

HEAD = PT.HEAD.replace('lang="pt-BR"', 'lang="es"').replace("· Dieta do Sangue", "· Dieta del Tipo de Sangre")

# Script: el de la versión PT, en español, sin el snippet de Kirvano. Los botones navegan a CONFIG.links.
SCRIPT = PT.SCRIPT.split("<!-- Kirvano 1 clique")[0]
for a, b in [
    ('u.searchParams.set("src", [tag, Q.get("sid") || "", "sangue-" + TIPO].join("|"));', 'u.searchParams.set("src", [tag, Q.get("sid") || "", "sangre-" + TIPO].join("|")); u.searchParams.set("sck", [tag, "", "", Q.get("sid") || "", "sangre-" + TIPO].join("|"));'),
    ('"sangue_lib"', '"sangre_lib"'),
    ('{ O: "pão, leite, milho e feijão", A: "carne vermelha, leite e feijão", B: "frango, milho e pão", AB: "carne vermelha, frango e milho" }',
     '{ O: "pan, leche, maíz y frijoles", A: "carne roja, leche y frijoles", B: "pollo, maíz y pan", AB: "carne roja, pollo y maíz" }'),
    ('e.textContent = (e.textContent.startsWith("Seu") ? "Tipo " : "tipo ") + TIPO;', 'e.textContent = (e.textContent.startsWith("Tu") ? "Tipo " : "tipo ") + TIPO;'),
    ('` (no tipo ${TIPO}: ${REJ[TIPO]})`', '` (en el tipo ${TIPO}: ${REJ[TIPO]})`'),
    ('"🩸 Protocolo Tipo " + TIPO', '"🩸 Protocolo Tipo " + TIPO'),
    ('$("nao2").onclick = () => { w({ downRecusado: true }); track("DownsellDeclined", { up: K }); };  // o redirecionamento da recusa é da Kirvano (refusePageURL)',
     '$("nao2").onclick = () => { w({ downRecusado: true }); track("DownsellDeclined", { up: K }); location.href = link(CONFIG.links.prox, "rec"); };'),
]:
    assert a in SCRIPT, a[:50]
    SCRIPT = SCRIPT.replace(a, b)
SCRIPT = SCRIPT.replace("</script>", 'if (location.hash === "#down") $("nao").onclick();\n</script>', 1) if SCRIPT.count("</script>") == 1 else SCRIPT
SCRIPT += '''<style>.ck{display:block;margin-top:20px}cakto-upsell-accept::part(button){width:100%;min-height:60px;border:0;border-radius:var(--r);font:800 1.02rem var(--font);color:#fff;background:linear-gradient(180deg,#22c55e 0%,#15803d 100%);cursor:pointer;padding:12px 18px;animation:pulseG 1.7s infinite}cakto-upsell-reject{display:none}</style>
<script type="text/javascript" src="https://caktoscripts.nyc3.cdn.digitaloceanspaces.com/upsell.js"></script>
</body>
</html>
'''


def stepbar(n):
    segs = "".join(f'<i class="{"on" if i < n else ""}"></i>' for i in range(TOTAL))
    return f'<div class="stepbar"><div class="segs">{segs}</div><span class="lb">etapa {n} de {TOTAL}</span></div>'


def price(feat, nome, p, a, sub):
    return f'''<div class="price"><span class="feat">{feat}</span><div class="pt">{nome}</div>
    <div class="before">De US$ {a}</div><div class="arrow">↓</div><div class="val"><small>US$</small>{p}</div>
    <div class="pix">{sub}</div></div>'''


def cakto(oid, tipo, ok, rej, txt):
    return f'''<cakto-upsell-buttons class="ck"><cakto-upsell-accept id="{"sim" if tipo == "upsell" else "sim2"}" bg-color="#16a34aff" text-color="#ffffff"
    upsell-accept-url="{ok}" offer-id="{oid}" app-base-url="https://app.cakto.com.br" offer-type="{tipo}" upsell-reject-url="{rej}">{txt}</cakto-upsell-accept></cakto-upsell-buttons>'''


def pagina(pid, d):
    up, down, prox = LINKS[pid]
    here = BASE + "/sangre/" + pid + "/#down"
    uid, did = up.rsplit("/", 1)[1], down.rsplit("/", 1)[1]
    cfg = dict(id=pid, foto="", links=dict(up=up, down=down, prox=prox),
               firebase={"apiKey": "AIzaSyDbRQJkq7C_lBWa7QSf6bvhTaP_EFP8OUU", "authDomain": "canetinha-4bd2a.firebaseapp.com",
                         "projectId": "canetinha-4bd2a", "appId": "1:298345331983:web:06f6d8092fcbc3e1d5527a"})
    inc = "".join(f'<div class="it"><div>✅</div><div>{t}</div></div>' for t in d["inc"])
    dinc = "".join(f'<div class="it{" off" if ic == "❌" else ""}"><div>{ic}</div><div>{t}</div></div>' for ic, t in d["down_inc"])
    body = f"""
<div class="warn">No actualices ni cierres esta página. <b>Tu compra podría cobrarse dos veces.</b></div>

<!-- ===== UPSELL ===== -->
<div class="wrap" id="s1">
  {stepbar(d["etapa"])}
  <span class="paid">✅ Pago aprobado</span><span class="tipo"></span>
  <h1>{d["h1"]}</h1>
  {d["tsl"]}
  <div class="inc">{inc}</div>
  <div class="mock" id="mock"></div>
  <p class="bridge">{d["bridge"]}</p>
  {price("Solo en esta página", d["produto"], d["preco"], d["antes"], "pago único con la misma tarjeta · sin mensualidades")}
  {cakto(uid, "upsell", prox, here, d["sim"].format(p=d["preco"]))}
  <button class="no" id="nao" type="button">{d["nao"]}</button>
  <div class="guar"><div class="ic">🛡️</div><div><b>Los mismos 30 días de garantía</b><p>{d["garantia"].format(p=d["preco"])}</p></div></div>
  <p class="foot">{DISC}</p>
</div>

<!-- ===== DOWNSELL ===== -->
<div class="wrap" id="s2" hidden>
  {stepbar(d["etapa"])}
  <span class="paid">✅ Pago aprobado</span>
  <p class="lead">Tu protocolo sigue asegurado. El acceso ya llegó a tu correo.</p>
  <h1>{d["down_h1"]}</h1>
  {d["down_tsl"]}
  <div class="inc">{dinc}</div>
  {price("Última oportunidad", d["produto"], d["preco2"], d["antes2"], "pago único con la misma tarjeta")}
  {cakto(did, "downsell", prox, prox, d["sim2"].format(p=d["preco2"]))}
  <button class="no" id="nao2" type="button">{d["nao2"]}</button>
  <p class="foot">{DISC}</p>
  <p class="foot">Este sitio no está afiliado a Facebook ni a ninguna entidad de Facebook. No vendemos tu correo ni ninguna información a terceros.</p>
</div>
"""
    html = HEAD.replace("__TITULO__", d["titulo"]) + body + SCRIPT.replace("__CONFIG__", json.dumps(cfg, ensure_ascii=False, indent=2))
    out = SITE / pid / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    print("ok", out.relative_to(ROOT))


if __name__ == "__main__":
    for pid, d in PAGINAS.items():
        pagina(pid, d)
