import { createFileRoute } from "@tanstack/react-router";
import { toast, Toaster } from "sonner";

import { colorsAtom } from "@/components/color-palette/store";
import { useAtomValue } from "jotai";
import { ColorConfigurationCard } from "../components/color-palette/ColorConfigurationCard";
import { ColorPalettePreview } from "../components/color-palette/ColorPalettePreview";
import {
  encodePaletteToUrl,
  getDarkColors,
  getLightColors,
} from "../components/color-palette/colorUtils";
import { GlobalHueAdjuster } from "../components/color-palette/GlobalHueAdjuster";
import { PageHeader } from "../components/color-palette/PageHeader";
import type { ColorPaletteMode } from "../components/color-palette/types";

export const Route = createFileRoute("/")({
  component: ColorPaletteGenerator,
});

export default function ColorPaletteGenerator() {
  const colors = useAtomValue(colorsAtom);

  // Função para copiar URL com a paleta atual
  const shareUrl = () => {
    const encoded = encodePaletteToUrl(colors);
    const url = `${window.location.origin}${window.location.pathname}?p=${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success("URL da paleta copiada para a área de transferência");
  };

  const copyToClipboard = (mode: ColorPaletteMode) => {
    const colorsToUse =
      mode === "dark" ? getDarkColors(colors) : getLightColors(colors);
    const colorStrings = colorsToUse.map(
      (color) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`
    );
    navigator.clipboard.writeText(colorStrings.join("\n"));
    toast.success(
      `A paleta do modo ${mode === "dark" ? "escuro" : "claro"} foi copiada.`
    );
  };

  const downloadPalette = (mode: ColorPaletteMode) => {
    const colorsToUse =
      mode === "dark" ? getDarkColors(colors) : getLightColors(colors);
    const colorStrings = colorsToUse.map(
      (color) => `hsl(${color.h}, ${color.s}%, ${color.l}%)`
    );
    const content = colorStrings.join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `paleta-de-cores-${mode === "dark" ? "escuro" : "claro"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(
      `Sua paleta do modo ${mode === "dark" ? "escuro" : "claro"} foi baixada.`
    );
  };

  const darkColors = getDarkColors(colors);
  const lightColors = getLightColors(colors);

  return (
    <div className="container mx-auto py-10 space-y-8">
      <PageHeader onShare={shareUrl} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna da Esquerda: Controles */}
        <div className="space-y-8">
          <GlobalHueAdjuster />

          <ColorConfigurationCard />
        </div>

        {/* Coluna da Direita: Preview das Paletas */}
        <div className="space-y-8">
          <ColorPalettePreview
            mode="dark"
            colors={darkColors}
            onCopy={copyToClipboard}
            onDownload={downloadPalette}
          />

          <ColorPalettePreview
            mode="light"
            colors={lightColors}
            onCopy={copyToClipboard}
            onDownload={downloadPalette}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
