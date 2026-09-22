# BetterMe · Bumprotocolo (1.300 anúncios) · Playbook VSL DR Expert · Seu funil Luiza Mota

Fontes em `ref/`: `betterme/` (flow + questionário JSON, 38 telas), `bumprotocolo/` (pré-venda + página da VSL + transcrição de 38 min), `playbook-vsl-dr-expert.txt`, `luiza/` (quiz-data, variants, 11 telas).

---

## 1. BetterMe — o molde de todo mundo (flow 2434, calistenia feminina)

**Tech:** Next.js, questionário vem em JSON (`quiz.structure`) com 63 telas, ~45 visíveis por pessoa (condicionais por objetivo/país). Cada resposta tem `customizationKey` (level, goal…) que alimenta o plano. Steps depois do quiz: `/email` → `/funnel-prompts` (nome) → `/progress-graph` → `/scratch-card` (raspadinha de desconto) → `/checkout/reason-to-believe` → `/signup` → 2 upsells → `/download`.

**Visual:** fundo creme `#FBF8F3`, marrom-chocolate como cor de ação, uma modelo só (top marrom) em **todas** as fotos — cards de idade, corpo atual, corpo dos sonhos, foto decorativa ao lado das opções. Título centralizado grande, opções em lista branca com radio à direita, botão escuro largo fixo no rodapé. Header "Meu perfil / Estilo de vida e hábitos / Nutrição" com barra de progresso **segmentada em 5 blocos** (cada bloco enche separado → sensação de vários "capítulos" curtos).

