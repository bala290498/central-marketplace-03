import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

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
          background: "linear-gradient(135deg, #FF6B00 0%, #F97316 50%, #EA580C 100%)",
          borderRadius: "40px",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: "84px",
          letterSpacing: "-0.04em",
          boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.4)",
        }}
      >
        CM
      </div>
    ),
    {
      ...size,
    }
  );
}
