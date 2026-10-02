# Vídeo (Remotion)

Criativos de vídeo do funil, feitos em React e renderizados em mp4. Fica fora do deploy:
o Netlify publica só `site/`, sem build.

## Comandos

```bash
cd video
npm run studio                                  # abre o editor visual em localhost:3000
npm run render criativo-vertical out/criativo.mp4
npm run still  criativo-vertical out/frame.png --frame=60
```

Render com props diferentes (sem mexer no código):

```bash
npx remotion render criativo-vertical out/v2.mp4 \
  --props='{"cartelas":[{"texto":"gancho novo","segundos":2.5}],"corDeFundo":"#0b0b0c","corDoTexto":"#fff","corDoDestaque":"#ffd84d","midia":null,"audio":null}'
```

## Estrutura

- `src/Root.tsx` — lista as composições e os props padrão
- `src/CriativoVertical.tsx` — a composição 1080x1920, 30fps
- `public/` — vídeos, imagens e áudios usados nas composições (referenciados por `staticFile("nome.mp4")`)
- `out/` — renders, fora do git

## Props da composição

| prop | o que faz |
| --- | --- |
| `cartelas` | lista de `{ texto, segundos }`, uma legenda por vez; a última sai na cor de destaque |
| `midia` | arquivo em `public/` (mp4/mov/webm ou imagem) como fundo, ou `null` pra fundo chapado |
| `audio` | arquivo de áudio em `public/`, ou `null` |
| `corDeFundo`, `corDoTexto`, `corDoDestaque` | cores |

A duração total em `Root.tsx` (`durationInFrames`) é fixa em 12s; se somar mais segundos
nas cartelas, aumenta lá também.

## Licença

Remotion é grátis pra pessoa física e empresa de até 3 pessoas. Acima disso precisa de
licença da Remotion: https://remotion.dev/license
