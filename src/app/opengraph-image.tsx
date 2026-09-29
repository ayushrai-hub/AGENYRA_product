import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "AGENYRA — The distribution layer for AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0a0a09";
const FG = "#eceae4";
const MUTED = "#8a877f";
const LINE = "#252420";
const SIGNAL = "#ff6a2b";

export default async function OpenGraphImage() {
  const fonts = join(process.cwd(), "src/assets/fonts");
  const [serif, mono] = await Promise.all([
    readFile(join(fonts, "newsreader-og.woff")),
    readFile(join(fonts, "plex-mono-og.woff")),
  ]);

  const steps = ["BUILD", "DISTRIBUTE", "DISCOVER", "USE", "LEARN"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          backgroundImage: `linear-gradient(to right, ${LINE} 1px, transparent 1px), linear-gradient(to bottom, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          padding: "64px 72px",
          color: FG,
          fontFamily: "Plex Mono",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
              <rect x="1.5" y="8.5" width="3" height="3" fill={FG} />
              <path d="M4.5 10 H9 M9 10 L15 3.5 M9 10 H15 M9 10 L15 16.5" stroke={FG} strokeWidth="1.25" />
              <rect x="15" y="2" width="3" height="3" fill={SIGNAL} />
              <rect x="15" y="8.5" width="3" height="3" fill={FG} />
              <rect x="15" y="15" width="3" height="3" fill={FG} />
            </svg>
            <span style={{ letterSpacing: 6 }}>AGENYRA</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: MUTED, fontSize: 18, letterSpacing: 3 }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: SIGNAL }} />
            PRIVATE BUILD
          </div>
        </div>

        <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 104, lineHeight: 1, letterSpacing: -2, maxWidth: 900 }}>
          The distribution layer for AI.
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 18, color: MUTED, letterSpacing: 3 }}>
          <div style={{ display: "flex", gap: 14 }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: "flex", gap: 14, color: i === 0 ? FG : MUTED }}>
                {s}
                {i < steps.length - 1 ? <span style={{ color: SIGNAL }}>→</span> : null}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>agenyra.space</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, weight: 400, style: "normal" },
        { name: "Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
