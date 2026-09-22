# Análise — "Mounjaro de Chia" (queimadiaria.shop)

Concorrente direto do nosso mecanismo (Mounjaro natural). Fontes em `ref/chia/` (app.js com todo o funil e os comentários dos testes, style.css, 21 telas) e `ref/transcricoes/chia-vsl1-meio-do-funil-9min.txt` + `chia-vsl-final-9min.txt`.

---

## 1. Stack e infra
| Peça | O que é |
|---|---|
| Builder | código próprio (módulo JS, rotas por hash `#/meta-peso`), todo o conteúdo num array `FUNNEL` |
| Vídeo | vturb, 2 players: **VSL 1 no meio do funil** (etapa 7, botão aparece aos **9 min** de vídeo assistido) e **VSL final** na oferta (pitch aos **4:20**) |
| Checkout | Payt, Pix com `split=12` (parcelas), **checkout separado por variante A/B** pra atribuir venda por variante |
| Tracking | UTMify (InitiateCheckout casa pelo texto do botão: precisa ter "PLANO" em maiúsculo), jornada com tempo por etapa em sessionStorage, perfil viaja na URL do checkout |
| Preview | `?debug=<token>&reveal=0&step=oferta` com respostas de exemplo (mulher, 35-44, 82→68 kg) |
| Variante | sorteio 50/50 em localStorage, chave versionada por teste (`mchia_variant_v7`) pra não prender recorrente na variante velha; `?ab=A/B` força |

## 2. Os 7 testes A/B (documentados no código)
| # | Período | Testou | Venceu |
|---|---|---|---|
| 1 | — | preço: Completo R$97 / Premium R$197 | repreçado pra **R$47 / R$97** |
| 2 | até 18/08 | VSL final nova (pitch 4:20) | **B** — virou padrão |
| 3 | 19/08 | checkouts separados por variante | infra permanente |
| 4 | 25/08→01/09 | **perguntar gênero primeiro** (antes de "quantos kg") | **A** (kg primeiro) venceu |
| 6 | até 11/09 | **VSL 1 nova com botão em 9 min** | **B** venceu, propagada |
| 7 | 18→20/09 | **landing de introdução antes do quiz** ("14 kg em duas semanas" + vídeo + "apenas 1 teste por pessoa") | **A (sem landing) venceu** — intro desativada |

Outros dados nos comentários: **"64,7% de quem chega na oferta não clica no CTA"** (por isso criaram a tela de projeção antes da oferta); **quem marca "Até 5 kg" é ¼ do tráfego e converte 20 pontos abaixo** (ganhou copy própria na VSL 1: "eliminar os últimos X kg"); slider de peso inicia na **mediana real** de quem ajusta (80 / 65).

## 3. Estrutura (21 telas, "Etapa X de 16" no header)
```
 1 meta-peso    Quantos kg quer perder com o Mounjaro de Chia? (5 opções c/ emoji)
 2 genero       Mulher / Homem (fotos) → ramifica opções e imagens em tudo
 3 idade        5 faixas
 4 tipo-corpo   Regular / Flácido / Sobrepeso (thumb de foto real por gênero)
 5 area-gordura Abdômen / Peito / Flancos / Braços (fotos, multi)
 6 analise-1    loading 6s com tokens: "Comparando seu perfil com mulheres 35-44 que queriam reduzir abdômen e flancos"
 7 VSL 1        9 min, vertical, "Dr. Renan Botelho" de jaleco; hint personalizado ("receita ajustada para perder 14 kg e reduzir abdômen e flancos"); CTA "PERSONALIZAR MINHA RECEITA" só aos 9 min
 8 peso-atual   régua (kg/lb) — "ajustaremos a dosagem"
 9 altura       régua
10 peso-objetivo régua
11 impacto      6 opções (fotos, parceiro, confiança, social, energia, nenhuma)
12 satisfacao   3 opções, todas "não/mais ou menos"
13 barreira     tempo / autocontrole / já tentei tudo / caro
14 agua · 15 sono · 16 rotina
17 corpo-alvo   Em forma / Tonificado
18 nome         input — "vamos usar seu nome para montar seu protocolo 🧪"
19 analise-2    loading 8s: carrossel de antes/depois + checks com tokens ("Seu IMC é 30,1", "Ajustando a dosagem para 82 kg", "Finalizando a fórmula de Ana")
20 projecao     "Ana, é isso que te espera em 30 dias — de 82 kg para 68 kg, 14 quilos a menos" + antes/depois ilustrado + GRÁFICO (sem o método × com o Mounjaro de Chia) + 2 botões: "Sim, eu quero ter esse resultado agora mesmo" / "Não sei ainda, mas posso tentar"
21 oferta       "Analisamos suas respostas, Ana!" → VSL final (pitch 4:20) → "Fórmula personalizada para Ana, com foco em abdômen e flancos" → 2 CARDS: Completo R$47 (receita + protocolo 30 dias + guia de alimentos + aulas + suporte WhatsApp + garantia 30d) e Premium R$97 (+ protocolo 90 dias + acompanhamento) → checkout Payt
```

