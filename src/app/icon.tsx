import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

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
          background: "linear-gradient(135deg, #FF6B00 0%, #F97316 50%, #EA580C 100%)",
          borderRadius: "8px",
          color: "#FFFFFF",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: "16px",
          letterSpacing: "-0.04em",
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
