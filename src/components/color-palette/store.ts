import { atom } from "jotai";
import type { HSLColor } from "./types";

export const colorsAtom = atom<HSLColor[]>([
  { h: 222, s: 50, l: 10 },
  { h: 222, s: 50, l: 70 },
  { h: 222, s: 50, l: 90 },
]);
