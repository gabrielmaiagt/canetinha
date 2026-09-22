# Análise — Funil "Avaliação Gratuita do Paizão" (Carlão Personal)

URL: https://avaliacaogratuitapaizao.com.br/ — R$ 3M em 3 meses (info do dono).
Fontes salvas em `ref/paizao/` (page.html, quiz-data.js, app.js, supabase.js, styles.css).

---

## 1. Stack

| Peça | O que é |
|---|---|
| Builder | **Nenhum.** HTML/CSS/JS próprio, hospedado com SPA fallback (Vercel). Copy 100% em `quiz-data.js`, motor em `app.js` |
| Vídeo | **vturb** (converteai) — 4 players: story do Carlão (desligado), depoimento @niic.ca, Mini VSL 1, Mini VSL 2 (oferta) |
| Banco | **Supabase** — tabela `paizao_quiz_leads`, 1 linha por sessão, atualizada a cada resposta via RPC. Guarda UTM, referrer, `last_step` (drop-off), `completed`, IMC, todas as respostas. Painel interno em `/pedro` |
| Tracking | GTM (`GTM-ND3FPVHQ`) + UTMify pixel + `fbq`: `QuizStep` custom por etapa, **`Lead` no loading**, `ViewContent` na oferta, `InitiateCheckout` no CTA |
| Rota | **URL por etapa** (`/pergunta-1`, `/medidas`, `/montando`, `/diagnostico`, `/mini-vsl-2`) — botão voltar do browser funciona, UTMs re-anexadas em toda escrita de histórico |
| A/B | Infra própria pra testar VSL 1 e VSL 2 (sticky em localStorage, `?vsl2=B` pra forçar, grava a variante no lead) |
| Checkout | `CHECKOUT_URL = ""` no app.js — **o CTA de compra está dentro do vídeo da vturb** (delay button). Não há página de vendas |
| Visual | Roxo `#7c3aed` sobre lilás `#f4eeff`, Poppins, cards com foto estilo BetterMe, header imitando **perfil do Instagram** (avatar com anel, selo verificado, @handle) |

---

## 2. Arquitetura (14 telas ativas)

Estrutura explícita nos comentários do código: **SPIN** (Situação → Problema → Implicação → Necessidade) + compromisso + diagnóstico + VSL.

```
ENTRADA — sem landing (foi testada e desligada). Primeira tela JÁ É pergunta.
 00 q_parte_foco   "Em que parte do corpo você quer focar agora?" — 4 cards c/ foto (bumbum/culote/coxa/corpo)

S — SITUAÇÃO ("sins" fáceis)
 01 q1_idade       "Quantos anos você tem?" — cards c/ foto por faixa (16-29 / 30-39 / 40-49 / 50+)
 02 q3_rotina      "Me conta uma verdade: como tá sua rotina de treino hoje?"

P — PROBLEMA
 03 q4_porque      "Me fala de coração: por que você acha que ainda não conseguiu o corpo que quer?"
 04 q2_foco        "Me fala a real o que você mais quer nessas 4 semaninhas?" — 3 cards (secar / curvas / os dois)
 05 video-niic     DEPOIMENTO em formato STORIES do Instagram — @niic.ca "4,2 mi · aluna do paizão", 27s, verificado

I — IMPLICAÇÃO (o custo)
 06 q7_deixou      "Onde você tá hoje? Sem julgamento, filhota" — 4 cards c/ foto do corpo atual
 07 q7b_nostalgia  "Lembra da última vez que se olhou no espelho e gostou do que viu?"
 08 q8_um_ano      "Se nada mudar, como você se imagina daqui 1 ano?"
 09 mini-vsl-1     MINI VSL 1 em formato STORIES (1m43) — A/B (controle 2m46 vs oficial 1m43, 100% B)

N — NECESSIDADE + qualificação + comunidade
 10 q9_plano       "O que mais te falta pra o treino parar de ser copiado da internet?" (+ mockups do app embaixo)
 11 q10_cobrando   "O quanto faz diferença ter o paizão te cobrando toda semana?"
 12 q11_comunidade "O quanto mudaria fazer parte de uma família de mulheres que treina junto?"
 13 q12_alimentacao "Como tá sua alimentação hoje? Sem vergonha"

MEDIDAS + COMPROMISSO
 14 medidas        altura + peso digitados ("Fica só entre você e o paizão 🔒")
 15 q14_compromisso "Última pergunta e é a mais séria. Você tá comprometida a seguir o plano por 4 semaninhas?"
                    → "Tô pronta, paizão 🙏" / "Sim, mas tenho medo de não conseguir"  (as duas = sim)

TRANSIÇÃO
 16 montando       LOADING 19,5s: 3 "batidas" de texto personalizadas (foco → idade → "a gente começa por {parte}")
                    + slideshow de 3 PRINTS DO FEED DO APP (posts de alunas com antes/depois) — fbq Lead aqui

DIAGNÓSTICO
 17 diagnostico    "Seu corpo nas próximas semaninhas": ANTES/DEPOIS com foto do corpo atual (q7) → foto do objetivo (q2),
                    datas reais (Hoje vs data +28 dias), frase de IMC humanizada, "Seu corpo: Quilinhos a mais → Seca e no lugar",
                    barrinhas nível de treino 1/3 → 3/3, linha de empatia por barreira, CTA "RECEBER MINHA AVALIAÇÃO"

OFERTA
 18 mini-vsl-2     POST DE REELS: header do perfil + vídeo + ❤️ 12,4 mil + legenda "Seu plano já tá pronto 💛 dá o play que
                    o paizão te conta tudo". CTA aparece DENTRO do vídeo (vturb). A/B de VSL. Sem página de vendas.
```

