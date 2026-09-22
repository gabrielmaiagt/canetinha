# Comparativo visual — Mounjaro × Paizão × Canetinha (nosso)

Screenshots reais em iPhone (390×844 @2x), etapa por etapa, em `ref/screenshots/` (`*_quiz_a/b.jpg` = etapas, `*_offer.jpg` = página de oferta inteira, pastas `mj/ pz/ us/` = PNGs individuais). Script reutilizável: `ref/screenshots/shoot.js`.

---

## 1. Mounjaro de Pobre — como é de verdade na tela

- **Shell:** header branco fino com logo centralizado + seta voltar, barra de progresso verde real. Fundo branco puro.
- **Títulos:** centralizados, com **palavra-chave colorida** (verde na pergunta, vermelho no "te impede"/"está feliz"). Pergunta fica no meio vertical da tela quando tem poucas opções — muito espaço vazio.
- **Opções:** cards brancos com borda cinza, thumbnail à esquerda (ilustração 3D ou foto stock recortada), radio à direita; selecionado = borda verde. Emojis só nas perguntas de rotina/sono/água.
- **Etapa 2 tem uma 5ª opção** que eu não tinha listado: "Perder só barriga" (cartoon de cintura) — vem de uma segunda camada de opções no JSON.
- **Sliders:** régua estilo balança com ponteiro verde e toggle kg/lb — parece "instrumento", melhor que um range simples.
- **Áudio:** player verde-claro tipo WhatsApp com nome "Fabiana Santos" e avatar.
- **Diagnóstico:** título vermelho, barra de IMC colorida com pin "Você", tabela IMC como imagem, alertas amarelo/vermelho/azul empilhados. Denso.
- **Loading:** uma barra só com % + carrossel "-12kg Dia 01/Dia 30".
- **Oferta (7.700px de altura):** os **2 slots de vídeo vazios renderizam como retângulos pretos** (bug visível). Timer é 2 caixinhas rosa "09 min : 59 seg". Preço = card com faixa verde no topo ("Protocolo Completo" / "MAIS VENDIDO"). Depoimentos **têm nome** (Marluce Andrade, Rafaela Nascimento, Luana Dias, Andressa Soares, Beatriz Mattos) — eu tinha removido os nomes na extração; precisamos ter nomes nos nossos.

## 2. Paizão — como é de verdade na tela

