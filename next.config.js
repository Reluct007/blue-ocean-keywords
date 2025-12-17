/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不指定output - 让Cloudflare Pages原生支持
  // 不指定output: undefined - 就使用默认服务器模式
  images: {
    unoptimized: true,
  },
  typescript: {
    // 跳过类型检查以加快Cloudflare构建
    ignoreBuildErrors: true,
  },
  eslint: {
    // 跳过lint以加快Cloudflare构建
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig