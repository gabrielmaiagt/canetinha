# Setup do rastreamento + /admin (Firestore)

## 1. Projeto Firebase (5 min)
1. https://console.firebase.google.com → **Adicionar projeto** (ex.: `canetinha`). Analytics pode desligar.
2. **Build → Firestore Database → Criar banco** → modo produção → região `southamerica-east1` (São Paulo).
3. **Build → Authentication → Começar → Sign-in method**:
   - ative **Anônimo** (é como o funil grava as sessões)
   - ative **E-mail/senha** (é como você entra no /admin)
4. **Authentication → Users → Adicionar usuário**: seu e-mail + senha (esse e-mail precisa estar na lista `isAdmin()` do `firestore.rules`).
5. **Configurações do projeto (engrenagem) → Seus apps → Web (</>)** → registrar app → copiar o `firebaseConfig`:
   ```js
   { apiKey: "AIza…", authDomain: "canetinha.firebaseapp.com", projectId: "canetinha", appId: "1:…:web:…" }
   ```

## 2. Colar o config
- `site/index.html` → `CONFIG.firebase = { apiKey, authDomain, projectId, appId }`
- `site/admin/index.html` → `const FIREBASE = { … }` (o mesmo)

Sem config, o funil roda normal e não grava nada; o admin abre em modo demo.

## 3. Regras de segurança
- Firestore → aba **Regras** → colar o conteúdo de `site/firestore.rules` → Publicar.
- Editar a lista de e-mails em `isAdmin()`.

## 4. Índice (o painel filtra por dia)
Na primeira leitura o console mostra um link "the query requires an index" — clica e cria (campo `day`, desc). Ou: Firestore → Índices → composto → coleção `sessions`, campo `day` DESC.

## 5. Domínio autorizado
Authentication → Settings → **Authorized domains** → adicionar o domínio do funil (ex.: `quiz.canetinhadepobre.com`) e do admin.

## 6. O que fica gravado (1 documento por sessão em `sessions/{sid}`)
| Campo | O que é |
|---|---|
| `sid`, `uid`, `createdAt`, `updatedAt`, `day` | identidade e datas |
| `entry` (`landing`/`pergunta`), `vsl` (`A`/`B`) | variantes sorteadas |
| `utm_*`, `ref`, `ua`, `mobile` | origem |
| `answers.{pergunta}` | cada resposta (áreas e benefícios são listas) |
| `steps.{etapa}` = `{ i, t }` | cada etapa vista e o segundo em que chegou |
| `maxStep`, `maxStepId`, `completed` | até onde foi; `completed` = chegou no diagnóstico |
| `imc`, `faixa`, `horario`, `falta`, `corpo` | o que o funil calculou |
| `offerViewed`, `offerAt`, `checkoutClicked`, `checkoutAt`, `ctaN`, `checkoutClicks`, `audio.*` | oferta e ação |

~25 escritas por sessão. No plano gratuito (20 mil escritas/dia) cabem ~800 sessões/dia; acima disso é Blaze (centavos).

## 7. Testes A/B pelo admin
Painel → **Configuração dos testes** → % da landing, % da VSL B, versão, vagas → Salvar. Grava em `config/funnel`; o funil lê ao abrir. Mudar a **versão** re-sorteia todo mundo (a escolha fica salva no navegador da pessoa por versão). Forçar na mão: `?v=landing`, `?v=pergunta`, `?ab=A`, `?ab=B`.

## 8. Venda (Kirvano → webhook → Firestore `sales`)

Checkouts: principal R$ 37,90 `pay.kirvano.com/3d91f533-…` · backredirect R$ 24,90 `pay.kirvano.com/be75b426-…` (já em `CONFIG.checkout` e `back/CONFIG.checkoutBack`).

A Kirvano só devolve no webhook as `utm_*` e o `src`. Por isso o botão manda `src=oferta|A|pergunta|<sid>` (e o back `bk-vsl|…` / `bk-bk|…`): a função separa em `src`, `ab`, `entry`, `sid` e cruza com a sessão.

1. **Service account nova** (a antiga você apagou): Google Cloud → IAM → Service accounts → `firebase-adminsdk-…` → Keys → Add key (JSON). Converter em base64: `base64 -i arquivo.json | pbcopy`.
2. **Netlify → Site → Environment variables:** `FIREBASE_SERVICE_ACCOUNT` = (o base64) · `KIRVANO_TOKEN` = uma string longa qualquer (ex.: `openssl rand -hex 24`).
3. **Kirvano → Configurações → Webhooks → Novo:** URL `https://SEU-DOMINIO/.netlify/functions/kirvano?token=<KIRVANO_TOKEN>` · marcar todos os eventos (aprovada, recusada, reembolso, chargeback, pix gerado, carrinho abandonado) · nos dois produtos.
4. Deploy. Teste com "Enviar evento de teste" na Kirvano e confira em Firestore → `sales`.

