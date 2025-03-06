import { useAtom } from "jotai";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Slider } from "../ui/slider";
import { colorsAtom } from "./store";

export function GlobalHueAdjuster() {
  const [colors, setColors] = useAtom(colorsAtom);
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Ajuste Global de Matiz</CardTitle>
        <CardDescription>
          Deslize para ajustar o matiz de todas as cores mantendo suas relações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Slider
          defaultValue={[colors[0].h]}
          max={360}
          step={1}
          onValueChange={(value) =>
            setColors(colors.map((color) => ({ ...color, h: value[0] })))
          }
        />
      </CardContent>
    </Card>
  );
}
