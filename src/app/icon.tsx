import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * A seal, not a coin: paper ground, engraved ring, and inside it the
 * mechanism — fee in, share out. Built from divs because ImageResponse
 * renders a flexbox subset, not arbitrary SVG.
 */
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
          background: "#efeae0",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            border: "2px solid #14603a",
            borderRadius: 28,
          }}
        >
          <div style={{ display: "flex", width: 5, height: 22, background: "#14120e" }} />
          <div style={{ display: "flex", width: 14, height: 3, background: "#14603a" }} />
          <div
            style={{
              display: "flex",
              width: 6,
              height: 16,
              border: "2px solid #14120e",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
