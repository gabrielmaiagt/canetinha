#!/usr/bin/env python3
"""
Gera funil-canetinha.json a partir de ref/funil-original.json trocando a copy
do mecanismo "Mounjaro de Pobre" -> "Canetinha de Pobre (Truque das Famosas)".

Estrutura, IDs, variáveis ({{peso}}, {{altura}}, {{ideal}}, {{areasalvo}}) e
regras de IMC são preservadas. Só conteúdo textual e metadados mudam.

Uso:  python3 build_funil.py
"""
import json, re, copy

SRC = "ref/funil-original.json"
OUT = "funil-canetinha.json"

AVATAR = "[NOME DA AVATAR]"           # trocar pelo nome real
CRN = "[CRN]"                          # ou deixar vazio e remover a linha
CHECKOUT = "https://pay.wiapy.com/SEU_LINK"  # link do seu checkout
THEME = "#7c3aed"                      # roxo (canetinha); original era verde #16a34a
DOMAIN = "quiz.canetinhadepobre.com"
MANTER_PERGUNTA_AGUA = False           # True = mantém "água" na etapa 16 em vez de "fome"

# ---------- helpers de HTML no formato do editor (Quill) do InLead ----------
def h2(t):  return f'<h2 class="ql-align-center"><strong>{t}</strong></h2>'
def h3(t):  return f'<h3 class="ql-align-center"><strong>{t}</strong></h3>'
def sm(t):  return f'<p class="ql-align-center"><span class="ql-size-small">{t}</span></p>'
def p(t):   return f'<p class="ql-align-center">{t}</p>'
def red(t): return f'<strong style="color: rgb(220, 38, 38);">{t}</strong>'
def acc(t): return f'<strong style="color: {THEME};">{t}</strong>'
def b(t):   return f'<strong>{t}</strong>'
def br():   return "<br>"

