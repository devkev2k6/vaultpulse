import { Theme } from "./types";

export interface ThemeMeta {
  id: Theme;
  name: string;
  badge: string;
  primaryHex: string;
  accentHex: string;
  bgHex: string;
}

export const THEME_PRESETS: ThemeMeta[] = [
  {
    id: "dark",
    name: "Dark Matte",
    badge: "Default",
    primaryHex: "#0B0C0E",
    accentHex: "#ADFF2F",
    bgHex: "#0B0C0E",
  },
  {
    id: "light",
    name: "Light Crisp",
    badge: "Clean",
    primaryHex: "#F4F4F0",
    accentHex: "#0F5132",
    bgHex: "#F4F4F0",
  },
  {
    id: "cyberpunk",
    name: "Cyber Neon",
    badge: "Futuristic",
    primaryHex: "#050814",
    accentHex: "#00F0FF",
    bgHex: "#050814",
  },
  {
    id: "emerald",
    name: "Emerald Luxe",
    badge: "Premium",
    primaryHex: "#06140E",
    accentHex: "#00FF9D",
    bgHex: "#06140E",
  },
  {
    id: "midnight",
    name: "Midnight Gold",
    badge: "VIP",
    primaryHex: "#0D0D11",
    accentHex: "#FBBF24",
    bgHex: "#0D0D11",
  },
];
