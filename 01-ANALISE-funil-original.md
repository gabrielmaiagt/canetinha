# Análise completa — Funil "Mounjaro de Pobre"

URL: https://quiz.mounjarodepobreon.com/
Extraído em 21/09/2026 (JSON do funil descriptografado do InLead — cópia em `ref/funil-original.json`).

---

## 1. Stack técnica

| Peça | O que é |
|---|---|
| Builder do quiz | **InLead** (inlead.digital) — funil id `119839`, hash `iMnUz7`, slug `mounjarodepobreon`, schema v2 |
| Domínio | `quiz.mounjarodepobreon.com` (custom domain apontado pro InLead) |
| Rastreamento | **UTMify** pixel (`pixelId 6a1795721bcd6702f0915d99`) no header + script de UTMs no footer (`prevent-xcod-sck`, `prevent-subids`) |
| Checkout | **Wiapy** (`pay.wiapy.com/f8lnICyM4k`) — vendedor "Equipe Saúde Máxima" |
| Pagamento | Pix / Cartão / Google Pay — **R$ 37,90 à vista** |
| Order bump | "Shots Acelerador de Intestino" — R$ 9,90 ("elimine mais de 1kg de gordura pelas fezes ingerindo esses shots antes do almoço") |
| Entrega | App com conteúdo (Comunidade / Conteúdo / Programas) — acesso enviado por e-mail |
| Mídia | 73 assets em `media.inlead.cloud` (lista em `ref/assets-originais.txt`) |
| Áudios | 3 áudios "WhatsApp" da avatar (Fabiana) — etapas 10, 20 (topo) e 20 (fim) |

**Design tokens do InLead:** tema `#16a34a` (verde), título `#030712`, conteúdo `#6b7280`, fundo `#fff`, fonte Inter, `rounded-2xl`, container `max-w-[28rem]`, botão 56px, barra de progresso `default`.

---

## 2. Arquitetura do funil (20 etapas, 100% linear)

Não há branching. Toda navegação é `next`. A única "personalização" é feita por **regras de visibilidade** (`roles`) baseadas no IMC calculado (`calc({{peso}}/(({{altura}}/100)^2))`) e por **variáveis** injetadas na página de oferta (`{{peso}}`, `{{altura}}`, `{{ideal}}`, `{{areasalvo}}`).

```
FASE 1 — GANCHO / COMPROMISSO
 01 lead              Hero (antes/depois + "Elimine até 10kg em 30 dias") + CTA + escassez "1 consulta por pessoa"
 02 objetivo          Quantos kg quer eliminar? (4 op.)
 03 seu corpo         Tipo de corpo (4 op. c/ silhueta)
 04 áreas alvo        Onde quer eliminar gordura (6 op. multi)

FASE 2 — DOR / AGITAÇÃO
 05 impacto na vida   Como o peso impacta sua vida (5 op.)
 06 feliz?            Está feliz com a aparência (2 op.)
 07 o que te impede   Barreira principal (4 op.: tempo / autocontrole / financeiro / constância)

FASE 3 — MECANISMO + PROVA
 08 como funciona     Explica o mecanismo (infográfico circular) + "20 min/dia"
 09 benefícios        Benefícios desejados (6 op. multi) — "vamos personalizar"
 10 depoimento        Áudio WhatsApp da nutri + foto antes/depois + depoimento escrito (17kg em 2 meses)

FASE 4 — DADOS (IMC) — gera "autoridade" do diagnóstico
 11 peso              Slider peso
 12 altura            Slider altura ("vamos calcular seu IMC")
 13 peso ideal        Slider peso desejado
 14 dia a dia         Rotina (4 op.)
 15 sono              Horas de sono (4 op.)
 16 água              Água por dia (4 op.)

FASE 5 — DIAGNÓSTICO (o "susto")
 17 perfil            "⚠️ ATENÇÃO! seu corpo está no modo ACÚMULO DE GORDURA" + barra de IMC condicional +
                      alertas por faixa + sinais de alerta + ponte pro mecanismo + depoimento Rosane (15kg)
                      CTA "Gerar meu Protocolo"

FASE 6 — TRANSIÇÃO
 18 carregando        3 loadings sequenciais (2s cada) + carrossel antes/depois autoplay
 19 corpo que quer    Última micro-escolha (Em Forma / Natural) — reengaja antes da oferta

FASE 7 — OFERTA (página longa)
 20 oferta            ver seção 4
```

