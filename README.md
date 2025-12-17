# 🌊 Blue Ocean Keywords

**Next.js powered keyword analysis tool. Find low-competition, high-value keywords instantly.**

## 🚀 快速部署 (5分钟)

### 1. 创建GitHub仓库
访问 https://github.com/new，创建仓库 `blue-ocean-keywords` (Public)

### 2. 推送代码
```bash
cd /Users/darling/downloads/xiaomi
git remote add origin https://github.com/YOUR_USERNAME/blue-ocean-keywords.git
git push -u origin main
```

### 3. Cloudflare Pages部署
- 访问 https://dash.cloudflare.com → Workers & Pages
- Connect to Git → 选择仓库
- 构建命令: `npm run build`
- 输出目录: `.next`
- 点击部署！

**完成！** 获得 `your-project.pages.dev`

## 🎯 Features

- **Intelligent Analysis**: Analyzes search volume, competition, and trends
- **Blue Ocean Algorithm**: Identifies low-competition opportunities
- **Real-time Visualization**: Interactive charts and metrics
- **Smart Filtering**: Filter by Blue Ocean, Potential, or Saturated
- **Compact UI**: Optimized, English-first interface
- **Zero Deployment Cost**: Free hosting on Cloudflare Pages

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Deploy to Production
```bash
# 1. Push to GitHub
# 2. Connect to Cloudflare Pages
# 3. Build command: npm run export
# 4. Output directory: out
```

## 📂 Architecture

```
app/
├── layout.jsx       # HTML metadata
├── page.jsx         # Main UI (single component)
└── globals.css      # Tailwind styles

lib/
└── analyzer.js      # Blue ocean algorithm engine

config/
├── next.config.js   # Static export
├── package.json     # Dependencies
└── tailwind.config.ts # Styling
```

## 🔄 Updates & Changelog

### 2024-12-17 - Initial Release
- ✅ Complete Next.js rebuild
- ✅ English interface optimization
- ✅ Compact UI design (no spacing issues)
- ✅ Single-file component architecture
- ✅ Cloudflare Pages deployment ready
- ✅ Zero backend needed

## 📊 Demo

**Input**: `business English`
**Output**: 18 keywords with Blue Ocean scoring

**Data Points**:
- 🔍 Search Volume
- ⚔️ Competition Level
- 💰 CPC Cost
- 📈 Trend Arrow
- 🎯 Blue Ocean Score

## 🛠️ Tech Stack

- Framework: Next.js 14
- Styling: Tailwind CSS 3.x
- Language: TypeScript
- Algorithm: Pure JavaScript
- Deployment: Cloudflare Pages

## 📝 Usage

1. Enter seed keyword (e.g., "fitness", "marketing")
2. Click Analyze or press Enter
3. Browse results with color-coded Blue Ocean tags
4. Filter by status (All / Blue Ocean / Potential)
5. Sort by metric (Potential / Competition / Volume)
6. Click any keyword for detailed strategy advice
7. View visualization chart

## 💡 Methodology

The tool identifies Blue Ocean keywords using:
- **Volume Score**: High searches but not too high
- **Competition Score**: Low competition value
- **Trend Score**: Rising search interest
- **Cost Score**: Low CPC potential

**Status Types**:
- 🟢 **Blue Ocean**: Score ≥ 70, Competition < 2000
- 🟠 **Potential**: Score ≥ 50
- 🔴 **Saturated**: High volume + high competition

## 🚀 Deployment

See `DEPLOYMENT.md` for detailed deployment guide.

## 📄 License

MIT License - Free for personal and commercial use.

---

*Built with Next.js • Hosted on Cloudflare • Zero cost*