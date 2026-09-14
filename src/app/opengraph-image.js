import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg,#1B2B4B 0%,#2A4070 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 110, fontWeight: 900, letterSpacing: -4 }}>
          <span style={{ color: "#ffffff" }}>S</span>
          <span style={{ color: "#84cc16", margin: "0 -14px" }}>b</span>
          <span style={{ color: "#ffffff" }}>S</span>
        </div>
        <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#FF6B35", marginTop: 8 }}>
          {SITE_NAME.replace("SbS ", "")}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#cbd5e1", marginTop: 28, maxWidth: 900, lineHeight: 1.4 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
