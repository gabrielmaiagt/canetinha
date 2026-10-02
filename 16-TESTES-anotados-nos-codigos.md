# 16 — Os testes que estão anotados no código dos concorrentes

Extraído dos comentários dos próprios arquivos JS, sem interpretação minha. Fontes em `ref/chia/app.js`, `ref/paizao/quiz-data.js`, `ref/paizao/app.js` e `ref/luiza/variants.js`.

---

## 1. Mounjaro de Chia — 7 testes, com data e vencedor

| # | Período | O que testou | Vencedor |
|---|---|---|---|
| 1 | — | preço Completo R$ 97 / Premium R$ 197 | repreçado pra **R$ 47 / R$ 97** |
| 2 | até 18/08/2026 | VSL final nova, com pitch aos 4:20 | **B** · virou padrão nas duas variantes |
| 3 | 19/08/2026 | checkouts separados por variante | virou infraestrutura permanente |
| 4 | 25/08 → 01/09/2026 | perguntar **gênero antes** de "quantos kg" | **A** · a ordem original (kg primeiro) venceu |
| 6 | até 11/09/2026 | VSL 1 nova com o botão aparecendo aos 9 min | **B** · propagada pras duas |
| 7 | 18 → 20/09/2026 | tela de **introdução antes do quiz** (landing) | **A** · sem intro venceu, intro desativada |

### Verbatim que vale ler

> **Teste #4 (25/08→01/09/2026, vencedor A):** aqui vivia a troca que fazia a variante B perguntar o gênero primeiro. A ordem original venceu e a troca foi removida.

> **Teste #7 encerrado em 20/09/2026, A venceu:** a intro de B foi desativada e as duas variantes voltaram às MESMAS telas. O código da intro fica DORMENTE — ETAPA_INTRO, renderIntro, o CSS e os assets seguem no projeto, prontos para reuso.

> **A CHAVE DA VARIANTE É VERSIONADA POR TESTE, e isso não é capricho.** Ao encerrar o teste #1, todo visitante teve `mchia_variant = 'A'` gravado, de propósito, para tirar de B quem estava vendo a oferta perdedora. Se o sorteio do teste #2 lesse a mesma chave, TODO recorrente ficaria preso em A: o split viraria "novatos 50/50, recorrentes 100% A", e **nada no painel denunciaria isso** — só um B misteriosamente menor.