---

## 3. Copy etapa por etapa (original)

### 01 — lead
- Imagem hero: chá de hibisco + avatar "Dra. Fabiana Santos" + "ELIMINE ATÉ 10KG DE GORDURA EM 30 DIAS — NOVA RECEITA DO MOUNJARO DE POBRE" + antes/depois espelho.
- Botão verde pulsando: **"Começar o Teste"**
- Alerta vermelho pequeno: **"🚨 Apenas 1 consulta por pessoa"**

### 02 — objetivo
"Quantos quilos você quer eliminar?" → Até 5 kg / de 6 a 10 kg / de 11 a 19 kg / 20kg ou mais (grid 2 col, ícone de balança)

### 03 — seu corpo
"Qual é o seu tipo de corpo?" → Médio / Plus size / Acima do peso / Sobrepeso (silhuetas)

### 04 — áreas alvo (multi + botão Continuar) — variável `areasalvo`
"E em quais áreas você quer eliminar gordura?" → Culotes / Braços / Barriga / Coxas / Glúteos / Corpo Todo

### 05 — impacto
"Como o seu peso tem impactado na sua vida?"
🪞 autoestima baixa · ⚡ cansado(a) sem energia · 🩺 complicações de saúde (pressão, dores, exames) · ❤️ afeta vida íntima · Nenhuma das acima

### 06 — feliz?
"Você está feliz com sua aparência atualmente?"
😪 Não, quero emagrecer para me sentir melhor · 🙂‍↕️ Sim, mas sei que posso melhorar mais

### 07 — o que te impede
"O que mais te impede de emagrecer?"
🕗 **Tempo** — rotina agitada · 😬 **Autocontrole** — dificuldade em controlar a fome/tentações · 💸 **Financeiro** — ser saudável custa caro · 😓 **Constância** — não saber por onde começar / sem motivação

### 08 — como funciona (o MECANISMO)
> **O nosso protocolo age na CAUSA PRINCIPAL do ganho de peso!**
> Com 20 minutos por dia você consegue preparar tudo e começar a emagrecer logo nos primeiros dias
>
> [infográfico circular: Você → Mounjaro pronto (xícara de chá) → Ativação da queima de gordura → Seu objetivo]
>
> O Mounjaro de Pobre acelera seu metabolismo, colocando ele para trabalhar 24 horas por dia para queimar gordura mesmo enquanto você dorme.

Mecanismo original = **bebida caseira (chá) que "acelera o metabolismo 24h"**. Claim: queima gordura dormindo.

### 09 — benefícios (multi)
"Quais desses benefícios você gostaria de ter? — Vamos personalizar o seu plano de acordo com o seu objetivo"
🪞 olhar no espelho e se sentir confiante · ⚡ energia · 👙 usar qualquer roupa sem marcar a barriga · 🗣 receber elogios / perguntarem o que você fez · 🔥 parceiro te olhando com mais desejo · 🦵 correr, agachar, subir escada, viajar com conforto

### 10 — depoimento
"Escute o áudio:" → player estilo WhatsApp, remetente **Fabiana Santos** (áudio 1)
"🔥 Histórias Reais de Transformação!" + foto antes/depois
Depoimento (5★, 📍 Salvador-BA): *"Eu já tentei todo tipo de dieta e não conseguia emagrecer de jeito nenhum. Comecei a colocar o mounjaro de pobre na minha rotina e consegui perder 17kg em 2 meses sem mudar nada na minha alimentação! Minha fome e minha compulsão diminuiram muito..."*

### 11 / 12 / 13 — peso, altura, peso ideal
- "Qual é o seu peso atual? — Quase lá! Vamos ajustar seu plano de acordo com seu corpo" (slider, default 70)
- "Qual é a sua altura? — Vamos calcular seu IMC" (slider, default 180)
- "E qual é o peso que você quer alcançar?" (slider, default 70)