**Removidas por teste** (ficaram comentadas no código): landing com CTA, story do Carlão de 16s, pergunta "o que mais te trava", pergunta "o que quer notar primeiro", depoimento Liz com bifurcação por foco.

---

## 3. Elementos que sustentam a escala (o que este funil faz que o Mounjaro não faz)

### 3.1 Persona > mecanismo
O "mecanismo" é fraco de propósito: "plano feito pra você + paizão te cobrando + família de mulheres". A força está na **voz**: "filhota", "paizão", "semaninhas", "me fala a real", "sem julgamento". Toda pergunta é escrita como fala, não como formulário. O header é um perfil de Instagram com selo verificado — a lead sente que está conversando com um creator, não preenchendo um quiz.

### 3.2 Zero landing
A primeira tela é uma pergunta com 4 fotos. LCP otimizado (preload do 1º card). Não pede "clique pra começar" — ela já começou.

### 3.3 Barra de ameaça (loss aversion) em vez de contador
> "Sua avaliação gratuita já começou — Se você sair agora, sua vez passa pra próxima"

Fixa no header, sem números, sem regressiva. A barra de progresso é **falsa e front-loaded** (`1 − (1−p)³`): enche rápido e parece quase cheia a maior parte do tempo. O contador "X/14" foi removido — a lead não deve saber quantas faltam.

### 3.4 Todas as opções são "sim"
Nenhuma pergunta tem "nenhuma das acima". Toda alternativa concorda com a premissa (ela tem problema, ela precisa de plano, ela precisa de cobrança, ela precisa de grupo). Acumula micro-concordâncias.

### 3.5 Perguntas de implicação
- "Lembra da última vez que se olhou no espelho e gostou?" → "Sinceramente? Não lembro de gostar"
- "Se nada mudar, daqui 1 ano?" → "Pior que hoje" / "Não quero nem pensar"
São as perguntas que doem. Vêm **depois** do depoimento (já viu que é possível) e **antes** da VSL 1.

### 3.6 Pergunta de compromisso antes do loading
"Você tá comprometida a seguir o plano por 4 semaninhas?" — as 2 opções são sim. Cialdini: consistência. Quem diz "tô pronta" compra pra não se contradizer.

### 3.7 Vídeo em formato nativo de Instagram
3 vídeos, nenhum "player de VSL": stories (depoimento e VSL 1) e post de Reels (oferta). A lead reconhece o formato e assiste como conteúdo.