> **Checkouts separados por variante desde 19/08/2026 (teste #3)** — são infraestrutura permanente: é isso que permite atribuir VENDA por variante na Payt em qualquer teste.

### Números soltos nos comentários

> **64,7% de quem chega na oferta não clica no CTA.** (Foi por isso que criaram a tela de projeção antes da oferta: "a ideia é a pessoa ver o resultado antes de começar a assistir a VSL final.")

> Quem escolheu **"Até 5Kg" é um quarto do tráfego e converte 20 pontos abaixo da média.** A promessa de grande emagrecimento não é a dele — para esse perfil a mensagem é sobre os últimos quilos.

> O slider de peso **inicia na mediana real** de quem ajustou a régua. "Estava em 75, acima da mediana real de objetivo (64,5)."

### Infra que eles montaram por causa dos testes

> O funil manda um **beacon para `/api/lead` a cada etapa**. É o que alimenta o dashboard de retenção — a UTMify só registra pageview e conversão, então sem isto o **abandono por etapa fica invisível**.

> **ANTI-UNFUNNELIZER:** o conteúdo não existe no DOM antes da hora. A versão anterior montava tudo escondido e só alternava o atributo; ferramenta de destravar funil achava. E a contagem é pela **reprodução** do vídeo, não pelo tempo na tela: pausar o vídeo pausa a contagem.

---

## 2. Paizão — o que ele desligou, e por quê

> **TESTE: Vídeo Carlão (story) DESATIVADO temporariamente** — pula da q3 direto pra q4. Pra reativar, é só descomentar este bloco.

> **REMOVIDA (compensação da nova 1ª pergunta):** "E o que mais te trava na hora de manter o treino?". Ou seja: entrou uma pergunta nova no começo, então ele **tirou outra pra não alongar o funil**.

> **REMOVIDA: q13_primeiro** ("o que quer notar primeiro no espelho"). **Redundante com a 1ª pergunta** (bumbum/culote/coxa/corpo).

> **Mini VSL 1 — HOJE: 100% B** (~1m43). `force: "B"`. A fica no mapa só pra reabrir o A/B depois (remove force → 50/50). Grava `answers.ab_vsl1`.

> **Mini VSL 2 — A/B silencioso:** sticky em localStorage. HOJE force "B" = 100% na VSL nova. O **BOTÃO é da própria vturb, dentro do vídeo** — não colocamos botão nosso.

> **Contador "X/14" REMOVIDO — a lead não deve saber quantas perguntas faltam.**

> **BACKREDIRECT (TESTE) — só na 1ª etapa do funil.** Pessoa na P1 → empilha 1 estado no histórico. Voltar: em vez de sair pro anúncio, vai pra `BACK_REDIRECT.url`. Sai da P1: desliga. **Não roda nas outras perguntas.**

> A/B: grava variante no lead (`answers.ab_vsl2`) — **invisível pra filhota**. O label com a variante existe só no banco, não aparece na UI.

---

## 3. Luiza Mota (nosso outro funil) — rodízio de headline com peso

> Dois testes rodando em paralelo, um por braço do corpo. Os pesos são **porcentagens do tráfego** daquele grupo e somam 100. Pra dar mais tráfego à headline que estiver ganhando, muda o número. **Zerar um peso tira a headline do teste sem apagar nada.**

```
bumbum:  BUM-27D-C 17  · E se eu te deixar bunduda em 27 dias
         BUM-27D-D 17  · Dá pra ter um bumbum redondinho em 27 dias
         BUM-VER-C 17  · E se eu te deixar bunduda até o verão
         BUM-VER-D 16  · E se eu te dar centímetros a mais até o verão
         BUM-SEM-C 17  · Quer glúteo grande e durinho, ou pequeno e caído
         BUM-SEM-D 16  · Dá pra ficar bunduda com um treino só pra você

barriga: BAR-27D-C 17  · Dá pra secar a pança em 27 dias comendo doce
         BAR-27D-D 17  · E se eu te tirar a pança em 27 dias
         BAR-VER-C 17  · E se eu te tirar a pança até o verão
         BAR-VER-D 16  · E se eu te tirar a pança e os quilos até o verão
         BAR-SEM-C 17  · Dá pra secar a pança comendo doce todo dia
         BAR-SEM-D 16  · Dá pra secar a pança comendo arroz, feijão e pão
```

> A porta sorteada fica guardada no navegador da lead, **junto do grupo**, pra mesma pessoa ver sempre a mesma headline. Quem chega com `?v=` na URL (anúncio apontando pra uma headline específica) **fica fora do rodízio**.

---

## O que disso já está no nosso funil

| Prática | Nosso status |
|---|---|
| Chave de variante versionada por teste | ✅ `split.version` no `config/funnel`, com botão "Reiniciar sorteio" no admin |
| Retenção por etapa gravada por conta própria | ✅ `steps.{id}` no Firestore, painel com queda por tela |
| Variante invisível pra lead, gravada no banco | ✅ `entry` e `vsl` na sessão |
| `?ab=A/B` e `?v=` pra QA sem desequilibrar o teste | ✅ |
| Sem contador de perguntas | ✅ barra falsa, front-loaded |
| Backredirect | ✅ só na oferta (o do Paizão é na 1ª tela) |
| Checkout separado por variante pra atribuir venda | ❌ nosso usa um link só, com `src=oferta\|A\|pergunta\|sid` |
| Botão da VSL dentro do player | ⏳ hoje é por tempo (`vslCtaAt`), com `revealOffer()` pronta pra vturb chamar |
| Conteúdo da oferta fora do DOM antes do pitch | ✅ `#rest` só existe depois da revelação |
| Rodízio de headline com peso | ❌ não temos (uma headline só) |


---

# Recrawl de 02/10/2026 — o que mudou em 11 dias

Baixei de novo os fontes de todos e comparei por hash com o que capturamos em 21/09.

| Funil | Estado |
|---|---|
| **Paizão** | **mudou muito** (quiz-data.js de 34 KB → 52 KB) |
| Mounjaro de Chia | `app.js` **byte a byte idêntico** |
| Mounjaro de Pobre | mesma estrutura, **uma opção nova na 1ª pergunta** |
| Bumprotocolo | uma pontuação no título, nada mais |
| BumbumFlix `/back/` | mesma oferta (cupom BUMBUM50, `src=bk-vsl` e `bk-bk`), 500 bytes a menos |

## Paizão — virou um funil de bumbum, com vídeo montado por resposta

**1. Trocou culote por barriga na 1ª tela.** Agora é bumbum / barriga / coxa / corpo todo. A anotação diz: *"Culote saiu (leads antigos ainda caem no persona)"*.

**2. As perguntas viraram específicas de bumbum.** Antes era genérico de corpo; agora:
- *"o que você mais quer ver **no bumbum** nessas 4 semaninhas?"* com opções novas: secar em volta e afinar a lateral / ele empinado e com formato / os dois juntos, enxugar e levantar
- *"Onde **seu bumbum** tá hoje?"*: tô no peso mas ele é reto dos lados / magrinha demais, sem nada atrás / uns quilinhos a mais e com celulite / caído, molenga, e dessa vez eu vou

**3. O maior salto: VSL montada por combinação de respostas.** A anotação chama de **TRUQUE DAS FAMOSAS**.

> Mini VSL 1: **40 takes, 48 montagens**. `byMontagem` escolhe o vídeo pela **parte × onde o bumbum está hoje × o que ela quer** e **vence o abTest**. Pasta na Vturb: `MINI VSL 1 - Truque das Famosas / BU·BA·CX·CO / <data> / Mini1_<sigla>_<data>_TRUQUE_<truque>_<foco>_QUIZ`. Grava `answers.vsl1_montagem`.

São 4 partes × 4 estados × 3 objetivos = 48 vídeos diferentes, um por caminho.

> Mini VSL 2 (oferta): **13 takes, 16 montagens**, escolhidas por **faixa de IMC × parte da 1ª tela**. IMC1 abaixo · IMC2 saudável · IMC3 acima · IMC4 alto. Grava `answers.vsl2_montagem`.

Ou seja: o A/B de VSL dele virou coadjuvante. O que decide qual vídeo ela vê é a combinação das respostas, e o A/B só roda quando falta resposta.

## Mounjaro de Pobre — opção nova na 1ª pergunta

A pergunta continua "Quantos quilos você quer eliminar?", mas agora tem **5 opções em vez de 4**: Até 5 kg · de 6 a 10 · de 11 a 19 · 20 kg ou mais · **"Perder só barriga"**.

Acrescentaram uma saída que não é de peso na pergunta de peso. Vale olhar: é o mesmo problema que a gente discutiu ao trocar a nossa 1ª tela, e eles resolveram somando uma opção em vez de trocar a pergunta.