**Visual:** branco, verde `#16a34a` (igual Mounjaro de Pobre), título centralizado, opções em lista com emoji à esquerda e radio à direita, "Etapa X de 16 · XX%" no topo, botão fixo no rodapé (ação sempre no polegar), logo pequeno centralizado. Fotos reais só no gênero, corpo e áreas. **É o design do Mounjaro de Pobre com o polimento do BetterMe.**

## 4. VSL 1 (9 min, meio do funil) — playbook completo
| Bloco | Conteúdo |
|---|---|
| Lead | "Em segundos você recebe sua combinação, mas antes assista: pelas suas respostas seu corpo está preso no **modo de preservação hormonal**" → promessa "até 10 kg no 1º mês e 25 em 90 dias" → 2 depoimentos rápidos ("essa era eu há 4 meses, 94 kg… calça 46") |
| Background | "Dr. Renan Botelho, médico de saúde hormonal feminina, 20 anos, de donas de casa a celebridades" |
| Emotional story | Cláudia, 110 kg, 43 anos, tentou tudo (detox, academia, **"até a famosa caneta… perdia 5, 6 kg e ganhava tudo de volta"**), tia no jantar: "você está grávida de novo?" |
| Discovery + pergunta paradoxal | "Por que mulheres japonesas não engordam depois dos 30?" → chia hidratada diária → gel → desbloqueia leptina, baixa cortisol/inflamação → "comem arroz, doce, massa e não engordam" |
| MUP | **"modo de preservação hormonal"** (leptina bloqueada, cortisol, inflamação) — "a fome infinita" |
| MUS | **"gel da chia"** que "entrega ao corpo o sinal de que não há perigo" → autoriza queimar gordura |
| Prova | Cláudia −7 kg em 2 semanas; 3 depoimentos em formato de UGC/entrevista; "20, 30, 40 kg" |
| Por que o quiz | "a chia solta não funciona — cada **combinação** age diferente (psyllium, aveia, limão, banana, água); mapeei 4 mil casos; 97%; média 29 kg em 90 dias" → justifica personalização |
| Superestrutura (fabricada) | "ANVISA exigiu estudo com 50 mulheres… 100% reduziram… certificado de aprovação da ANVISA" |
| Build-up | "criei o Mounjaro de Chia: ingrediente certo, proporção certa, momento certo do dia" |
| CTA | "responda mais algumas perguntas que na próxima página eu revelo o seu protocolo" |

## 5. VSL final (9 min, oferta, pitch 4:20)
| Bloco | Conteúdo |
|---|---|
| Lead | "Parabéns, sua combinação foi identificada… **seu caso é um dos melhores que existem**: mulheres com seu padrão eliminam 22 a 33 kg em 90 dias" |
| Prova emocional | "cintura de 110 pra 68 cm… minha filha de 8 anos conseguiu fechar os braços em volta de mim" |
| Produto | "não é receita genérica do TikTok, é o seu protocolo com o seu nome"; "celebridades, médicas, atletas, cada uma com sua combinação" |
| Como funciona | "todo dia no horário indicado, 2 minutos, com o que já existe na sua cozinha"; **30 dias mínimo, 90 dias completo** (prepara os 2 preços) |
| Ancoragem | "valor era R$ 497 → consulta 500 → **canetas como Mounjaro custam mais de mil por mês e o peso volta quando você para** → dietas custam milhares" |
| Pitch | 2 opções: 30 dias R$ 47 · 90 dias R$ 97 ("o que eu recomendo pro seu perfil… quem para antes perde o resultado") |
| Garantia | 30 ou 90 dias, "botão pedir reembolso dentro do app, estorno no Pix" |
| Bônus | viagem pro Encontro da Globo (fabricado), protocolo de reativação 7 dias, chá das japonesas anti-flacidez, guia energia e confiança |
| Implicação + future pacing | "se nada mudar, daqui 5 meses: mesma barriga, mesmo joelho, mesmos exames… ou em 90 dias 22 a 33 kg a menos, o olhar do seu marido, brincar com os filhos" |
| Close | "18 mil mulheres já fizeram essa escolha… depois é o que mantém tudo como está… te vejo do outro lado" |

