import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { HSLColor } from "./types";
import { colorsAtom } from "./store";
import { useAtom } from "jotai";

export function ColorInput() {
  const [colors, setColors] = useAtom(colorsAtom);

  console.log(colors);

  function onUpdate({
    field,
    value,
    index,
  }: {
    field: keyof HSLColor;
    value: number;
    index: number;
  }) {
    if (field === "h") {
      // Update hue for all colors
      const newColors = colors.map((color) => ({
        ...color,
        h: value,
      }));
      setColors(newColors);
    } else {
      // Update only the current color for saturation and lightness
      const newColors = colors.map((color, i) => {
        if (i === index) {
          return {
            ...color,
            [field]: value,
          };
        }
        return color;
      });
      setColors(newColors);
    }
  }

  function onRemove(index: number) {
    setColors(colors.filter((_, i) => i !== index));
  }

  return colors.map((color, index) => (
    <div key={index}>
      <div className="flex items-end space-x-2">
        <div className="space-y-2 flex-1">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`h-${index}`}>Matiz (0-360)</Label>
              <Input
                id={`h-${index}`}
                type="number"
                min="0"
                max="360"
                value={color.h}
                onChange={(e) =>
                  onUpdate({
                    field: "h",
                    value: Number.parseInt(e.target.value) || 0,
                    index,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`s-${index}`}>Saturação (0-100)</Label>
              <Input
                id={`s-${index}`}
                type="number"
                min="0"
                max="100"
                value={color.s}
                onChange={(e) =>
                  onUpdate({
                    field: "s",
                    value: Number.parseInt(e.target.value) || 0,
                    index,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`l-${index}`}>Luminosidade (0-100)</Label>
              <Input
                id={`l-${index}`}
                type="number"
                min="0"
                max="100"
                value={color.l}
                onChange={(e) =>
                  onUpdate({
                    field: "l",
                    value: Number.parseInt(e.target.value) || 0,
                    index,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div
          className="w-12 h-12 rounded-md border"
          style={{
            backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
          }}
        />
        <Button variant="outline" size="icon" onClick={() => onRemove(index)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  ));
}