# ---------- mapa: id da camada -> campos novos ----------
TEXT = {
    # etapa 1
    "2RLt14": {"label": "Descobrir o Truque"},
    "V7zJ3X": {"text": '<p class="ql-align-center"><strong class="ql-size-small" style="color: rgb(255, 255, 255);">🚨 Apenas 1 avaliação por pessoa</strong></p>'},
    # etapa 2-7
    "sxUnpF": {"text": h2("Quantos quilos você quer eliminar?")},
    "1H53td": {"text": h2("Qual é o seu tipo de corpo hoje?")},
    "llnqB5": {"text": h2("E em quais áreas você quer eliminar gordura?")},
    "NWyTDz": {"text": h2("Como o seu peso tem impactado na sua vida?")},
    "zcGRKg": {"text": h2("Você está feliz com sua aparência atualmente?")},
    "JsT1XF": {"text": h2("O que mais te impede de emagrecer?")},
    # etapa 8 — mecanismo
    "H7vRIz": {"text": h2("Você não precisa da canetinha.") + h2("Precisa do " + acc("truque") + " que ela usa.")
               + sm("A canetinha das famosas custa até R$ 3.000 por mês. O que ela faz é uma coisa só: "
                    "<strong>ligar o hormônio da saciedade</strong> — e isso dá pra fazer com um preparo de 5 minutos, com ingredientes de mercado.")},
    "boEk2y": {"text": p(b("A Canetinha de Pobre") + " liga o mesmo hormônio da saciedade que a caneta liga — sua fome diminui, "
                        "a compulsão some e você passa a comer menos " + b("sem esforço e sem passar vontade") +
                        ". É o Truque das Famosas, sem a agulha e sem os R$ 3.000.")},
    # etapa 9
    "snwdhY": {"text": h2("Quais desses benefícios você gostaria de ter?") + sm("Vamos personalizar o seu protocolo de acordo com o seu objetivo")},
    # etapa 10
    "NSwg5N": {"text": h3("Escute o áudio:")},
    "1uWdyh": {"text": h3("🔥 Histórias reais de quem fez o Truque das Famosas")},
    # etapa 11-13
    "qoXGHU": {"text": h2("Qual é o seu peso atual?") + sm("Quase lá! Vamos ajustar sua dose de acordo com o seu corpo")},
    "KmYCVx": {"text": h2("Qual é a sua altura?") + sm("Vamos calcular seu IMC")},
    "XaQJ5u": {"text": h2("E qual é o peso que você quer alcançar?")},
    # etapa 14-16
    "NHNn9q": {"text": h2("Como é o seu dia a dia?") + sm("Sua rotina define o melhor horário pra tomar")},
    "cLModm": {"text": h2("Quantas horas de sono você tem por noite?") + sm("Dormir pouco desliga o hormônio da saciedade e aumenta a fome no dia seguinte")},
    "LWU3sF": {"text": (h2("Quanto de água você bebe por dia?") + sm("Seu nível de hidratação também influencia na sua perda de peso"))
               if MANTER_PERGUNTA_AGUA else
               (h2("Em que momento do dia a fome mais te ataca?") + sm("Isso define o horário da sua Canetinha"))},
    # etapa 17 — diagnóstico
    "NbQ4pI": {"text": h3("⚠️ " + red("ATENÇÃO!") + " Pelas suas respostas e IMC, seu hormônio da saciedade está " + red("DESLIGADO"))},
    "dtXaLb": {"text": h3("Índice de Massa Corporal (IMC)")},
    "bxkAQG": {"text": p(b("⚠️ Sua fome pode estar te sabotando sem que você perceba!")) + p("<strong>Mesmo estando no peso normal</strong>, quando o hormônio da saciedade está desligado seu corpo pede comida o tempo todo, acumula gordura localizada e te deixa sem energia.")},
    "q1Dztq": {"text": p(b("⚠️ Sua fome está te sabotando sem que você perceba!")) + p("Seu IMC indicou <strong>sobrepeso</strong> — seu hormônio da saciedade está desligado, seu cérebro pede comida mesmo sem precisar e o corpo estoca tudo como gordura.")},
    "snqSiu": {"text": p(b("⚠️ Sua fome está te sabotando sem que você perceba!")) + p("Seu IMC indicou <strong>obesidade</strong> — seu hormônio da saciedade está desligado, você come sem sentir que comeu e o corpo estoca tudo como gordura.")},
    "ixC0kK": {"text": p(b("🚨 Alguns sinais de alerta:")) + p("❌ Fome pouco tempo depois de comer e vontade de beliscar à noite." + br() +
               "❌ Começar dieta e desistir em poucos dias porque \"a fome venceu\"." + br() +
               "❌ Acúmulo de gordura em áreas específicas, principalmente na barriga.")},
    "mRrruP": {"text": p(b("💡 É exatamente isso que a canetinha das famosas corrige — e a Canetinha de Pobre faz o mesmo, naturalmente!")) +
               p("A combinação certa de ingredientes liga o hormônio da saciedade, corta a compulsão e reduz a retenção." + br() +
                 "🔽 Descubra como o Truque das Famosas vai funcionar no seu corpo")},
    "EqC1zv": {"text": h3("A Canetinha de Pobre vai transformar seu corpo, igual fez com o da Rosane!")},
    "W1OeQW": {"label": "Gerar minha Canetinha"},
    # etapa 18 — loading
    "Narql9": {"title": "Analisando seu perfil de fome e saciedade"},
    "NcroZB": {"title": "Identificando metas e barreiras"},
    "b7ml51": {"title": "Preparando o seu Protocolo da Canetinha de Pobre"},
    # etapa 19
    "u9ZFOv": {"text": h2("Qual o tipo de corpo você quer ter?")},
    # etapa 20 — oferta
    "2jwqx0": {"text": h2("A sua Canetinha de Pobre foi gerada!") + sm("Ela é exclusiva e gerada só uma vez, não saia dessa página para não perdê-la")},
    "meWyUr": {"text": h3("Seu perfil:")},
    "rCNdaS": {"text": h3("Escute o áudio e veja o que vai receber:")},
    "BIwSwW": {"text": h3("Seu protocolo inclui:")},
    "6COkfq": {"title": "Canetinha de Pobre", "value": "R$ 37,90", "before": "de 87,90 por", "featured": "Protocolo Completo"},
    "o552li": {"title": "Canetinha de Pobre", "value": "R$ 37,90", "before": "de 87,90 por", "featured": "MAIS VENDIDO"},
    "MZxRMR": {"text": h3("Quem fez o truque tem resultado 😉👇")},
    "g8sN97": {"text": h3("Nos próximos 30 dias:")},
    "OGNQaD": {"text": p(b("🔴 Vagas disponíveis no momento: 7"))},
    "tJmxnI": {"text": h3("Todas as instruções e bônus em um aplicativo de fácil acesso 📲")},
    "7qPwY4": {"text": p(b(f"Protocolo gerado por: {AVATAR}")) + p(f"Nutricionista: {CRN}")},
    "b4ASbQ": {"text": "Sua Canetinha fica reservada por [time] minutos, após isso a página será apagada para dar espaço para novas avaliações!"},
    "c0r9BX": {"text": h3("Depoimentos")},
    "4bDq2L": {"text": h3("FAQ:")},
}
for bid in ("BGDhjq", "AehO7c", "kYshz4", "Sga3aP"):
    TEXT[bid] = {"label": "Quero a minha Canetinha de Pobre", "destination": CHECKOUT}

