# 12 — Áudios do funil (copy final pra gravar)

Modelo: os 3 áudios da Fabiana no Mounjaro de Pobre (61s / 78s / 53s — transcrição integral no doc 04, §1.7). O áudio 2 (78s, "o que você vai receber") virou a nossa VSL da oferta (docs 09 e 10) — então gravam-se **2 áudios**.

| Áudio | Onde toca | Função | Modelo | Duração alvo |
|---|---|---|---|---|
| 1 | Etapa **prova** (logo depois do mecanismo ✗/✓ e dos benefícios) | credibilidade + explicar por que responder tudo + fechar o mecanismo por voz | Fabiana áudio 1 (61s) | 55–65s |
| 3 | Oferta, **depois dos depoimentos**, antes do carrossel de prints e do 3º botão | matar a dúvida de quem rolou até o fim e não clicou | Fabiana áudio 3 (53s) | 45–55s |

Slots no código: `CONFIG.assets.audio1` e `CONFIG.assets.audio3` (mp3). O player é estilo WhatsApp com o `avatarRedondo` e o nome em `CONFIG.avatar`.

---

## ÁUDIO 1 — etapa prova (≈160 palavras · 60s)

> Oi, eu sou a nutricionista **[Nome]**, especialista em emagrecimento feminino há mais de dez anos.
>
> Você deve estar se perguntando por que responder tudo isso antes de receber a receita. É porque a combinação e a quantidade mudam pro seu corpo — eu não vou te passar nada genérico da internet.
>
> Você já viu a Virginia, a Jojo, a Maraisa secando na canetinha. O que pouca gente conta é o que vem junto: a canetinha deixa com cara de doente, derrete músculo junto com a gordura, e quando para, o peso volta pior.
>
> Por isso muitas delas trocaram por uma receita natural que faz a mesma coisa na fome — segura a comida no estômago e desliga o sinal de fome — e ainda acelera o metabolismo pra queimar gordura vinte e quatro horas por dia, até dormindo. Derrete a gordura localizada, sem agulha, sem receita e sem os três mil reais por mês.
>
> É isso que eu chamo de **Canetinha de Pobre**.
>
> Responde as próximas perguntas com atenção, que no final eu libero a sua.

**Estrutura (igual à Fabiana):** quem sou (1 frase) → por que as perguntas → mecanismo do problema (3 problemas da caneta) → mecanismo da solução (fome + queima 24h + localizada) → nome → CTA pra continuar.

**Nomes das famosas:** ficam. Está no mecanismo e o Paizão usa (Liz Macedo, Nathalia Valente). Se quiser suavizar juridicamente, troca por "as famosas que você vê no Instagram".

---

## ÁUDIO 3 — oferta, fim (≈160 palavras · 60s)

> Deixa eu adivinhar: você rolou até aqui porque ficou com dúvida, ou meio insegura, né?
>
> Eu entendo. A internet é cheia de golpe, e os bons pagam pelos maus. Só que o protocolo está numa plataforma certificada, com CNPJ ativo, e o acesso chega no seu e-mail na hora.
>
> Por lei são sete dias de garantia. Eu dou trinta. Faço isso porque, se você tomar a Canetinha todo dia do jeito que eu ensino, é impossível a fome não cair nos primeiros dias e o seu corpo não entrar em modo queima de gordura — vinte e quatro horas por dia, até dormindo, derretendo a gordura da barriga e dos culotes sem levar o seu rosto e o seu músculo junto, que é o que a canetinha de três mil faz. E se não acontecer, você manda uma mensagem, eu devolvo cada centavo e você ainda fica com o protocolo.
>
> Trinta e sete e noventa é praticamente uma taxa de comprometimento — pra gente não perder tempo com quem não tem intenção de mudar.
>
> Clica no botão verde, e te vejo lá dentro do grupo.

**Estrutura (igual à Fabiana):** nomeia a dúvida → absolve ("a internet é cheia de golpe") → segurança (plataforma, CNPJ, e-mail) → garantia 7 por lei / 30 → "impossível não…" **+ mecanismo agressivo (queima 24h, até dormindo, localizada, sem rosto/músculo — vs. caneta de 3 mil)** → preço como taxa de comprometimento → CTA + "te vejo no grupo".

**Por que o mecanismo entra na garantia:** a Fabiana não repete o mecanismo no áudio 3, mas o nosso diferencial é exatamente ele; quem chegou até aqui sem clicar precisa ouvir de novo o que vai acontecer no corpo, não só que "tem garantia".

---

## Direção de gravação (o que a Fabiana faz e funciona)

- **Celular, não estúdio.** Gravado como áudio de WhatsApp: microfone do celular, ambiente de casa, um pouco de reverb. Áudio limpo demais soa anúncio.
- **Tom:** conversa com uma amiga, não locução. Ritmo normal de fala, pausas onde tem ponto. Sem música de fundo.
- **Velocidade:** ~2,7 palavras/segundo. Se o áudio 1 passar de 70s, corta o parágrafo das famosas primeiro (o mecanismo já está escrito na tela anterior).
- **Nome:** o `[Nome]` tem que ser o mesmo do `CONFIG.avatar`, do selo "protocolo gerado por" e do rodapé da `/back/`.
- **Formato de entrega:** mp3 mono, 64–96 kbps (tamanho pequeno, carrega rápido no 4G). Nome dos arquivos: `audio1.mp3`, `audio3.mp3` → `site/assets/` → colar o caminho em `CONFIG.assets.audio1/audio3`.
- **Uma frase que NÃO pode faltar em nenhum dos dois:** "Canetinha de Pobre" dita em voz alta. É o nome chiclete; o áudio é onde ele gruda.

## Se quiser um 3º áudio na `/back/`
Não tem no BumbumFlix nem no Paizão — a `/back/` deles é só texto. Não adicionei.
