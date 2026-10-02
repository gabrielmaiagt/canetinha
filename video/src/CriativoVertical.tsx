import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

export const criativoSchema = z.object({
  cartelas: z.array(
    z.object({
      texto: z.string(),
      segundos: z.number().min(0.3),
    }),
  ),
  corDeFundo: z.string(),
  corDoTexto: z.string(),
  corDoDestaque: z.string(),
  // nome do arquivo dentro de public/ (video ou imagem), ou null pra fundo chapado
  midia: z.string().nullable(),
  // nome do arquivo de audio dentro de public/, ou null
  audio: z.string().nullable(),
});

type Props = z.infer<typeof criativoSchema>;

const ehVideo = (arquivo: string) => /\.(mp4|mov|webm|m4v)$/i.test(arquivo);

const Cartela: React.FC<{
  texto: string;
  cor: string;
  ultima: boolean;
  corDoDestaque: string;
}> = ({ texto, cor, ultima, corDoDestaque }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 12 });
  const sobe = interpolate(entrada, [0, 1], [60, 0]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 90,
      }}
    >
      <div
        style={{
          transform: `translateY(${sobe}px)`,
          opacity: entrada,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 92,
          lineHeight: 1.1,
          textAlign: "center",
          color: ultima ? corDoDestaque : cor,
          textShadow: "0 6px 30px rgba(0,0,0,0.6)",
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};

export const CriativoVertical: React.FC<Props> = ({
  cartelas,
  corDeFundo,
  corDoTexto,
  corDoDestaque,
  midia,
  audio,
}) => {
  const { fps } = useVideoConfig();

  let cursor = 0;
  const blocos = cartelas.map((cartela, i) => {
    const de = cursor;
    const duracao = Math.round(cartela.segundos * fps);
    cursor += duracao;
    return { ...cartela, de, duracao, ultima: i === cartelas.length - 1 };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: corDeFundo }}>
      {midia ? (
        ehVideo(midia) ? (
          <OffthreadVideo src={staticFile(midia)} style={{ objectFit: "cover" }} />
        ) : (
          <Img src={staticFile(midia)} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
        )
      ) : null}

      {/* escurece o fundo pra legenda continuar legivel */}
      {midia ? (
        <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.35)" }} />
      ) : null}

      {audio ? <Audio src={staticFile(audio)} /> : null}

      {blocos.map((bloco) => (
        <Sequence key={bloco.de} from={bloco.de} durationInFrames={bloco.duracao}>
          <Cartela
            texto={bloco.texto}
            cor={corDoTexto}
            ultima={bloco.ultima}
            corDoDestaque={corDoDestaque}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