# opções (por id da camada) -> lista de (label, emoji|None)
OPTIONS = {
    "XweO1L": [  # etapa 7 — o que te impede (nova opção "fome" em 1º)
        ("Fome e compulsão<br>Começo a dieta e a fome vence, principalmente à noite", "😬"),
        ("Tempo<br>Rotina agitada, falta de tempo livre", "🕗"),
        ("Financeiro<br>Canetinha, nutri e academia custam caro demais", "💸"),
        ("Constância<br>Começo e paro, não consigo manter um plano", "😓"),
    ],
    "Xu96r4": [  # etapa 9 — benefícios
        ("Olhar no espelho e sentir bem consigo mesma, confiante", "🪞"),
        ("Parar de sentir vontade de beliscar e comer besteira", "🍫"),
        ("Poder usar qualquer roupa sem sentir vergonha ou sem marcar a barriga", "👙"),
        ("Receber elogios e perguntarem \"o que você fez pra emagrecer?\"", "🗣"),
        ("Ver seu parceiro te olhando com mais desejo", "🔥"),
        ("Poder correr, agachar, subir escadas ou viajar com conforto", "🦵"),
    ],
}
if not MANTER_PERGUNTA_AGUA:
    OPTIONS["hTgasj"] = [  # etapa 16 — fome
        ("De manhã, acordo com fome", "🌅"),
        ("À tarde, depois do almoço", "🕛"),
        ("À noite, depois do jantar", "🌙"),
        ("O dia inteiro, vivo beliscando", "🔁"),
    ]

QUOTES = {
    "29MacF": ["Eu já tinha tentado de tudo e sempre desistia porque a fome vencia. Quando comecei a Canetinha de Pobre, em 3 dias eu percebi que não tava mais pensando em comida o dia inteiro. Perdi 17kg em 2 meses sem passar fome e sem gastar com caneta nenhuma. Minha compulsão simplesmente sumiu..."],
    "HduzQx": ["Já se foram mais de 15kg tomando todo dia de manhã. O que mais me impressionou foi a fome: eu era escrava de doce depois do almoço e isso simplesmente parou. Me sinto muito mais LEVE. Agradeço às meninas do grupo que me ajudaram 🥰"],
    "1iA6VJ": [
        "Muito bom! Recomendo, minha fome sumiu e já perdi 5kg nos últimos 17 dias.",
        "Recomendo muito. estou usando tem 2 semanas e não sinto mais aquela vontade de doce depois do almoço, perdi peso e desinchei bastante! obrigada!! 🥰🥰",
        "Oiii comprei hoje uma amiga me indicou...estou com uma dúvida. eu posso tomar mais de uma vez ao dia se eu quiser? 😅",
        "gente é sério que isso é o que as famosas fazem? kkk baratinho e funcional",
    ],
}

ARGUMENTS = {
    "heXZRC": [
        ("A Receita da Canetinha de Pobre", "O preparo exato, os ingredientes de mercado e a dose certa pro seu peso pra ligar o hormônio da saciedade já no primeiro dia."),
        ("O Truque das Famosas", "O que a nutricionista das famosas faz junto com a caneta (e que ninguém conta) pra potencializar o efeito — sem a caneta."),
        ("Definição de metas diárias", "Para você acompanhar seus resultados todos os dias e se manter no caminho certo."),
        ("Anti Efeito Sanfona", "Programa pra manter o peso depois que sair da Canetinha e nunca mais voltar a engordar."),
        ("Desafio de 21 dias", "Desafio pra maximizar ainda mais seus resultados."),
        ("Grupo VIP + Acompanhamento", "Com todas as outras meninas pra se motivar, postar resultados e tirar dúvidas."),
    ],
    "OuVVy7": [(
        "Já parou pra pensar o quanto gastou até hoje tentando emagrecer?",
        "👨‍⚕️ Consultas + exames R$ 500<br>🏋️ Academia + personal R$ 400<br>🥗 Dietas + suplementos R$ 450<br>"
        "💉 <strong>Canetinha das famosas R$ 3.000/mês</strong><br>💜 <strong>Canetinha de Pobre R$ 37,90</strong><br>"
        "Pelo preço de uma pizza você faz o mesmo truque que as famosas fazem, sem agulha, sem receita e com resultado já nos primeiros dias."
    )],
    "xdVA90": [(
        "Garantia de Reembolso",
        "⭐⭐⭐⭐⭐<br>Todo produto é obrigado a oferecer no mínimo 7 dias de garantia, porém confiamos tanto no Truque que oferecemos 30 dias corridos.<br>"
        "Ou seja, se você não sentir a fome diminuir ou não perder 1kg sequer no primeiro mês de uso, nós reembolsaremos cada centavo que você pagou, sem questionar.<br>"
        "Basta enviar um e-mail para o suporte ou pedir direto pelo aplicativo!"
    )],
}

