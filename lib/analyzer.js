// 蓝海关键词分析引擎
export class BlueOceanAnalyzer {
  constructor() {
    this.results = [];
  }

  // 生成数据
  generateData(seed) {
    const suffixes = [
      { txt: " guide", mod: 1.3 },
      { txt: " tips", mod: 1.1 },
      { txt: " for beginners", mod: 0.9 },
      { txt: " at home", mod: 0.8 },
      { txt: " techniques", mod: 1.0 },
      { txt: " mistakes", mod: 0.7 },
    ];

    const users = ["beginner", "home", "quick", "simple"];
    const platforms = ["YouTube", "Instagram", "TikTok", "Podcast"];

    const data = [];

    // Core variants
    suffixes.forEach(s => {
      data.push(this.createItem(`${seed}${s.txt}`, s.mod, "Variant"));
    });

    // User scenarios
    users.forEach(u => {
      data.push(this.createItem(`${u} ${seed}`, 0.8 + Math.random() * 0.6, "Scenario"));
    });

    // Platforms
    platforms.forEach(p => {
      data.push(this.createItem(`${seed} ${p}`, 0.9 + Math.random() * 0.5, "Platform"));
    });

    // Long-tail combos
    for (let i = 0; i < 4; i++) {
      const u = users[Math.floor(Math.random() * users.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      data.push(this.createItem(`${u} ${seed}${s.txt}`, 0.7 + Math.random() * 0.7, "LongTail"));
    }

    return data.filter(item => item.name.length <= 45).slice(0, 18);
  }

  createItem(name, mod, category) {
    const vol = Math.floor(Math.random() * 5000 * mod) + 100;
    const comp = Math.floor(Math.random() * 10000 * mod) + 50;
    const cpc = (Math.random() * 10 + 0.5) * (1 + (Math.random() - 0.5) * 0.4);
    const trend = Math.floor(Math.random() * 20) - 10;

    // 评分公式
    const score =
      Math.min(vol / 5000, 1) * 30 +    // 搜索量
      (1 - Math.min(comp / 10000, 1)) * 35 +  // 竞争度逆向
      Math.max(0, trend + 10) / 20 * 20 +    // 趋势
      (cpc < 5 ? 15 : cpc < 10 ? 8 : 3);     // 成本

    // 状态评估
    let status = "potential";
    if (score >= 70 && comp < 2000) status = "blueOcean";
    else if (vol > 3000 && comp > 8000) status = "saturated";

    // 标签
    const tags = [];
    if (score >= 70) tags.push("Ocean");
    if (score >= 50) tags.push("Potential");
    if (vol > 2000) tags.push("HighVol");
    if (comp < 1500) tags.push("Easy");

    return {
      name,
      volume: vol,
      competition: comp,
      cpc: cpc.toFixed(2),
      trend,
      score: score.toFixed(1),
      category,
      status,
      tags,
    };
  }

  analyze(seed) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.results = this.generateData(seed);
        resolve(this.results);
      }, 800); // 延迟模拟处理时间
    });
  }

  // 筛选
  filter(type) {
    if (!this.results.length) return [];
    if (type === "all") return this.results;
    return this.results.filter(r => r.status === type);
  }

  // 排序
  sort(method, data = null) {
    const target = data || this.results;
    const copy = [...target];

    switch (method) {
      case "potential": return copy.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
      case "competition": return copy.sort((a, b) => a.competition - b.competition);
      case "volume": return copy.sort((a, b) => b.volume - a.volume);
      case "name": return copy.sort((a, b) => a.name.localeCompare(b.name));
      default: return copy;
    }
  }

  // 统计
  stats(data) {
    if (!data.length) return null;
    const total = data.length;
    const blueOcean = data.filter(d => d.status === "blueOcean").length;
    const avgCompet = Math.round(data.reduce((sum, d) => sum + d.competition, 0) / total);
    const avgScore = (data.reduce((sum, d) => sum + parseFloat(d.score), 0) / total).toFixed(1);
    return { total, blueOcean, avgCompet, avgScore };
  }

  // 策略建议
  advice(item) {
    if (item.status === "blueOcean") {
      return "Low competition opportunity!\n• Create content quickly\n• Target with ads\n• Win early rankings";
    }
    if (item.status === "potential") {
      return "Solid potential:\n• Unique angle needed\n• Specific user intent\n• Niche targeting";
    }
    return "Too competitive:\n• Use as secondary terms\n• Monitor for shifts\n• Consider alternatives";
  }
}

// 工具函数
export const formatNumber = (n) => {
  if (n >= 10000) return (n / 10000).toFixed(1) + "w";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
};