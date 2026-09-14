import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 20, fontWeight: 900 }}>
          <span style={{ color: "#ffffff" }}>S</span>
          <span style={{ color: "#84cc16", margin: "0 -2px" }}>b</span>
          <span style={{ color: "#ffffff" }}>S</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