GRAPHICS = {
    "b3mmJj": ["Hoje: fome o dia todo, compulsão à noite", "1ª semana: hormônio da saciedade ligado, para de beliscar", "2ª semana: comendo menos sem esforço e desinchando"],
    "3GZecb": ["3ª semana: compulsão zerada e roupas folgando", "4ª semana: até 10kg a menos e barriga visivelmente menor"],
}

FAQ = [
    ("Isso é a mesma coisa que a canetinha?", "Não. A canetinha é um remédio injetável de uso controlado. A Canetinha de Pobre é um preparo natural que estimula o mesmo hormônio da saciedade — sem agulha, sem receita e sem os efeitos colaterais da caneta."),
    ("Sou gestante ou estou amamentando, posso tomar?", "Lactantes só podem consumir se o bebê tiver mais de 6 meses. Gestantes não é recomendado."),
    ("Sou hipertensa, posso tomar?", "Sim, no app terá as instruções certas de como consumir se você tem pressão alta."),
    ("Em quanto tempo vejo os resultados?", "Varia de pessoa pra pessoa, mas a diminuição da fome costuma ser sentida nos primeiros 3 dias e o peso na primeira semana."),
    ("Tem efeito colateral?", "É composta por ingredientes 100% naturais, mas na primeira semana pode causar leve dor de cabeça e aumento das idas ao banheiro."),
    ("Tenho que tomar todos os dias?", "Sim, a Canetinha de Pobre deve ser consumida todos os dias, no horário indicado no seu protocolo, até atingir o objetivo desejado."),
    ("Como tenho acesso ao aplicativo?", "O acesso será enviado ao e-mail cadastrado no ato da compra."),
    ("O site é seguro?", "Sim, o pagamento é processado por uma das maiores plataformas de pagamento digital do Brasil, com nota máxima no Reclame Aqui.<br>CNPJ: [CNPJ DA PLATAFORMA]."),
]

AUDIO_SENDER = AVATAR

# ---------- aplica ----------
f = json.load(open(SRC, encoding="utf-8"))
f["title"] = "Canetinha de Pobre"
f["slug"] = "canetinhadepobre"
f["domain"] = DOMAIN
f["design"]["themeColor"] = THEME
f["design"]["logo"]["src"] = "[UPLOAD: logo-canetinha-de-pobre.png]"
# scripts de pixel: manter estrutura, trocar pixelId
f["scripts"] = {"header": "[UTMIFY PIXEL — trocar pixelId]", "footer": "[UTMIFY UTMS SCRIPT]"}

def arg_html(title, body):
    return f'<p class="ql-align-center"><strong>{title}</strong></p><p class="ql-align-center">{body}</p>'

for step in f["steps"]:
    for L in step["layers"]:
        lid, c = L["id"], L.get("content", {})
        if lid in TEXT:
            c.update(TEXT[lid])
        if lid in OPTIONS:
            new = []
            for i, (label, emoji) in enumerate(OPTIONS[lid]):
                base = copy.deepcopy(c["options"][min(i, len(c["options"]) - 1)])
                base["label"] = label
                if emoji is not None:
                    base["image"] = {"type": "emoji", "src": emoji}
                new.append(base)
            c["options"] = new
        if lid in QUOTES:
            for q, txt in zip(c["quotes"], QUOTES[lid]):
                q["text"] = txt
        if lid in ARGUMENTS:
            for a, (t, body) in zip(c["arguments"], ARGUMENTS[lid]):
                a["text"] = arg_html(t, body)
        if lid in GRAPHICS:
            for g, legend in zip(c["graphics"], GRAPHICS[lid]):
                g["legend"] = legend
        if L["type"] == "faq":
            for q, (question, answer) in zip(c["questions"], FAQ):
                q["question"], q["answer"] = question, answer
        if L["type"] == "audio":
            c["sender"] = AUDIO_SENDER
            c["audio"]["src"] = "[UPLOAD: audio-" + lid + ".mp3]"
            c["image"]["src"] = "[UPLOAD: avatar-redondo.png]"

# marca todas as imagens/gifs do original pra substituição (não reutilizar mídia de terceiros)
s = json.dumps(f, ensure_ascii=False)
s = re.sub(r"https://media\.inlead\.cloud/[^\"]+", lambda m: "[SUBSTITUIR: " + m.group(0).split("/")[-1] + "]", s)
# qualquer "Mounjaro" residual
s = s.replace("Mounjaro de Pobre", "Canetinha de Pobre").replace("mounjaro de pobre", "Canetinha de Pobre").replace("Mounjaro", "Canetinha")
f = json.loads(s)

json.dump(f, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
left = re.findall(r"[Mm]ounjaro", json.dumps(f, ensure_ascii=False))
print(f"OK -> {OUT}  ({len(f['steps'])} etapas)  'mounjaro' restantes: {len(left)}")
