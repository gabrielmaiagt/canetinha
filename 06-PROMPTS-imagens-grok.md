# Prompts de imagem (Grok Imagine) — Canetinha de Pobre

Cada item tem: **arquivo** (nome que entra no `CONFIG.assets` do `site/index.html`), **proporção**, **prompt** (em inglês — os modelos de imagem respondem melhor; o texto em português que precisa aparecer na arte está marcado). Recomendação geral: **gerar sem texto e colocar o texto no Canva** — modelo de imagem erra acento e letra. Onde o texto é essencial, eu deixo as duas opções.

## Como manter a mesma modelo em todas as fotos (importante)

1. Gere primeiro a **FOTO BASE** (item C0).
2. Para todas as variações, use **Editar imagem / imagem-de-referência** no Grok com a base anexada e comece o prompt com: *"Same woman, same room, same outfit, same camera angle and lighting as the reference. Only change: …"*
3. Cole sempre o bloco **PERSONAGEM** abaixo no prompt (mesmo com referência — reforça).
4. Gere 4 variações por prompt e escolha a mais parecida com a base. Descarte qualquer uma que mude rosto/cabelo/roupa.

**PERSONAGEM (colar em todo prompt do grupo C):**
> Brazilian woman, 34 years old, medium-brown skin, dark brown hair tied in a high messy bun, no makeup, natural friendly face, small gold hoop earrings. Wearing a black sports bra with a small purple pen-shaped logo print on the chest, black high-waist leggings, barefoot. Taking a mirror selfie with a black iPhone held at chest height, phone partly covering her face is NOT allowed — face fully visible. Setting: full-length mirror leaning on a white wall in a simple Brazilian bedroom, light wooden floor, soft daylight from a window on the left, a bit of a bed with white sheets visible at the edge. Shot on phone, realistic, slightly imperfect, no filters, 4:5 vertical.

**Identidade visual fixa:** roxo `#7c3aed`, lilás `#f4eeff`, branco. Logo = ícone de caneta injetora estilizada em roxo. Bebida = copo transparente com líquido rosa-arroxeado (hibisco/beterraba), gelo, rodela de limão. *(Ajuste a cor/ingredientes da bebida pro que a receita real usa.)*

---

## A. IDENTIDADE E AVATAR (a nutricionista)

**PERSONAGEM-AVATAR (colar em todo prompt do grupo A):**
> Brazilian woman nutritionist, 38 years old, light-brown skin, long straight honey-blonde hair with dark roots, warm confident smile, light natural makeup, white lab coat over a lilac blouse, small silver necklace. Photorealistic, editorial lighting, high detail.