**Estrutura (a que todo quiz de emagrecimento copia):**
1. Primeira tela = 4 cards de idade (sem landing). Legal text embaixo.
2. Info page: "Mais de 146.000 mulheres **na casa dos 20 anos** já experimentaram" (número muda pela idade escolhida) + "Como visto em" (Healthline, Good Housekeeping, Women's Health).
3. Pergunta → **página motivacional** ("Você vai arrasar!") → pergunta → motivacional ("Nós sabemos como fazer isso acontecer!" + mockup do app). Ritmo: a cada 2–3 perguntas, uma tela que só afirma e mostra o produto. Nunca 10 perguntas seguidas.
4. Objetivo → o que mais quer (multi) → corpo atual (4 fotos) → corpo dos sonhos (4 fotos) → há quanto tempo esteve no melhor físico → como o peso muda → **"Parece que você tem o biótipo Endomorfo"** (diagnóstico intermediário, personalizado pela resposta anterior).
5. Flexibilidade, frequência, regiões de foco, caminhadas, escadas, flexões, agachamentos, dores (costas/joelho) → "Estamos com você!" (adapta).
6. Rotina de trabalho, dia típico, energia → "Acabe com a queda de energia pós-almoço".
7. Água, sono, horário do café/almoço/jantar, tipo de dieta → **"Emagreça com um plano alimentar personalizado"** (mockup com kcal por refeição — o número muda pelo objetivo).
8. Hábitos (comer por emoção, lanches noturnos…), alimentos que mais sente vontade → **"Especialistas certificados"** (3 fotos com credenciais).
9. Altura, peso, peso ideal, idade (inputs com toggle cm/ft) → **loader "Analisando suas respostas"** com checkmarks + honrarias → **perfil de bem-estar (IMC com imagens)**.
10. Eventos que levaram ao ganho de peso → evento importante pela frente (férias, casamento…) → "Vamos ter este evento em mente" → **gráfico "estimamos que você pode perder X nas primeiras semanas"** com data do evento.
11. Motivo principal → "Quão confiante você está em alcançar X kg até [data]?" → "O que faz a BetterMe confiável" → loader final "670.753 mulheres…" → e-mail → nome → **"Ana, seu plano de 4 semanas está pronto!"** (gráfico nível de condicionamento semana 1→4) → raspadinha → checkout (assinatura, upsells).

**O que vale pegar pro nosso:**
- **Páginas motivacionais entre perguntas** (afirmam e mostram o app) — o Mounjaro não tem, o Paizão tem só vídeo.
- **Número social que muda pela resposta** ("Mais de 146.000 mulheres na casa dos 20").
- **Diagnóstico intermediário** no meio do quiz ("Parece que você tem o biótipo X") — não só no final.
- **Progresso segmentado em capítulos** (Meu perfil / Hábitos / Nutrição).
- **Evento futuro + data** → promessa ancorada em data real ("até o casamento").
- **Pergunta de confiança** ("quão confiante você está?") — versão soft do compromisso.
- Perguntas de horário de refeição → para nós vira "em que momento a fome ataca" (já temos) + "horário da Canetinha".

---

## 2. Bumprotocolo — 1.300 anúncios ativos (Murilo Herbst, glúteo)

**Arquitetura: pré-venda de 4 perguntas → página de VSL → checkout Payt R$ 147.**

### 2.1 Pré-venda (`/pre-yl-j12-2/`)
Página única em JS, 4 perguntas sim/não, uma por vez, progresso em pontinhos:
1. "Essa aula é exclusiva para **mulheres**. Você é mulher?" (Sim, sou mulher / Não sou)
2. "Você sente o GLÚTEO queimar de verdade quando treina, ou sente mais a coxa e a lombar?" (Sinto mais a coxa e a lombar / Sinto o glúteo queimando)
3. "Você topa ver uma sequência simples que ativa as 9 partes do bumbum?" (Quero ver a sequência / Prefiro continuar como tô)
4. "Você se compromete a assistir essa aula até o final e me mandar uma opinião sincera depois?" (Eu me comprometo / Vou só dar uma olhada rápida)
   + bullets "Nessa aula gratuita você vai descobrir": *por que o agachamento NUNCA vai empinar o seu bumbum · a "Síndrome da Bunda Morta" que afeta 1 em cada 2 mulheres · os 3 erros que travam o glúteo · as 3 porções que precisam ser ativadas na ordem certa*
- Bloco "Mensagem real de aluna" estilo WhatsApp (Vanessa T., 14:32: "meu bumbum tá OUTRO… coloquei um short hj e meu marido ficou doido").
- Seção de **comentários fake estilo Facebook** (avatares pravatar/unsplash).
- **Back-redirect**: 5 `pushState` + `popstate` → manda pra VSL; **mouseleave** → VSL. Quem tenta sair cai na VSL.
- Clarity + GTM; `bumTrack/bumAnswer` com fila (tracking por resposta).
- Disclaimer completo (Netflix/Meta/resultados variam).

### 2.2 Página da VSL (`/bum-fb-f-pvs-2/nt/`)
- Título "Aula Exclusiva — Método de Ativação para Treino de Glúteo" · "disponível somente até **16 de maio**" (data dinâmica).
- Player vturb vertical, **A/B test** nativo, nome interno: **"BUM | LEAD 2 - CLOSE 2 | META | BR | ML1 - RATOEIRA | R$ 147 | V03"** — eles versionam lead e close separadamente. `pitchTime: 1610s` (botão aparece aos 26m50s de 38m).
- "Resume": "Você já começou a assistir esse vídeo — Continuar assistindo?"
- Abaixo do player: **bio do instrutor com CREF**, "método aplicado em mais de 20.000 alunas", **8 referências científicas** com revista e ano (embasamento).
- Checkout Payt; pixel dispara `add_to_cart` + `initiate_checkout` no clique.

### 2.3 A VSL (38 min, transcrição em `ref/transcricoes/bumprotocolo-vsl-38min.txt`) — mapeada no playbook DR Expert
| Etapa (playbook) | Onde / como |
|---|---|
| **Lead** (0–3 min) | "É assim que o glúteo fraco, flácido aparece no seu corpo… Mas você só precisa de uma sequência simples" → "Dia 1 do **Projeto Bumbum na Nuca**, em 21 dias" → **regras do desafio** (sem plástica, sem 2h de treino, sem academia de luxo) → aluna Bruna que viralizou no TikTok → "não era falta de força de vontade" |
| **Mecanismo de problema** (nome chiclete) | **"Síndrome da Bunda Morta"** (amnésia glútea) — "epidemia silenciosa, 1 em cada 2 mulheres, ninguém fala" → explicação: sentada em cima do músculo → inibição neuromuscular → **analogia do interruptor com o fio cortado** → o corpo compensa com coxa e lombar → dor no joelho e o glúteo não cresce |
| **Mecanismo de solução** | "Essa ponte pode ser reativada já no primeiro treino" → **Sequência Ativadora / truque da contração** → 3 porções na ordem certa. Promete "os 3 erros" (loop aberto) |
| **Background story** | "Muito prazer, Murilo, personal formado pela FMU, me formando em nutrição, 10 anos, número de alunas… nem sempre foi assim: eu fazia treino genérico e minhas alunas não tinham resultado" |
| **3 erros** (conteúdo + desqualificação) | 1) começar pelo agachamento (multiarticular, coxa rouba) · 2) escolher exercício errado (hipertrofia regional) · 3) pular exercício/execução errada |
| **Discovery + Product build up** | "reclamações no meu direct → estudei como obcecado → cursos, biomecânica, nutrição → criei uma sequência que acelera até 300% → centenas de testes → **Bumbum Flix**" |
| **Oferta** | plataforma + planilha por frequência + vídeo por exercício + "como as musas fitness…" → **5 bônus** com preço cada (quadríceps proporcional R$100, coxa anti-celulite R$100, 2 treinos de superiores, 51 receitas proteicas, treino express) + presente surpresa R$350 → "meu objetivo não é ficar rico" → ancoragem: personal R$200/mês = R$1.200 · procedimento R$3–15 mil · tudo separado R$1.500 → "não vou cobrar 1.500, nem 997, nem 497, nem 297" → **12x R$15,20 ou R$147** → "menos que uma pizza, um lanche, um Uber" |
| **Close** | página segura "mesma tecnologia do Mercado Livre" → **garantia 30 dias incondicional** ("a lei obriga 7") → 3 caminhos → "acesso fica com você de qualquer jeito" → repete preço + garantia até o fim |

