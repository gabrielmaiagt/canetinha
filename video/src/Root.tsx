import { Composition } from "remotion";
import { CriativoVertical, criativoSchema } from "./CriativoVertical";

const FPS = 30;

export const Root = () => {
  return (
    <>
      <Composition
        id="criativo-vertical"
        component={CriativoVertical}
        durationInFrames={FPS * 12}
        fps={FPS}
        width={1080}
        height={1920}
        schema={criativoSchema}
        defaultProps={{
          cartelas: [
            { texto: "Ela gastou R$ 1.200 na caneta", segundos: 2.5 },
            { texto: "e tomou o mesmo que tem na sua cozinha", segundos: 3 },
            { texto: "a receita custa R$ 9", segundos: 2.5 },
          ],
          corDeFundo: "#0b0b0c",
          corDoTexto: "#ffffff",
          corDoDestaque: "#ffd84d",
          midia: null,
          audio: null,
        }}
      />
    </>
  );
};