## 6. O que vale pegar (com a base)
| Elemento | Por quê / onde eles provaram |
|---|---|
| **Sem landing** | Teste #7: intro perdeu. Mesmo resultado do Paizão. **Terceira evidência.** |
| **"Quantos kg" como 1ª pergunta** | Teste #4: kg primeiro venceu gênero primeiro. É a 1ª do Mounjaro também. |
| **Tela de projeção antes da oferta** ("Ana, é isso que te espera em 30 dias: de 82 pra 68") com gráfico sem/com método e **2 botões (sim / não sei ainda)** | Criada porque 64,7% não clicava na oferta; junta o antes/depois do Paizão com o gráfico do BetterMe e compromisso |
| **Tokens da resposta em todo lugar** (loading, hint da VSL, título da oferta "com foco em abdômen e flancos") | Personalização visível — o Paizão faz no loading; aqui vai até a oferta |
| **Copy diferente pra quem quer perder pouco** ("os últimos X kg") | Segmento converte 20 pontos abaixo; nós temos a mesma pergunta |
| **Dois preços na mesma oferta** (47 entrada + 97 upgrade) sem página de upsell | Teste #1 → repreçado; a VSL prepara com "30 dias mínimo / 90 completo" |
| **Ancoragem que cita a caneta e o rebote** ("Mounjaro custa mais de mil por mês e o peso volta quando você para") | É o nosso mecanismo dito por eles na oferta |
| **Nome capturado antes do loading** e usado no título ("Analisamos suas respostas, Ana!") | BetterMe faz igual |
| **"Seu caso é um dos melhores"** na abertura da VSL final | Inverte o susto do IMC em esperança na hora do pitch |
| **Emotional story com frase-gatilho** ("você está grávida de novo?") e prova com detalhe físico (cintura 110→68, filha fechando os braços) | Playbook: história emocional; muito mais forte que "perdi 17 kg" |
| **Botão fixo no rodapé** | UX: ação no polegar |
| **Chave de variante versionada por teste** e checkout por variante | Infra de teste que o Paizão não tem |

## 7. O que NÃO pegar
- **Superestruturas fabricadas**: "certificado da ANVISA", "estudo fiscalizado com 50 mulheres, 100%", "Encontro da Globo em parceria com a Anvisa". É o que derruba conta e dá processo — e não precisa: a nossa superestrutura (famosas na canetinha) é pública e verdadeira.
- **Promessas de 25–44 kg** em 90 dias.
- **VSL de 9 min no meio do quiz**: funciona pra eles (venceu no teste #6), mas exige expert com jaleco falando 9 min — o Paizão cortou pra 1m43 e venceu com a curta. Sem expert forte, a nossa aposta continua sendo áudio 1 de 60s.
- Gênero masculino: dobra os assets; nosso público é mulher.

## 8. Comparação com o nosso funil (o que muda)
| Item | Chia | Nosso hoje | Ação |
|---|---|---|---|
| 1ª tela | "Quantos kg" | landing (sua foto) | manter landing pra testar contra a sua foto; **variante B = sem landing** (3 funis provaram) |
| Projeção antes da oferta | sim, com gráfico e 2 botões | diagnóstico com antes/depois + botão único | **adicionar gráfico "sem / com a Canetinha" e o botão secundário "não sei ainda"** |
| Tokens na oferta | "Fórmula personalizada para Ana, com foco em abdômen e flancos" | "Seu perfil" em cards | **adicionar nome + "com foco em {áreas}" no título da oferta** — precisa da pergunta de nome |
| Segmento "até 5 kg" | copy própria | nada | **hint na prova: "os últimos X kg"** |
| 2 preços | 47 / 97 | 37,90 | testar **37,90 / 67 (com 90 dias)** — o Mounjaro tem bump de 9,90; o Chia prova upgrade na mesma tela |
| Ancoragem | cita caneta + rebote | cita caneta 3 mil | já alinhado; adicionar "e o peso volta quando você para" |
| Abertura da VSL final | "seu caso é um dos melhores" | "sua Canetinha foi gerada" | testar como lead C |
| História emocional | tia "grávida de novo?" | não tem | **adicionar 1 frase-gatilho na prova (Marluce)** |
