import type { HSLColor } from "./types";

export const convertLightness = (l: number): number => {
  return 100 - l;
};

export const getDarkColors = (colors: HSLColor[]): HSLColor[] => {
  return colors;
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
