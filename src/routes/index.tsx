import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast, Toaster } from "sonner";

import { ColorConfigurationCard } from "../components/color-palette/ColorConfigurationCard";
import { ColorPalettePreview } from "../components/color-palette/ColorPalettePreview";
import { GlobalHueAdjuster } from "../components/color-palette/GlobalHueAdjuster";
import { PageHeader } from "../components/color-palette/PageHeader";
import type {
  ColorPaletteMode,
  HSLColor,
} from "../components/color-palette/types";
import {
  encodePaletteToUrl,
  getDarkColors,
  getLightColors,
} from "../components/color-palette/colorUtils";

export const Route = createFileRoute("/")({
  component: ColorPaletteGenerator,
});

export default function ColorPaletteGenerator() {
  const [colors, setColors] = useState<HSLColor[]>([
    { h: 222, s: 50, l: 10 },
    { h: 222, s: 50, l: 70 },
    { h: 222, s: 50, l: 90 },
  ]);

  // Função para copiar URL com a paleta atual
  const shareUrl = () => {
    const encoded = encodePaletteToUrl(colors);
    const url = `${window.location.origin}${window.location.pathname}?p=${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success("URL da paleta copiada para a área de transferência");
  };

  const addColor = () => {
    setColors([...colors, { h: 200, s: 100, l: 50 }]);
  };

  const removeColor = (index: number) => {
    if (colors.length > 1) {
      setColors(colors.filter((_, i) => i !== index));
    } else {
      toast.error("Você precisa manter pelo menos uma cor na paleta");
    }
  };

  const updateColor = (index: number, field: keyof HSLColor, value: number) => {
    const newColors = [...colors];

    // Garante que os valores estejam dentro dos limites válidos
    if (field === "h") {
      value = Math.max(0, Math.min(360, value));
    } else if (field === "s" || field === "l") {
      value = Math.max(0, Math.min(100, value));
    }

    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
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

  const updateGlobalHue = (shift: number) => {
    const newColors = colors.map((color) => {
      return {
        ...color,
        h: shift,
      };
    });

    setColors(newColors);
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
