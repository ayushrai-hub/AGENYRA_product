import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0a09" }}>
        <svg width="180" height="180" viewBox="0 0 32 32" fill="none">
          <rect x="5" y="14.5" width="3" height="3" fill="#eceae4" />
          <path d="M8 16h5m0 0 7-7.5M13 16h7m-7 0 7 7.5" stroke="#eceae4" strokeWidth="1.5" />
          <rect x="20" y="7" width="3.5" height="3.5" fill="#ff6a2b" />
          <rect x="20" y="14.25" width="3.5" height="3.5" fill="#eceae4" />
          <rect x="20" y="21.5" width="3.5" height="3.5" fill="#eceae4" />
        </svg>
      </div>
    ),
    size,
  );
}
