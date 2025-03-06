import { Copy, Download } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { ColorPaletteMode, HSLColor } from "./types";
import { useAtom, useAtomValue } from "jotai";
import { colorsAtom } from "./store";

type ColorPalettePreviewProps = {
  mode: ColorPaletteMode;
  colors: HSLColor[];
  onCopy: (mode: ColorPaletteMode) => void;
  onDownload: (mode: ColorPaletteMode) => void;
};

export function ColorPalettePreview({
  mode,
  onCopy,
  onDownload,
}: ColorPalettePreviewProps) {
  const colors = useAtomValue(colorsAtom);

  const isDark = mode === "dark";
  const title = isDark ? "Paleta do Modo Escuro" : "Paleta do Modo Claro";
  const bgClass = isDark ? "bg-[#222] text-white" : "bg-white";
  const colorDisplayBg = isDark ? "bg-white text-black" : "bg-[#222]";
  const colorDisplayTextColor = isDark ? "" : "text-white";

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onCopy(mode)}>
              <Copy className="mr-2 h-4 w-4" /> Copiar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(mode)}
            >
              <Download className="mr-2 h-4 w-4" /> Baixar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`grid grid-cols-1 gap-4 ${bgClass} p-4 rounded-lg border ${
            isDark ? "border-gray-700" : ""
          }`}
        >
          {colors.map((color, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <BackgroundColor index={index} />
              <div className={`p-3 ${colorDisplayBg}`}>
                <p className={`font-mono text-sm ${colorDisplayTextColor}`}>
                  `hsl(${color.h}, ${color.s}%, ${color.l}%)`
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BackgroundColor({ index }: { index: number }) {
  const colors = useAtomValue(colorsAtom);

  const hsl = `hsl(${colors[index].h}, ${colors[index].s}%, ${colors[index].l}%)`;

  console.log(hsl);

  return (
    <div
      className="h-16"
      style={{
        backgroundColor: hsl,
      }}
    />
  );
}