### 14 / 15 / 16 — rotina, sono, água
- "Como é o seu dia a dia? — Sua rotina diária também faz diferença" → 💼 trabalho fora/agitada · 💻 home office/flexível · 🏠 cuido da família · 😶 outro
- "Quantas horas de sono você tem por noite? — A qualidade do seu sono impacta diretamente no seu emagrecimento" → <5h · 5-7h · 7-9h · >9h
- "Quanto de água você bebe por dia? — Seu nível de hidratação também influencia na sua perda de peso" → ☕ quase nada (café/chá) · 💧 <1L · 🚰 1-2L · 🍶 >2L

### 17 — perfil (diagnóstico)
- H3: "⚠️ **ATENÇÃO!** Pelas suas respostas e IMC, seu corpo está no modo **ACÚMULO DE GORDURA**"
- 4 barras de IMC (dotted, gradiente), só uma aparece conforme a faixa: <18.5 (30%) · 18.5–24.9 (50%) · 25–29.9 (70%) · ≥30 (90%). Título "Seu IMC é: {calc}", subtítulo "⚠️ Zona de Alerta", legendas Magreza/Baixo peso/Normal/Sobrepeso/Obesidade
- "Índice de Massa Corporal (IMC)" + imagem tabela IMC
- Alerta amarelo condicional (3 versões):
  - IMC ≤24.9: "⚠️ Seu metabolismo pode estar te sabotando sem que você perceba! **Mesmo estando no peso normal**, seu corpo pode estar retendo toxinas e trabalhando de forma mais lenta, acumulando gordura localizada e deixando você com menos energia."
  - 25–29.9: "...Seu imc indicou **sobrepeso**, seu corpo está retendo toxinas..."
  - ≥30: "...Seu imc indicou **obesidade**, seu corpo está retendo toxinas..."
- Alerta vermelho: "🚨 Alguns sinais de alerta: ❌ Metabolismo lento e dificuldade para emagrecer mesmo comendo pouco. ❌ Cansaço constante e sensação de inchaço. ❌ Acúmulo de gordura em áreas específicas do corpo, principalmente na barriga."
- Alerta azul: "💡 Com o Mounjaro de Pobre, seu corpo acelera a queima de gordura naturalmente! A combinação ideal de ingredientes pode ativar seu metabolismo, reduzir a retenção de líquidos e aumentar sua disposição. 🔽 Descubra como o protocolo pode transformar seu corpo"
- "O Mounjaro de Pobre vai transformar seu corpo, igual fez com o da Rosane!" + foto
- Depoimento (📍 Belo Horizonte-MG): *"Até agora já se foram mais de 15kg tomando todos os dias de manhã. O protocolo me ajudou muito, as cólicas estomacais que eu tinha hoje eu não sofro mais. Até minhas diabetes ficaram mais controladas, me sinto muito mais LEVE. Agradeço a todas as meninas do grupo..."*
- Botão pulsando: **"Gerar meu Protocolo"**

### 18 — carregando
3 loadings de 2s em sequência (com % e barra): "Analisando seu perfil metabólico" → "Identificando metas e barreiras" → "Preparando seu protocolo com o Mounjaro de Pobre" (auto-avança). Abaixo, carrossel autoplay (2s) com 3 antes/depois "-12kg Dia 01 / Dia 30".

### 19 — corpo que quer ter
"Qual o tipo de corpo você quer ter?" → Em Forma / Natural (2 fotos)

---

## 4. Página de oferta (etapa 20) — ordem exata dos blocos

