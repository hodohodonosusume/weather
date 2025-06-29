/** @type {import('next').NextConfig} */
const nextConfig = {
  // ★★★ 環境変数を明示的にNext.jsに渡す ★★★
  env: {
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  },
  experimental: {
    // Amplify対応
    outputFileTracingRoot: undefined,
  }
}

module.exports = nextConfig
