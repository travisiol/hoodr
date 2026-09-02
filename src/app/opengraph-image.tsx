import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card that actually circulates on X, so the affiliation line is printed
 * on it rather than left for whoever clicks through. Everything else is the
 * certificate: paper, a double frame, and no figures.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 28,
          background: "#efeae0",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid rgba(20,18,14,0.3)",
            padding: 46,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 20,
              letterSpacing: 5,
              color: "rgba(20,18,14,0.45)",
            }}
          >
            <div style={{ display: "flex" }}>
              ROBINHOOD CHAIN · BEARER TOKEN
            </div>
            <div style={{ display: "flex", color: "#a3372a" }}>NOT ISSUED</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 190,
                letterSpacing: -4,
                color: "#14120e",
                lineHeight: 1,
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 38,
                letterSpacing: 2,
                color: "#14603a",
              }}
            >
              {siteConfig.tagline}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 18,
              letterSpacing: 2,
              color: "rgba(20,18,14,0.45)",
            }}
          >
            <div style={{ display: "flex", maxWidth: 720 }}>
              Independent project. Not affiliated with, endorsed by or
              connected to Robinhood Markets, Inc.
            </div>
            <div style={{ display: "flex" }}>NO BRIDGE</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
