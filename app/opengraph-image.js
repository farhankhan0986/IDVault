import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IDVault - Digital Identity & Password Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {/* Lock Icon */}
        <div
          style={{
            background: "#000000",
            border: "3px solid #333",
            borderRadius: "32px",
            width: "160px",
            height: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="15" y="45" width="70" height="50" rx="8" fill="white" />
            <path
              d="M28 45 L28 30 Q28 10 50 10 Q72 10 72 30 L72 45"
              fill="none"
              stroke="white"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <circle cx="50" cy="67" r="8" fill="black" />
            <rect x="46" y="67" width="8" height="12" rx="2" fill="black" />
          </svg>
        </div>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "72px",
              fontWeight: "700",
              letterSpacing: "-2px",
            }}
          >
            IDVault
          </span>
          <span
            style={{
              color: "#888888",
              fontSize: "32px",
              fontWeight: "400",
            }}
          >
            Digital ID Card & Password Manager
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