- **Shell:** fundo **lilás** (#f4eeff), header = **perfil de Instagram** (avatar com anel colorido, "Carlão Personal das Estrelas ✓", "@oficial_carlaopersonal"), seta voltar. Logo abaixo, **faixa VERMELHA em caixa alta** ocupando ~60px: "SUA AVALIAÇÃO GRATUITA JÁ COMEÇOU / SE VOCÊ SAIR AGORA, SUA VEZ PASSA PRA PRÓXIMA". Fica em **todas** as telas. Barra de progresso roxa fina.
- **Títulos:** **alinhados à esquerda**, Poppins bold grande (~22px), 2–3 linhas, tom de conversa. Palavra destacada em roxo só uma vez ("família de mulheres").
- **Opções:** cards brancos arredondados, radio à esquerda, texto à esquerda, **sem emoji, sem ícone**. 4 opções. Muito espaço vazio abaixo — e eles não se importam (só na pergunta 9 colocam 2 mockups de celular embaixo).
- **Cards com foto:** grade 2×2, foto 4:3, **faixa roxa com o rótulo + seta →** por baixo. Mesma modelo em todos (ver doc 04).
- **Vídeos:** tela cheia estilo stories, header do IG por cima ("@niic.ca · 4,2 mi · aluna do paizão"), sem botão — avança sozinho.
- **Medidas:** dois inputs grandes (165 cm / 72 kg) com placeholder, texto "Fica só entre você e o paizão 🔒", botão roxo "Continuar →".
- **Loading:** H1 centralizado em roxo escuro ("Calma… o paizão tá montando o caminho pra você secar de verdade…") + card com print do feed do app + 3 dots. Sem barra de %.
- **Diagnóstico:** "Seu corpo nas próximas semaninhas" → card com cabeçalho "Agora / Hoje | Seu objetivo / 19 de out" → duas fotos (a gordinha → a seca, mesma mulher) com 3 chevrons roxos entre elas → legendas "você tá aqui" / "Seca e no lugar" → card com a frase do IMC ("deu 28,7 e você precisa cuidar da sua saúde…") → "Seu corpo: Magrinha → Seca e no lugar" + "Nível de treino" com barrinhas → card de empatia 🧡 → botão roxo "RECEBER MINHA AVALIAÇÃO →".
- **Oferta:** **uma tela só**, sem scroll: post de Instagram ("@oficial_carlaopersonal ✓ · Patrocinado"), legenda "Seu plano já tá pronto 💛 dá o play que o paizão te conta tudo", vídeo 9:16 com overlay "Seu vídeo já começou — clique para ouvir". Nada mais.

## 3. Nosso (Canetinha) — como está na tela hoje

**O que está bom:**
- Shell limpo, roxo, progresso, voltar. Mecanismo, diagnóstico, oferta e FAQ completos e funcionando.
- Diagnóstico com IMC + tabela + alertas condicionais + bloco de sono. Oferta com preço, timeline, ancoragem, garantia, timer, depoimentos, FAQ, 4 CTAs.
- Placeholders tracejados (melhor que os quadrados pretos do Mounjaro).

**O que está fraco (honesto):**
1. **Parece wireframe.** Hero é um retângulo roxo com "📷 foto ANTES / foto DEPOIS". Sem foto de gente a página não tem calor nenhum. Nos dois concorrentes, 80% do impacto visual é foto real de mulher.
2. **Silhuetas de tipo de corpo parecem ícone de banheiro.** Ruim. Tem que ser foto (modelo em 4 tamanhos) como o Paizão.
3. **⚖️ repetido 4× na pergunta de kg** — mesma preguiça do Mounjaro com a balança. Ou foto, ou número grande, ou nada.
4. **Emoji como ícone de opção** fica barato perto dos cards do Paizão. O Paizão não usa nenhum e é mais limpo.
5. **Títulos centralizados** = look de formulário (Mounjaro). Esquerda + tom de conversa (Paizão) lê como mensagem de pessoa.
6. **Sem o header de perfil IG** e **sem a faixa vermelha** — as duas coisas que dão "urgência + pessoa real" em todas as telas.
7. **Progresso real** — o Paizão usa progresso falso que enche rápido.
8. **Loading** com 3 barras de % é o do Mounjaro; o do Paizão (frase + print do feed) vende enquanto espera.
9. **Diagnóstico** é o do Mounjaro (susto + tabela). Falta o antes/depois com foto "dela" + data +28 dias.
10. **Oferta** é boa mas 6.700px sem nenhuma foto/vídeo = parede de texto e caixas. Precisa do bloco Reels no topo.

## 4. Decisão de direção visual

Adotar a **casca do Paizão** com o **conteúdo/oferta do Mounjaro** e o **mecanismo da Canetinha**:

| Elemento | Fazer |
|---|---|
| Fundo | lilás `#f4eeff`, cards brancos |
| Header | perfil IG da nutri: avatar com anel, nome ✓, @handle |
| Faixa | vermelha caixa alta: "SUA AVALIAÇÃO JÁ COMEÇOU — SE VOCÊ SAIR AGORA, SUA VEZ PASSA PRA PRÓXIMA" |
| Progresso | falso, ease-out cúbico, sem contador |
| Títulos | esquerda, bold 22px, 2–3 linhas, tom oral |
| Opções | card branco, radio esquerda, sem emoji |
| Perguntas com foto | 2×2, faixa roxa + →, **mesma modelo** (áreas com marca vermelha / 4 corpos / objetivo) |
| Entrada | direto na pergunta de áreas (sem hero) |
| Loading | frase em 3 batidas + prints do grupo/app |
| Diagnóstico | antes/depois com foto por corpo → objetivo, datas, frase de IMC humanizada + alertas curtos |
| Oferta | bloco Reels (VSL) no topo + página do Mounjaro embaixo |
| Depoimentos | com nome + cidade |

**Caminho crítico = fotos.** Sem a sessão de uma modelo (ou geração por IA com personagem consistente) nada disso ganha vida. Lista exata do que produzir está no doc 04, seção 2.2.
