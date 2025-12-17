#!/bin/bash

echo "🌊 蓝海关键词分析工具 - 快速启动脚本"
echo "======================================"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到 Node.js"
    echo "请先安装 Node.js 20+ 版本"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未检测到 npm"
    exit 1
fi

# 检查 Node 版本
NODE_VERSION=$(node -v | cut -d'v' -f2)
MIN_VERSION="20.0.0"

if [ "$(printf '%s\n' "$MIN_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$MIN_VERSION" ]; then
    echo "⚠️  警告: Node.js 版本要求 20+，当前版本: $NODE_VERSION"
    echo "建议升级到最新 LTS 版本"
    echo ""
    read -p "是否继续? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Node.js 版本: $NODE_VERSION"

# 检查目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

echo ""
echo "📦 开始安装依赖..."
echo "=================="

# 安装依赖
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "✅ 依赖安装完成"

# 检查是否安装了 GitHub CLI (可选)
if command -v gh &> /dev/null; then
    echo ""
    echo "🔍 检测到 GitHub CLI，是否需要帮助创建仓库?"
    read -p "创建 GitHub 仓库? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "输入仓库名 (默认: blue-ocean-keywords): " repo_name
        repo_name=${repo_name:-blue-ocean-keywords}

        echo "正在创建仓库: $repo_name"
        gh repo create "$repo_name" --public --add-readme --gitignore="Node"

        git remote add origin "https://github.com/$(gh config get user)/$repo_name.git"
        git add .
        git commit -m "🚀 初始化蓝海关键词分析工具"
        git branch -M main
        git push -u origin main

        echo "✅ 仓库已创建并推送"
    fi
fi

echo ""
echo "🚀 快速命令"
echo "=========="
echo "启动开发服务器:"
echo "  npm run dev"
echo ""
echo "构建项目 (自动包含静态导出):"
echo "  npm run build"
echo ""
echo "代码检查:"
echo "  npm run lint"
echo ""
echo "📖 部署指南:"
echo "  查看 DEPLOYMENT.md 文件"
echo ""

echo "🎉 环境准备完成！"
echo ""
echo "接下来可以:"
echo "1. 运行 npm run dev 查看本地效果"
echo "2. 按照 DEPLOYMENT.md 部署到 Cloudflare Pages"
echo "3. 享受蓝海关键词分析工具！"
echo ""
echo "如有问题，请查看项目文档或创建 Issue"