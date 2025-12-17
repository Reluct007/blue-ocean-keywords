/** @type {import('next').NextConfig} */
const nextConfig = {
  // 使用静态导出 - 最兼容Cloudflare Pages的方案
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 完全禁用控制台清理以确保调错
  compiler: {
    removeConsole: false,
  },
  // 安全头部
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
}

module.exports = nextConfig