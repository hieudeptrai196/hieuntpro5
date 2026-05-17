import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Backend Developer`,
    short_name: "NTH Dev",
    description: siteConfig.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#010a13",
    theme_color: "#010a13",
    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