1. **Notificação social** (top-right, 5s a cada 20s, "⏰ Neste minuto"): "🔔 4 pessoas estão comprando" / "Beatriz Oliveira acabou de adquirir" / "🔔 2 pessoas estão preenchendo pagamento" / "Cláudia Maria acabou de adquirir"
2. H2 "**O seu protocolo foi gerado!**" — "Ele é exclusivo e gerado só uma vez, não saia dessa página para não perde-lo"
3. **GIF "após o protocolo"** condicional por IMC (3 versões) + 2 cards lado a lado "Gordura Corporal 25-29%" → "Gordura Corporal 15-25%"
4. "Seu perfil:" → grid de 4 cards com variáveis: IMC calc · `{{areasalvo}}` · `{{peso}}kg` · `{{ideal}}kg`
5. "Escute o áudio e veja o que vai receber:" → **áudio 2 da Fabiana**
6. "Seu plano inclui:" → 6 argumentos (grid 2 col c/ imagem):
   - **Mounjaro do Jeito Certo** — A forma mais eficaz de usar o Mounjaro de Pobre para perder peso sem perder músculos e sem passar fome.
   - **Definição de metas diárias** — Para você analisar seus resultados todos os dias e se manter no caminho certo
   - **Anti Efeito Sanfona** — Programa para manter o peso e nunca mais voltar a engordar
   - **Desafio de 21 dias** — Desafio para maximizar ainda mais seus resultados
   - **Grupo VIP** — Com todos os outros integrantes para se motivar e postar seus resultados
   - **Acompanhamento** — Suporte em todo o seu processo para o que você precisar
7. **Preço #1**: "Mounjaro de Pobre" · de 87,90 por **R$ 37,90** · selo "Protocolo Completo"
8. **CTA #1**: "Comprar o Mounjaro de Pobre" → checkout
9. Imagem selos de pagamento
10. "Quem usa tem resultado 😉👇" + 2 slots de vídeo (vazios) + **carrossel 13 fotos** antes/depois (autoplay 2s)
11. "Nos próximos 30 dias:" → **timeline em barras** (5): Hoje: inchaço/retenção (10%, vermelho) → 1ª sem: limpeza/desintoxicação (40%, amarelo) → 2ª sem: metabolismo acelerado, perdendo peso dormindo (60%, azul) → 3ª sem: retenção zerada, desinchando (80%) → 4ª sem: **até 10kg a menos** e volume abdominal diminuído (100%)
12. Alerta vermelho "🔴 Vagas disponíveis no momento: 7"
13. **Ancoragem de preço** (argumento): "Já parou pra pensar o quanto gastou até hoje tentando emagrecer? 👨‍⚕️ Consultas + exames R$ 500 · 🏋️ Academia + personal R$ 400 · 🥗 Dietas + suplementos R$ 450 · 🖋️ **Canetas Emagrecedoras R$ 3.000** · Mounjaro de Pobre R$ 47,90 — Pelo valor de uma pizza, você pode investir em um método natural, validado e que entrega um resultado certeiro já nos primeiros dias." *(inconsistência: 47,90 aqui vs 37,90 no preço)*
14. **Preço #2** (selo "MAIS VENDIDO") + **CTA #2** + selo garantia
15. "Todas as instruções e bônus em um aplicativo de fácil acesso 📲" + print do app
16. Selo 30 dias + **Garantia**: "Todo produto é obrigado a oferecer no mínimo 7 dias de garantia, porém confiamos tanto na fórmula que oferecemos 30 dias corridos. Se você não gostar ou não conseguir perder 1kg sequer no primeiro mês, reembolsamos cada centavo, sem questionar. Basta enviar e-mail para o suporte ou pedir direto pelo aplicativo!"
17. Foto da avatar + alerta azul "Protocolo gerado por: Fabiana Santos — Nutricionista: CRN SP 10-9552"
18. **Timer 10 min** (vermelho): "Sua vaga está disponível por [time] minutos, após isso a página será apagada para dar espaço para novas consultas!"
19. "Depoimentos" → 4 quotes curtas estilo comentário de Instagram (5★): "apetite diminuiu, 5kg em 17 dias" · "2 semanas, menos vontade de besteira, desinchei" · "comprei hoje, posso tomar mais de uma vez ao dia? 😅" · "baratinho e funcional" + fake input "Adicionar depoimento"
20. **Áudio 3 da Fabiana**
21. **Carrossel 10 prints** (conversas WhatsApp/relatos + antes/depois, autoplay 3s)
22. **CTA #3**
23. "FAQ:" (8 perguntas, primeira aberta): gestante/lactante · hipertenso · tempo pra ver resultado (1ª semana) · efeito colateral (dor de cabeça, mais idas ao banheiro na 1ª semana) · tomar todo dia · gosto (azedinho) · acesso ao app (e-mail) · site seguro (CNPJ da plataforma)
24. **CTA #4**