**O que vale pegar:**
- **Nome chiclete no mecanismo de problema** ("Síndrome da Bunda Morta") + estatística ("1 em cada 2") + **analogia física** (interruptor). Pro nosso: a caneta "grita o sinal"; a receita "religa".
- **Regras do desafio** na lead (sem plástica / sem 2h de treino) = pré-quebra de objeção + credibilidade. Nosso: "sem agulha, sem receita, sem passar fome, sem cortar arroz e feijão".
- **Pré-venda de 4 perguntas sim/não com compromisso** — versão mínima do nosso quiz. E o **back-redirect/mouseleave** pra VSL.
- **Referências científicas** na página da VSL (8 estudos).
- Versionar **lead e close separadamente** no nome do player.

---

## 3. Playbook VSL DR Expert (99 páginas) — o que importa pra nós

- **Erros que matam**: VSL curta, comunicação complexa, copiar estrutura sem entender, escrever tudo com IA, edição sem dopamina, poucos anúncios.
- **9 etapas**: Lead → Background → Emotional → Discovery → Mecanismo de Problema → Mecanismo de Solução → Product Build Up → Oferta → Close (+ FAQ de conversão).
- **Big Idea = Pergunta Paradoxal + Nome Chiclete**. Exemplos do próprio playbook, no nosso nicho: *"Ritual das Celebridades (emagrecimento)"*, *"O Truque Metabólico das Modelos Italianas… sem precisar tomar Mounjaro"*. → **A nossa Big Idea já está no molde certo: "Truque das Famosas" / "Canetinha de Pobre".**
- **Superestruturas**: celebridades, famosas, asiáticas, "O Segredo de [Famoso]", aparição em jornal. → famosas + canetinha = a nossa.
- **Mecanismo de problema = o oposto da solução**, e absolve ("não foi sua culpa"). Se o produto é a receita que estimula saciedade, o problema é "o sinal de saciedade que a caneta grita e o seu corpo parou de mandar sozinho". (É o que o áudio 1 do Mounjaro já faz.)
- **Solução: dizer O QUE, não o COMO** — "um shot de 3 ingredientes tomado 30 min antes da hora da fome", sem dar a receita.
- **Lead = LEGO de 2–5 min**: promessa do vídeo, antecipação, prova social, pergunta paradoxal, mecanismo em spoiler. Fazer 3–5 leads e testar.
- **Oferta**: produto com começo-meio-fim (21/30 dias), 1 dor, resultado rápido; **ticket ideal R$297–497, mínimo R$197**; 6 tipos de bônus; **garantia dupla condicional**; ancoragem progressiva; 3 caminhos; "preço pode subir".
- Pesquisa obrigatória antes de escrever: ofertas concorrentes (**é o que a gente fez**), conteúdo viral, produto, expert, avatar.