| # | Arquivo | Prop. | Prompt |
|---|---|---|---|
| A1 | `avatarRedondo` (header IG, players de áudio, selo) | 1:1 | PERSONAGEM-AVATAR. Close-up headshot, shoulders up, looking at camera, soft smile, plain light-lilac background, shallow depth of field, Instagram profile picture style. |
| A2 | `avatarFoto` (hero) | 3:4 | PERSONAGEM-AVATAR. Three-quarter body, arms crossed confidently, standing, isolated on a pure white background for cutout, studio lighting, full lab coat visible. |
| A3 | `avatarSentada` (selo "Protocolo gerado por") | 3:4 | PERSONAGEM-AVATAR. Sitting at a modern nutrition clinic desk, hands clasped on the desk, smiling at camera, laptop and a glass of pink-purple drink with lemon on the desk, blurred clinic background with plants, natural window light. |
| A4 | `avatarBebida` (etapa 8 / oferta) | 3:4 | PERSONAGEM-AVATAR. Holding up a clear glass of pink-purple homemade drink with ice and a lemon slice toward the camera, kitchen background with fresh ingredients on the counter (lemon, ginger, hibiscus flowers, cinnamon sticks), bright and clean. |
| A5 | `avatarWhats` (opcional, print de conversa) | 1:1 | PERSONAGEM-AVATAR. Casual selfie at home, no lab coat, lilac t-shirt, smiling, slightly from above, phone-camera quality. |
| A6 | `bebidaProduto` | 1:1 | Product photo: a tall clear glass filled with a vibrant pink-purple homemade drink, ice cubes, one lemon slice on the rim, a purple reusable straw. Next to it a small purple insulin-pen-shaped stirrer. Clean white marble counter, soft morning light, minimal, high-end beverage advertising style, no text. |
| A7 | `bebidaIngredientes` | 4:3 | Top-down flat lay on white marble: a clear glass of pink-purple drink in the center surrounded by fresh ingredients — halved lemon, fresh ginger root, dried hibiscus flowers, cinnamon sticks, a small bowl of chia seeds, mint leaves. Bright, clean, editorial food photography, no text. |
| A8 | `logoIcone` | 1:1 | Minimal flat vector logo icon: a stylized insulin pen injector drawn with two rounded strokes, tilted 45 degrees, solid purple (#7c3aed) on transparent/white background, no text, no gradient, no shadow, app-icon style, centered. |
| A9 | `logoHorizontal` (tentativa com texto) | 3:1 | Wordmark logo on white background: the text "Canetinha" in bold black modern sans-serif and "de Pobre" in bold purple (#7c3aed) right after it, with a small purple insulin-pen icon on the left. Flat vector, clean, no extra elements. *(Se errar as letras, use o A8 e escreva o texto no Canva com a fonte Plus Jakarta Sans ExtraBold.)* |
| A10 | `capaPerfilIG` (opcional) | 1:1 | Instagram highlight cover: purple (#7c3aed) circle background with a white line icon of an insulin pen in the center, minimal, flat. *(Gerar mais 3 variações com ícones: copo com canudo, balança, coração.)* |

---

## B. HERO (etapa 1 — montar no Canva)

O hero é uma composição: fundo + avatar A2 + antes/depois (C-antes + C-depois) + headline. Gere só o fundo:

| # | Arquivo | Prop. | Prompt |
|---|---|---|---|
| B1 | `heroFundo` | 4:3 | Dark moody background: close-up of a clear glass with pink-purple hibiscus drink and ice on a dark slate surface, dried hibiscus petals and lemon slices scattered around, dramatic side lighting, deep purple and black tones, empty space on the left third for text overlay, no text. |
| B2 | `heroAntes` / `heroDepois` | 3:4 | Use as fotos C3 (Acima do peso) e C10 (Seca) — mesma mulher. |

Texto pra colocar no Canva: **ELIMINE ATÉ 10KG EM 30 DIAS** / *sem canetinha, sem passar fome* / selo: **O TRUQUE DAS FAMOSAS — CANETINHA DE POBRE**.

---

## C. A MODELO — cards das perguntas e diagnóstico (mesma mulher em tudo)

### C0 — FOTO BASE (gerar primeiro, salvar como referência)
> PERSONAGEM. Standing straight facing the mirror, relaxed, slight smile, body type: slightly overweight, soft belly, curvy hips and thighs, natural. Full body from head to feet visible in the mirror. This is the master reference image.

### Tipo de corpo (etapa 3) — `corpoMedio`, `corpoPlus`, `corpoAcima`, `corpoSobrepeso` — 4:5
Use referência C0 + "Same woman, same room, same outfit, same pose and framing as the reference. Only change her body type to:"
| # | Arquivo | Complemento |
|---|---|---|
| C1 | `corpoMedio` | …average build, flat-ish stomach, no visible muscle definition, normal healthy weight. |
| C2 | `corpoPlus` | …plus-size, large soft belly and wide hips, heavy arms and thighs, clearly obese, the sports bra is now a black v-neck t-shirt with the same small purple logo. |
| C3 | `corpoAcima` | …noticeably overweight, round belly hanging over the leggings waistband, thick thighs, full arms. |
| C4 | `corpoSobrepeso` | …a bit overweight, soft belly, love handles visible at the sides, curvy. |

### Áreas alvo (etapa 4) — marcação vermelha, 4:3 — base = C3 (acima do peso)
Use referência C3 + "Same image as the reference. Add a semi-transparent red highlight overlay and a small red arrow pointing to:"
| # | Arquivo | Complemento |
|---|---|---|
| C5 | `areaCulotes` | …the love handles / sides of her waist. Frame from chest to knees. |
| C6 | `areaBracos` | …her upper arms. Frame from head to waist. |
| C7 | `areaBarriga` | …her belly. Frame from chest to thighs. |
| C8 | `areaCoxas` | …both thighs, red outline around each thigh. Frame from waist to feet. |
| C9 | `areaGluteos` | …her buttocks — for this one she is turned sideways/back to the mirror looking over her shoulder at the phone. Red glow on the glutes. |
| C9b | `areaCorpoTodo` | …a thin red outline around the whole silhouette, full body. |

### Corpo que quer ter (etapa 19) e "depois" do diagnóstico — 4:5
Use referência C0 + "Same woman, same room, same outfit, same pose. Only change her body to:"
| # | Arquivo | Complemento |
|---|---|---|
| C10 | `depoisSeca` ("Em Forma" + diagnóstico) | …lean and toned, flat defined stomach, visible waist, toned arms, athletic but feminine, confident smile. |
| C11 | `depoisNatural` ("Natural") | …slim and healthy, flat stomach without muscle definition, soft natural curves, relaxed smile. |
| C12 | `depoisFirme` (opcional) | …slim with firm round glutes and toned thighs, slight side pose to show the shape. |

### Antes/depois por tipo de corpo (etapa 10 — `depoimentoPorCorpo`)
Não precisa gerar: monte no Canva pares **C1→C11, C4→C11, C3→C10, C2→C10** lado a lado com "Dia 01 / Dia 30" e "-Xkg".

### Idade (opcional — se adicionar a pergunta do Paizão) — `idade1829`, `idade3039`, `idade4049`, `idade50` — 4:5
> Brazilian woman, [24 / 35 / 45 / 56] years old, [descrição varia: long dark wavy hair / straight brown hair shoulder length / short dark hair with a few grey strands / silver-grey bob], warm smile, wearing a purple (#7c3aed) sports tank top with a small white pen logo on the chest, arms relaxed, waist-up, isolated on a plain lilac (#f4eeff) background, soft studio light, photorealistic.

---

## D. PROVA SOCIAL — antes/depois e prints

> ⚠️ Antes/depois gerado por IA apresentado como cliente real é o item que mais derruba conta no Meta e o mais fácil de virar denúncia. Recomendo: usar IA para o **diagnóstico** (é "você", ilustrativo) e para os **cards**, e usar **fotos reais de alunas** (com autorização) nos depoimentos assim que tiver. Enquanto não tem, os prompts abaixo servem de placeholder.

### D1–D12 — 12 pares antes/depois de mulheres diferentes — 4:5 cada, gerar antes e depois com referência
Prompt do ANTES (varie a pessoa a cada item):
> Realistic phone mirror selfie of a Brazilian woman, [idade] years old, [cabelo/pele], overweight with a soft round belly, wearing [roupa], standing in a [cenário], holding a [cor] phone, casual, slightly blurry phone-camera quality, natural indoor light, no filters, no text.

Prompt do DEPOIS (com o ANTES como referência):
> Same woman, same room, same outfit and phone, same pose. Only change: she is now visibly slimmer, flat stomach, slimmer arms and thighs, clothes looser, confident smile.

Variações (uma por par):
| # | idade | cabelo/pele | roupa | cenário | phone |
|---|---|---|---|---|---|
| D1 | 29 | black curly hair, dark skin | black sports bra and jeans shorts | bathroom with white tiles | pink |
| D2 | 41 | straight dark hair, medium skin, glasses | grey tank top and black leggings | bedroom with wardrobe | black |
| D3 | 35 | long dyed red hair, light skin | black bikini top and shorts | living room with sofa | white |
| D4 | 47 | short brown hair, medium skin | pink t-shirt and blue jeans | kitchen | black |
| D5 | 26 | long brown hair in ponytail, light-brown skin | camouflage leggings and black top | bedroom mirror | yellow |
| D6 | 38 | dark hair in bun, dark skin | teal shorts and black top | bathroom | purple |
| D7 | 52 | blonde shoulder-length hair, light skin | floral blouse and jeans | living room | black |
| D8 | 31 | long straight black hair, medium skin | orange shorts and grey top | corridor with tiles | black |
| D9 | 44 | brown wavy hair, light-brown skin | green underwear set (back view, over-the-shoulder) | bedroom | white |
| D10 | 33 | dark hair, medium skin, tattoos on arm | grey sports bra and plaid pajama pants | bedroom door | black |
| D11 | 28 | long light-brown hair, light skin | blue jeans shorts and white crop top | hallway mirror | pink |
| D12 | 39 | curly dark hair, dark skin | black leggings and purple top | gym-style room | black |

### D13 — Fotos "segurando a calça larga" (2) — 4:5
> Realistic phone photo, Brazilian woman [30/45] years old, standing, pulling the waistband of her old jeans away from her now-slim waist to show how loose they became, big proud smile, bedroom background, phone-camera quality, no text.

### D14 — Fotos pros prints de WhatsApp / feed do grupo (6) — 4:5
> Realistic candid phone photo shared in a WhatsApp group: Brazilian woman [idade] holding a glass of pink-purple drink in her kitchen in the morning, [pijama / work clothes], smiling, natural messy home background, slightly overexposed phone-camera look, no text.
Monte os prints no Canva (template de chat WhatsApp) ou num gerador de fake chat, com os textos do doc 04 (seção 2.3) adaptados: "Olha gente em 7 dias de Canetinha", "Do 44 pro 38", "a calça que não fechava entrou de novo".

### D15 — Avatares dos depoimentos escritos (6) — 1:1
> Low-resolution casual selfie profile picture of a Brazilian woman, [idade], [descrição], smiling, [at the beach / at home / in a car / with a child, face of child not visible], phone-camera quality, slightly compressed like a social media avatar, no text.

---

## E. LOADING (etapa 18) — prints do feed do app/grupo (3)

Monte no Canva sobre a UI do nosso app (roxo): foto + nome + "há 12 minutos" + texto + curtidas. Fotos: use os pares D1, D5 e D9. Textos:
- **tailane / "Camila R."**: "eu já tinha desistido de emagrecer porque a fome sempre vencia. com a canetinha de pobre em 3 dias eu parei de beliscar à noite e em 4 semanas foram 6kg. o truque é real gente 💜"
- **"Renata M."**: "Foram 11kg embora com a Canetinha de Pobre. Eu chorei vendo meu antes e depois. Não foi dieta maluca, foi a fome que sumiu. Minha filha disse que a mãe dela tá outra. Obrigada, meninas."
- **"Luana D."**: "Comecei sem acreditar porque já tinha tentado de tudo. Em 4 semanas a calça que não fechava entrou de novo. 8kg a menos e não me escondo mais em foto. Melhor decisão que tomei."

---

## F. OFERTA (etapa 20)

### Argumentos "Seu protocolo inclui" (6) — 370×261 (≈ 4:3 landscape), estilo consistente
Estilo base pra todos: *"Flat illustration, soft lilac (#f4eeff) background, purple (#7c3aed) and white palette with small warm accents, clean vector style, centered composition, no text."*
| # | Arquivo | Prompt |
|---|---|---|
| F1 | `argumentos[0]` Receita | …a woman happily holding a glass of pink-purple drink, next to a recipe card and fresh ingredients (lemon, ginger, hibiscus). |
| F2 | `argumentos[1]` Truque das Famosas | …a glamorous woman with sunglasses behind a velvet rope, whispering a secret to a friend, sparkles. |
| F3 | `argumentos[2]` Metas diárias | …a clipboard checklist with checkmarks and a target with an arrow in the bullseye. |
| F4 | `argumentos[3]` Anti-sanfona | …a bathroom scale with a lock icon on it and a flat steady line graph, meaning "weight stays stable". |
| F5 | `argumentos[4]` Desafio 21 dias | …a calendar page with "21" big in the center and a purple ribbon badge. *(o número pode sair errado — se sair, faça no Canva)* |
| F6 | `argumentos[5]` Grupo VIP + acompanhamento | …a group of four diverse women in a phone chat bubble with hearts and a headset icon. |

### App e mockups
| # | Arquivo | Prop. | Prompt |
|---|---|---|---|
| F7 | `appPrint` | 9:16 | Faça a UI no Canva/Figma (tema roxo, abas Comunidade / Conteúdo / Programas com os cards F1–F6). Se quiser gerar: *"Clean mobile app UI screenshot, purple (#7c3aed) and white theme, top logo of an insulin pen, sections labeled with cards showing a drink recipe, a checklist, a 21-day calendar and a chat group, bottom navigation with 4 icons, iOS style, realistic phone screen, no real text (use placeholder lines)."* |
| F8 | `mockupCelular` (2) | 4:5 | Photorealistic iPhone floating at a slight angle on a lilac (#f4eeff) background, screen showing a purple-themed health app with a drink recipe card and a daily checklist, soft shadow, product render style, no readable text. |
| F9 | `gifIMC*` (3 stills → animar no Canva) | 16:9 | Flat illustration, light green-to-lilac gradient card: on the left a woman in a green sports outfit with a soft round belly, on the right the same woman slim and toned, three chevrons ">>>" between them in white, header space at the top for two labels, no text. *(Gere 3 versões: leve / média / obesa no lado esquerdo.)* |
| F10 | `seloGarantia30` | 1:1 | Gold and dark-navy circular guarantee badge with a laurel wreath, a big "30" in the center and a ribbon at the bottom, glossy, isolated on transparent/white background. *(texto "DIAS DE GARANTIA" no Canva)* |
| F11 | `selosPagamento` | 8:1 | Use os oficiais (Pix, Visa, Mastercard, Google Pay, SSL) — não gerar. |

### Checkout — banner 1881×336 (≈ 5.6:1) — montar no Canva
| # | Arquivo | Prompt do fundo |
|---|---|---|
| F12 | `checkoutBanner` | Wide dark-purple gradient banner background (#2a1257 to #7c3aed), a clear glass of pink-purple drink with ice on the right edge with a soft glow, subtle sparkles, lots of empty space on the left for text, no text. Depois, no Canva: headline "ELIMINE ATÉ 10KG EM 30 DIAS — com a Canetinha de Pobre", 4 pills (Desliga a fome · Zera a compulsão · Seca gordura localizada · Sem agulha, sem receita), e um trio C3 → C4 → C10 com "90kg / 75kg / 60kg". |
| F13 | `bumpShots` (order bump) | 1:1 | Product photo of three small shot glasses in a row filled with pink, purple and green drinks, on a dark slate surface with a slice of lemon and mint, moody side light, "night routine" feel, no text. |

---

## G. ETAPA 8 — "Como funciona" (montar no Canva com 4 ícones)
Estilo: *"Flat vector icon, purple (#7c3aed) on white, rounded strokes, minimal, no text, centered, 1:1."*
| # | Arquivo | Prompt |
|---|---|---|
| G1 | `icoVoce` | …a sad woman with a soft belly, thought bubble with a burger and a slice of cake. |
| G2 | `icoCanetinha` | …a glass of drink with a straw next to a lemon, ginger and hibiscus flower. |
| G3 | `icoSaciedade` | …a stomach outline with a padlock closed and a small "off" toggle switched to "on". |
| G4 | `icoObjetivo` | …a slim woman silhouette with a checkmark and a small flag. |

Alternativa (imagem única, 1:1, como o do Mounjaro): *"Infographic in flat illustration style on white background, four steps arranged in a circle connected by curved purple arrows: (1) a sad overweight woman, (2) a glass of pink-purple drink, (3) a stomach with a closed padlock, (4) a slim happy woman. Purple (#7c3aed) accents, no text."* — texto ("COMO A CANETINHA DE POBRE FUNCIONA", "Você", "Canetinha pronta", "Saciedade LIGADA", "Seu objetivo") no Canva.

---

## H. Checklist de produção (ordem)
1. C0 base → C1–C12 (o coração do funil)
2. A1, A2, A6 (header, hero, bebida)
3. B1 + montar hero
4. D1–D6 (6 pares já dão os 2 carrosséis iniciais) + D15 avatares
5. F1–F6, F10, F9
6. E (prints do loading) e D14 (prints WhatsApp)
7. F7/F8 app, F12 checkout, F13 bump
8. G ícones

Exportar tudo em **WebP**, cards 800×1000, thumbs 740×522, avatar 400×400. Nome do arquivo = chave do `CONFIG.assets`.