---

## 5. Leitura estratégica — por que esse funil converte

**Big idea:** "Existe uma versão caseira e barata da caneta que os ricos usam." O nome já é a promessa + o posicionamento de preço. Ele pega o desejo de um produto aspiracional (Mounjaro, R$ 3.000) e oferece o "de pobre" — que valida a dor financeira (opção 💸 da etapa 7 e a tabela de ancoragem que coloca "Canetas Emagrecedoras R$ 3.000" logo acima do preço).

**Mecânica psicológica em sequência:**
1. **Micro-compromissos fáceis** (etapas 2–4): perguntas sem resposta errada, com imagem — quem clica 3x continua.
2. **Agitação da dor** (5–7): faz a pessoa verbalizar o custo emocional (autoestima, vida íntima, cansaço) e a barreira (autocontrole/fome) — que o mecanismo vai "resolver".
3. **Mecanismo cedo** (8): antes de pedir dados. Infográfico circular simples: Você → bebida → queima → objetivo. Zero explicação científica; o claim é "metabolismo 24h / dormindo".
4. **Prova antes dos dados** (10): áudio em formato WhatsApp = intimidade + familiaridade com o público (classe C/D, mobile).
5. **Diagnóstico pseudo-clínico** (11–17): peso/altura/IMC/sono/água dão ar de "consulta" (reforçado pelo "1 consulta por pessoa" e "protocolo gerado por nutricionista CRN"). Resultado é sempre ruim — até IMC normal recebe "metabolismo te sabotando".
6. **Loading teatral** (18): "gerando protocolo" = percepção de personalização; carrossel abaixo continua vendendo enquanto espera.
7. **Oferta longa com 4 CTAs**, escassez tripla (vagas: 7 / timer 10 min / "página será apagada"), prova social em 5 formatos (áudio, foto, quote, carrossel print, notificação de compra), garantia 30 dias, ancoragem contra a caneta.

**Avatar:** mulher, 30–55, classe C, mobile, já tentou dieta, quer perder 10–20kg, vê "canetinha" como inatingível. Linguagem: "besteiras", "baratinho", "meninas do grupo", emoji.

**Preço:** R$ 37,90 (âncora 87,90) + bump R$ 9,90. Ticket baixo = compra por impulso dentro do timer.

**Pontos fracos / oportunidades ao modelar:**
- Zero branching — dá pra personalizar mais barato (ex.: opção "Autocontrole" na etapa 7 → mensagem sobre fome/saciedade).
- Slots de vídeo vazios na oferta — VSL curto ali sobe conversão.
- Inconsistência 47,90 vs 37,90.
- Nome/CRN de nutricionista real e fotos de terceiros — **não copiar** (uso de imagem/identidade). Usar avatar próprio.
- Claims de "diabetes controlada", "10kg em 30 dias", "1kg de gordura pelas fezes" são os que mais derrubam conta no Meta. Manter a estrutura, suavizar a redação onde não custa conversão.

---

## 6. Variáveis e regras do InLead a preservar na modelagem

| Nome da camada | Uso |
|---|---|
| `meta` | opções da etapa 2 |
| `areasalvo` | opções multi da etapa 4 → aparece no card "Seu perfil" |
| `beneficios` | opções multi da etapa 9 |
| `peso`, `altura`, `ideal` | sliders → IMC `calc({{peso}}/(({{altura}}/100)*({{altura}}/100)))` e cards |
| `botao1..4` | CTAs da oferta (mesmo link de checkout) |

Regras `roles` (visibilidade por IMC): <18.5 · 18.5–24.9 · 25–29.9 · ≥30 (barras) e ≤24.9 · 25–29.9 · ≥30 (alertas e GIFs).
