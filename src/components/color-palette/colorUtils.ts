import type { HSLColor } from "./types";

export const convertLightness = (l: number): number => {
  return 100 - l;
};

export const getDarkColors = (colors: HSLColor[]): HSLColor[] => {
  console.log({
    h: colors[0].h,
    newH: (colors[0].h + 60) % 360,
  });
  const newColors = colors.map((color) => ({
    h: (color.h + 60) % 360, // Add 60 to hue and keep it within 0-360 range
    s: color.s,
    l: color.l,
  }));
  console.log({
    newColors,
  });
  return newColors;
};

export const getLightColors = (colors: HSLColor[]): HSLColor[] => {
  return colors.map((color) => ({
    h: color.h,
    s: color.s,
    l: convertLightness(color.l),
  }));
};

export const encodePaletteToUrl = (colors: HSLColor[]): string => {
  const data = {
    colors: colors.map((c) => `${c.h},${c.s},${c.l}`).join(";"),
  };
  return encodeURIComponent(JSON.stringify(data));
};
