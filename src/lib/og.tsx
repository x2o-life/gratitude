import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "Gratitude: get rewarded at the places you already love.";

/** The share card used for Open Graph and Twitter previews. */
export async function renderOgImage() {
  const svg = await readFile(join(process.cwd(), "public/gratitude-white.svg"));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#fafafa",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(22,22,29,0.12) 1.5px, transparent 0)",
        backgroundSize: "28px 28px",
        color: "#16161d",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* biome-ignore lint/performance/noImgElement: rendered by Satori, not the browser */}
        <img src={logo} width={84} height={87} alt="" />
        <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>
          Gratitude
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 80,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -3,
          }}
        >
          <span>Get rewarded at the places</span>
          <span style={{ display: "flex" }}>
            you already&nbsp;<span style={{ color: "#8b5cf6" }}>love.</span>
          </span>
        </div>
        <div style={{ fontSize: 32, color: "#55555f", maxWidth: 900 }}>
          One Pass for every stamp, point and treat. Just give your number at
          the counter.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 26,
        }}
      >
        <span
          style={{
            display: "flex",
            padding: "10px 22px",
            border: "3px solid #16161d",
            borderRadius: 999,
            background: "#8b5cf6",
            color: "#fff",
            boxShadow: "5px 5px 0 0 #16161d",
          }}
        >
          {SITE.url.replace("https://", "")}
        </span>
        <span style={{ color: "#55555f" }}>Made in Sri Lanka</span>
      </div>
    </div>,
    OG_SIZE,
  );
}
