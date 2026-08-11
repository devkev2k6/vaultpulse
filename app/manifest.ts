import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VaultPulse AI — Financial Intelligence Platform",
    short_name: "VaultPulse",
    description:
      "Unified AI financial health predictor, live e-commerce trust/price companion, and automated subscription dispute auditor.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#38BDF8",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
