# 15 — O app do entregável (`/minha-canetinha`)

É o produto: o que a compradora recebe depois de pagar. Arquivo único, sem backend, funciona offline depois de aberto uma vez.

## O que tem dentro
| Aba | O que faz |
|---|---|
| **Hoje** | dia X de 21, sequência de dias seguidos, 5 metas diárias com anel de progresso, o horário e a dose calculados pra ela, e a missão do dia |
| **Receita** | ingredientes com a dose por peso, preparo em 5 passos, por que corta a fome, 4 variações de sabor e as 4 regras |
| **21 dias** | grade dos 21 dias (os futuros ficam bloqueados), com a missão de cada dia aberta conforme chega |
| **Peso** | registro diário, quanto já saiu desde o começo e gráfico dos últimos 8 registros |
| **Mais** | Protocolo Sem Cara de Doente, Anti Efeito Sanfona, FAQ com 9 perguntas, grupo VIP e suporte |

Isso cobre os 6 argumentos da oferta: receita, sem cara de doente, metas diárias, anti-sanfona, desafio de 21 dias e grupo VIP.

## A receita
Bebida de fibra hidratada, tomada 30 minutos antes da janela de fome dela.

- **Chia** (ou psyllium) hidratada 10 minutos em água gelada → vira gel, ocupa volume no estômago e atrasa o esvaziamento
- **Limão**, **canela** e **gengibre** → sabor, e a parte termogênica do discurso
- **Dose por peso:** até 70 kg = 1 colher de sopa / 70 a 90 kg = 1 colher e meia / acima de 90 kg = 2 colheres. A água acompanha (200, 250 e 300 ml)

O mecanismo bate com o que o funil promete: o gel segura a comida e desliga o sinal de fome, que é o mesmo sinal que a canetinha de farmácia força com agulha.

## Personalização
Na primeira abertura pergunta peso e momento da fome (30 segundos). Se o checkout mandar `?peso=82&fome=noite`, ela pula o setup. Tudo fica em `localStorage`, nada sai do aparelho.

## Falta ligar
- `CONFIG.whatsapp` → link do grupo VIP
- `CONFIG.suporte` → WhatsApp do suporte
- Entregar o link na Kirvano como produto digital (área de membros externa)
- Se quiser, trocar o slug por algo menos adivinhável