Cada venda vira `sales/{sale_id}`: `at, day, status (aprovada/PENDING/REFUSED/CANCELED/REFUNDED/CHARGEBACK/ABANDONED_CART), value, product (principal/backredirect), bumps[], payment, source/medium/campaign/content/term, src, ab, entry, sid, customer{name,email,phone}`. A sessão ganha `sale{…}` e `purchased: true` quando aprovada — o admin usa isso pra CVR por VSL, entrada e segmento.

## 9. Publicar no Netlify
1. https://app.netlify.com → **Add new site → Import an existing project → GitHub → `gabrielmaiagt/canetinha`**.
2. O `netlify.toml` na raiz já define `publish = site` e sem build. Só confirmar e **Deploy**.
3. Anota o domínio gerado (`algo.netlify.app`) e depois liga o domínio próprio em **Domain management**.
4. **Obrigatório**: Firebase → Authentication → Settings → **Authorized domains** → adicionar o `algo.netlify.app` **e** o domínio próprio. Sem isso o login anônimo falha em produção e o funil não grava nada (o quiz continua funcionando, só não mede).
5. Testar: abrir o funil no celular, responder 2 perguntas, abrir `/admin` e ver a sessão.

Cada `git push` na `main` publica sozinho. Rotas: `/` = funil · `/admin` = painel · `?v=landing|pergunta` e `?ab=A|B` forçam variantes.


## 10. Backredirect (`/back/`)

Modelo: `bumbum-pessego.com/back/` (BumbumFlix) — mesma mecânica do R$ 27 do Paizão, sem perder UTM.

- **Como funciona:** na oferta o funil empilha 5 `history.pushState`. "Voltar" → `/back/?utm…&sid&ab&entry&imc`. Na `/back/`, "voltar" de novo, sair pelo topo (desktop) ou voltar pelo bfcache → checkout direto com `src=bk-bk`. O botão da página manda `src=bk-vsl`.
- **UTMs:** o funil e a `/back/` guardam `location.search` em `localStorage.utm_query`; se a URL chegar limpa, recupera de lá.
- **Config:** `site/back/index.html` → `CONFIG.checkoutBack` (link do produto a R$ 24,90), `cupom`, `price`, `priceBefore`, `off`, `photo`, `giftImg`. Pra desligar: `CONFIG.backredirect = false` em `site/index.html`.
- **Firestore:** grava na mesma sessão (`sessions/{sid}`): `backLeft` (apertou voltar), `backViewed`, `backOpened` (abriu o presente), `backCheckout` = `bk-vsl` | `bk-bk`, `backCta`.
- **Webhook de venda:** mandar `product: "backredirect"` e, se der, `src` (vem na URL do checkout) pra separar botão × voltar-de-novo.
- **Testar:** abrir `/index.html?s=21` (oferta), apertar voltar.


## 11. Upsell e downsell (`/upsell/`)

Página de 1 clique mostrada depois do pagamento aprovado. Dois estados na mesma página: upsell R$ 47 → se recusar, downsell R$ 27. Copy e racional no doc `13-CHECKOUT-bump-e-upsell.md`.

1. **Kirvano:** criar os produtos "Protocolo Desparasita 7 Dias" (R$ 47) e a versão downsell (R$ 27), com upsell de 1 clique ativado, e pegar os links de oferta de cada um.
2. **Colar em `site/upsell/index.html` → `CONFIG`:** `linkSim` (R$ 47), `linkSim2` (R$ 27), `linkFim` (pra onde vai quem recusa tudo — área de membros ou página de obrigado) e, se gravar, `vsl` (embed de 40s).
3. **No produto principal da Kirvano**, apontar a página de obrigado / pós-compra para `https://SEU-DOMINIO/upsell/` (passando os parâmetros da compra, se a plataforma permitir — é assim que o `sid` chega).
4. **Order bump** (R$ 9,90, "Shot Acelerador de Intestino") é configurado dentro do produto principal, não tem página.
5. Registrar os `checkout_id` do upsell e do downsell em `PRODUCT`, em `netlify/functions/kirvano.js`.

Grava na mesma sessão: `upsellViewed`, `upsellClicked`, `upsellRecusado`, `downsellViewed`, `downsellClicked`, `downsellRecusado`.
