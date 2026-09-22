# Canetinha de Pobre — funil

Quiz de 22 etapas + página de oferta, arquivo único (`site/index.html`), com painel `/admin` lendo do Firestore.

- `site/index.html` — o funil. Tudo configurável no bloco `CONFIG` no topo (checkout, avatar, preço, VSL, split dos testes A/B, Firebase, assets).
- `site/admin/index.html` — painel: fluxo por etapa, quedas, testes A/B, personalização, respostas, UTM, tempos, sessões. `?demo=1` mostra dados sintéticos.
- `site/firestore.rules` + `site/ADMIN-SETUP.md` — segurança e setup do Firebase.
- `01…11-*.md` — análises dos funis de referência, mecanismo, prompts de imagem, roteiros de VSL.
- `funil-canetinha.json` / `build_funil.py` — versão importável no InLead.

Deploy: subir a pasta `site/` (Vercel/Netlify). Variantes: `?v=landing|pergunta`, `?ab=A|B`.
