import { useSetAtom } from "jotai";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ColorInput } from "./ColorInput";
import { colorsAtom } from "./store";

export function ColorConfigurationCard() {
  const setColors = useSetAtom(colorsAtom);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração de Cores</CardTitle>
        <CardDescription>
          Ajuste suas cores HSL e veja-as nos modos escuro e claro
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <ColorInput />
        </div>

        <Button
          onClick={() =>
            setColors((colors) => [...colors, { h: 222, s: 50, l: 10 }])
          }
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Cor
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          No modo claro, os valores de luminosidade são invertidos (100 - L).
        </p>
      </CardFooter>
    </Card>
  );
}
