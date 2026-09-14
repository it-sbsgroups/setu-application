import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B2B4B",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 96, fontWeight: 900 }}>
          <span style={{ color: "#ffffff" }}>S</span>
          <span style={{ color: "#84cc16", margin: "0 -10px" }}>b</span>
          <span style={{ color: "#ffffff" }}>S</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
