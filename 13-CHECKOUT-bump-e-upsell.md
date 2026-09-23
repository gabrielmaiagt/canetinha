# 13 — Checkout: banner, order bump e upsell 1

Modelado no checkout real do **Mounjaro de Pobre** (`pay.wiapy.com/f8lnICyM4k`, mesmo ticket de R$ 37,90) + o upsell de desparasitação que a concorrência já roda em cima dessa mesma oferta.

| Posição | Produto | Preço | Modelo |
|---|---|---|---|
| Checkout · banner | — | — | Mounjaro: headline + 4 bullets + 3 antes/depois + 3 selos |
| Checkout · order bump | Shot Acelerador de Intestino | **R$ 9,90** | Mounjaro: "Shots Acelerador de Instestino — R$ 9,90" |
| Pós-compra · upsell 1 | Protocolo Desparasita 7 Dias | **R$ 47** | concorrente do Mounjaro; Paizão roda upsell de R$ 228 sobre R$ 47 |
| Pós-recusa · downsell | mesmo protocolo | **R$ 27** | padrão de 1-clique |

Ticket médio esperado: 37,90 + (30% × 9,90) + (10% × 47) ≈ **R$ 45,60** — sem mexer no funil.

---

## 1. Banner do checkout (topo, antes dos dados)

**Headline:** ELIMINE ATÉ 10 KG DE GORDURA EM 30 DIAS
**Sub:** com a Canetinha de Pobre

**4 bullets (✅ verde, como no Mounjaro):**
- Corta a fome igual a canetinha
- Acelera o metabolismo 24 horas por dia
- Derrete a gordura localizada
- Sem agulha, sem receita, sem R$ 3 mil

**3 fotos antes/depois** com o peso escrito em cada uma (o Mounjaro usa 90kg → 75kg → 60kg).

**3 selos na faixa de baixo:** 🌿 Fórmula 100% natural e segura · 👩 Aprovado por milhares de mulheres · 🔒 Compra segura e privacidade garantida

**Configuração:** Pix como forma de pagamento **padrão** (o Mounjaro abre no Pix, cartão em segundo) e notificação de compra recente ligada, se a Kirvano tiver.

---

## 2. Order bump (R$ 9,90)

Campos pra colar na Kirvano:

**Nome do produto:**
```
Shot Acelerador de Intestino
```

**Chamada (título da caixinha):**
```
APROVEITE E LEVE JUNTO
```

**Descrição:**
```
Elimine mais de 1 kg de gordura pelas fezes tomando esse shot específico antes do almoço. É o que destrava o intestino travado e faz a Canetinha de Pobre agir mais rápido nos primeiros dias.
```

**Preço:** `R$ 9,90` · **Botão:** `Adicionar oferta`

**Por que funciona (o que copiei do Mounjaro):** preço em 26% do ticket · mesmo formato de uso do produto principal (é bebida, tomada antes do almoço) · promessa física e verificável ("mais de 1 kg pelas fezes"), não benefício abstrato.

---

## 3. Upsell 1 — Protocolo Desparasita 7 Dias (R$ 47)

Página de 1 clique, mostrada **depois do pagamento aprovado**. Sem novo cadastro de cartão.

### Barra do topo
```
✅ Pagamento aprovado! Mas não feche essa página — falta 1 passo do seu protocolo.
```

### Headline
```
ESPERA! Tem uma coisa travando o seu intestino — e ela vai segurar o resultado da sua Canetinha.
```

### Corpo (o problema)
```
A sua Canetinha de Pobre já tá liberada. Só que antes de ela começar a queimar gordura, eu preciso te contar uma coisa que eu vejo todo dia nas mulheres que não desincham nas primeiras semanas.

Quando o intestino tá travado e inflamado, o seu corpo segura líquido, segura a barriga estufada e desacelera tudo. Você pode estar comendo certo e tomando a Canetinha todo dia — e mesmo assim a barriga não baixa.

Não é a sua dedicação. É o que tá parado lá dentro.
```

### O que ela recebe
```
Por isso eu montei o Protocolo Desparasita 7 Dias:

✅ O passo a passo de 7 dias pra limpar e destravar o intestino, com ingredientes de mercado
✅ A ordem certa: o que tomar de manhã, o que tomar antes de dormir
✅ A combinação que não corta o efeito da Canetinha (tem coisa que corta — e ninguém te avisa)
✅ O cardápio dos 7 dias pra não atrapalhar o processo
✅ O que esperar dia a dia: quando a barriga baixa, quando o inchaço sai
```

### Ponte com o produto principal
```
Quem faz os 7 dias antes começa a Canetinha com o corpo limpo — e a gordura sai mais rápido, porque não tem nada travando.
```

### Preço
```
De R$ 97 por R$ 47 — só nesta página, só agora, e já no mesmo pagamento que você acabou de fazer.
```

### Botões
```
[ SIM, QUERO DESTRAVAR MEU INTESTINO — R$ 47 ]
não, obrigada — prefiro começar com o intestino do jeito que tá
```

### Garantia
```
Os mesmos 30 dias de garantia. Se não sentir a barriga baixar, devolvo os R$ 47 e você fica com o protocolo.
```

### Rodapé (obrigatório)
```
Este protocolo tem caráter educativo e não substitui orientação médica. Não é medicamento nem tratamento. Consulte um profissional de saúde, especialmente se estiver gestante, amamentando ou em uso de medicamentos.
```

---

## 4. Downsell (R$ 27) — se ela clicar em "não, obrigada"

```
Entendi. Então deixa eu fazer uma coisa por você:

Eu tiro o cardápio dos 7 dias e o suporte, e te deixo só o protocolo — o passo a passo da limpeza — por R$ 27.

É a mesma coisa que faz a barriga baixar. Só sem os extras.

[ TUDO BEM, QUERO POR R$ 27 ]
não, quero seguir só com a Canetinha
```

---

## 5. Tracking (já está pronto no código)

- O bump chega no webhook dentro de `products[]` com `is_order_bump: true` → a função grava em `bumps[]` na mesma venda.
- O upsell é uma venda separada, com `checkout_id` próprio → aparece como `product` diferente. **Cadastrar o id do checkout do upsell e do downsell em `PRODUCT` no arquivo `netlify/functions/kirvano.js`** (hoje só tem principal e backredirect).
- No `/admin`, os quatro aparecem em "Receita por produto" e no ticket médio.

## 6. O que NÃO copiei do Mounjaro
O erro de digitação ("Instestino") e o claim de "1kg pelas fezes" ficou como "mais de 1 kg" no bump porque é o que eles rodam — se quiser reduzir risco, trocar por "elimina o que tá parado no intestino e desincha a barriga já nos primeiros dias".
