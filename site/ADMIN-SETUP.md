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

## 8. Venda
O clique no checkout é o último evento aqui. A URL do checkout leva `sid`, `ab`, `entry`, `imc` e as UTMs — na Payt/Wiapy/Kirvano você cruza a venda com a sessão pelo `sid` (ou pelo UTMify, que casa pelo texto do botão).

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
