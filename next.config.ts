import type { NextConfig } from "next";

// Content Security Policy and security headers (H3).
// Notes:
// - script-src 'unsafe-inline': Next.js (app router, production) may emit
//   inline runtime scripts with nonces under strict mode, but enabling strict
//   nonce CSP here is risky without a full test pass on the deployed build.
//   'unsafe-inline' is the conservative, working-default choice; tighten to
//   nonce-based CSP later once verified against a prod build.
// - connect-src 'self' only — the browser never talks to Telegram; the
//   server-side route does. No external fetches from the client.
// - img-src includes data: for inline placeholders and https: for any
//   future CDN-hosted assets.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;