### 3.8 Loading que vende
19,5 segundos (não 6) mostrando **prints do feed do app**: posts reais de alunas com antes/depois e texto de depoimento. Ao mesmo tempo prova o produto (existe um app com comunidade) e prova social. Texto em 3 batidas personalizadas: "montando o caminho pra você secar…" → "depois dos 40 o jogo muda…" → "a gente começa pelo bumbum".

### 3.9 Diagnóstico visual, não numérico
Antes/depois com **foto parecida com ela** (escolhida na pergunta do corpo) → foto do objetivo (escolhida na pergunta do foco), com data de hoje e data +28 dias. IMC vira uma frase de "paizão" — nunca assusta, sempre "bora virar o jogo". Compare com o Mounjaro: barra vermelha + "ACÚMULO DE GORDURA".

### 3.10 Oferta = vídeo
Não tem página de vendas, preço na tela, garantia, FAQ. É um Reels com o Carlão falando e o botão aparecendo no tempo certo. Toda a conversão está no roteiro da VSL 2.

### 3.11 Infra de otimização
- Supabase grava cada resposta → sabem exatamente em qual pergunta cai
- URL por etapa → funil no GA/GTM sem esforço
- A/B de VSL nativo
- `?s=N` pra ver qualquer etapa
- Lead do pixel disparado no loading (quem chegou ali é lead qualificado) — otimiza campanha pra "Lead" e não só pra Purchase

---

## 4. O que não copiar
- O mecanismo em si (é personal/app de treino, outro produto)
- A dependência 100% de VSL na oferta — sem página, quem não assiste vídeo não compra. Pra Canetinha (ticket 37,90, público que compra por impulso lendo) o híbrido é melhor: Reels no topo + página embaixo
- O tom "paizão/filhota" é do Carlão — a Canetinha precisa de voz própria ("amiga que conta o segredo das famosas")

---

## 5. Comparativo direto

| | Mounjaro de Pobre | Paizão | Canetinha (hoje) | Canetinha (proposta) |
|---|---|---|---|---|
| Entrada | hero + CTA | pergunta com fotos | hero + CTA | **pergunta com fotos** (áreas alvo) |
| Header | logo | perfil IG verificado | logo | **perfil IG da nutri** |
| Escassez | "1 consulta" | barra "sua vez passa" | "1 avaliação" | **barra "sua vez passa"** |
| Progresso | real | falsa front-loaded | real | **falsa front-loaded** |
| Voz | formulário | oral/creator | formulário | **oral** |
| Opções "não" | tem | nenhuma | tem | **nenhuma** |
| Implicação | não | 2 perguntas | não | **2 perguntas** (espelho / 1 ano) |
| Compromisso | não | sim | não | **sim** |
| Vídeo | 2 slots vazios | 3 (stories/reels) | 2 slots | **stories depoimento + reels na oferta** |
| Loading | 6s, 3 barras | 19s, prints do app | 6s, 3 barras | **~15s, prints do app + batidas personalizadas** |
| Diagnóstico | IMC vermelho | antes/depois com foto dela | IMC + alertas | **antes/depois com foto + IMC humanizado** (mantém o "susto" leve) |
| Oferta | página longa | só VSL | página longa | **Reels + página** |
| Dados | InLead | Supabase por resposta | sessionStorage | **Supabase por resposta** |
| Pixel Lead | não | no loading | não | **no loading** |

---

## 6. Plano de implementação no `site/index.html`

Ordem por impacto/esforço:
1. Entrada direto na pergunta de áreas (com fotos) — hero vira etapa opcional
2. Header estilo perfil IG + barra "sua vez passa pra próxima" + progresso front-loaded
3. Reescrever as perguntas em voz oral; tirar "nenhuma das acima"; inserir **espelho**, **1 ano** e **compromisso**
4. Loading 15s com prints do app/grupo (slots) + 3 batidas personalizadas (barreira → sono/fome → "sua Canetinha vai ser à noite")
5. Diagnóstico: antes/depois com foto por tipo de corpo → foto do corpo desejado (já coletamos os dois!) + datas + IMC humanizado, mantendo os alertas
6. Oferta: bloco Reels (slot vturb) no topo, página embaixo
7. Supabase (tabela + RPC) e `fbq('Lead')` no loading; URL por etapa; `?s=N`