---

## 4. Seu funil Luiza Mota (bumbum) — onde está

Já tem a casca do Paizão evoluída: header IG "Luiza Mota Furacão ✓ 3,4 mi", faixa vermelha, título à esquerda com palavra em laranja, **cards com foto marcada em vermelho** (bumbum lateral, base, perfil, coxa), foto decorativa ao lado das opções, prova social (break), implicação (o que te tirou / daqui a um ano), Mini VSL 1, silhuetas hoje/objetivo, medidas, compromisso, loading, diagnóstico por "trava", Mini VSL 2, checkout, aula inaugural. 12 headlines em rodízio ponderado. Supabase por resposta.

Pendências que o próprio JSON marca: roteiros das 3 VSLs, nome do diagnóstico, silhuetas, preço/modelo, garantia, escassez "só com motivo verdadeiro". E o botão "Continuar" do slot de vídeo não respondeu ao clique automatizado — vale conferir no celular.

**É esse nível de casca que a Canetinha deve ter.** O engine e o estúdio já existem — a Canetinha pode ser um funil dentro do mesmo estúdio, trocando treino por receita.

---

## 5. Onde entra a VSL na Canetinha (resposta direta — low ticket R$ 37,90)

VSL longa de 25 min com bônus e ancoragem em R$ 1.500 é o modelo do Bumprotocolo (R$ 147) — **não é o nosso**. Em low ticket de impulso a VSL tem uma função só: fechar quem já chegou na oferta. Formato do Paizão (VSL 2 de 2m52 vendendo R$ 49) e do próprio Mounjaro (áudio 2 de 78s = a VSL dele, em áudio).

**Onde:** topo da etapa 20 (oferta), post de Reels, acima do preço. Página completa embaixo pra quem não dá play. Botão aparece no tempo certo (vturb delay).

**Tamanho:** 1m30–2m30.

**Roteiro (o áudio 2 da Fabiana em vídeo, com nosso mecanismo):**
1. "Pronto, sua Canetinha de Pobre foi gerada" (5s)
2. O que é: a receitinha que as famosas estão usando no lugar da caneta — corta a fome igual, sem cara de doente, sem o peso voltar, queima só gordura (20s)
3. O que recebe (app na tela): receita + dose pro seu peso, protocolo sem cara de doente, anti-sanfona, desafio 21 dias, grupo VIP (25s)
4. Preço: "a caneta custa 3 mil por mês… isso aqui é 8x de 5 reais, 37,90 à vista — menos que uma pizza" (15s)
5. Garantia 30 dias + "você fica com o protocolo de graça" (10s)
6. "Vagas de hoje, o botão tá aqui embaixo" (10s)

**Mini VSL 1 (etapa 10):** opcional — o áudio 1 de 61s já faz o papel. Se gravar: 60–90s, a copy do áudio 1 em vídeo com legenda palavra por palavra (formato que ganhou o A/B do Paizão).

**O que aproveitar do Bumprotocolo/playbook em low ticket:** só o nome chiclete no problema ("a caneta grita o sinal", "cara de doente") e a ideia de **pré-venda de 4 perguntas + back-redirect** como pré-lander de criativo. Não os 25 min, os bônus com preço nem o 147.
