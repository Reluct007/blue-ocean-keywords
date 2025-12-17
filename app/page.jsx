"use client";

import { useState, useEffect, useRef, useMemo } from "react";

// 内联分析器
class BlueOceanAnalyzer {
  constructor() { this.results = []; }

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

    suffixes.forEach(s => data.push(this.createItem(`${seed}${s.txt}`, s.mod, "Variant")));
    users.forEach(u => data.push(this.createItem(`${u} ${seed}`, 0.8 + Math.random() * 0.6, "Scenario")));
    platforms.forEach(p => data.push(this.createItem(`${seed} ${p}`, 0.9 + Math.random() * 0.5, "Platform")));

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
    const cpc = (Math.random() * 5 * mod + 0.1).toFixed(2);
    const trend = Math.random() > 0.6 ? Math.floor(Math.random() * 50 + 10) : Math.floor(Math.random() * 20 - 10);
    const score = Math.min(100, Math.max(0, Math.round(
      Math.min(100, (vol / 5000) * 100) * 0.4 +
      Math.max(0, 100 - (comp / 100)) * 0.4 +
      (trend > 0 ? Math.min(40, trend / 2) : 0) * 0.2
    )));

    const status = score >= 70 && comp < 2000 ? "blueOcean" : score >= 50 ? "potential" : "saturated";
    const tags = [];
    if (name.includes("guide")) tags.push("Guide");
    if (name.includes("tips")) tags.push("Tips");
    if (name.includes("beginner")) tags.push("Beginner");
    if (name.includes("home")) tags.push("Home");
    if (name.includes("YouTube") || name.includes("Instagram") || name.includes("TikTok")) tags.push("Social");
    if (category === "LongTail") tags.push("Long-tail");

    return { name, volume: vol, competition: comp, cpc, trend, score, status, category, tags: tags.length ? tags : ["General"] };
  }

  async analyze(seed) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const data = this.generateData(seed);
    this.results = data;
    return data;
  }

  filter(type) {
    if (type === "all") return this.results;
    if (type === "blueOcean") return this.results.filter(r => r.status === "blueOcean");
    if (type === "potential") return this.results.filter(r => r.status === "potential");
    if (type === "saturated") return this.results.filter(r => r.status === "saturated");
    return this.results;
  }

  sort(by, list = this.results) {
    const items = [...list];
    if (by === "potential") items.sort((a, b) => b.score - a.score);
    if (by === "competition") items.sort((a, b) => a.competition - b.competition);
    if (by === "volume") items.sort((a, b) => b.volume - a.volume);
    if (by === "name") items.sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }

  stats(list = this.results) {
    if (!list.length) return null;
    const total = list.length;
    const blueOcean = list.filter(r => r.status === "blueOcean").length;
    const avgCompet = Math.round(list.reduce((sum, r) => sum + r.competition, 0) / total);
    const avgScore = Math.round(list.reduce((sum, r) => sum + r.score, 0) / total);
    return { total, blueOcean, avgCompet, avgScore };
  }

  advice(item) {
    if (item.status === "blueOcean") return "✅ Create content immediately! This is a golden opportunity.\n✅ Target this keyword across all platforms";
    if (item.status === "potential") return "⚠️  Moderate competition, proceed carefully\n⚠️  Consider long-tail variations";
    return "❌ Too saturated, avoid directly\n🔄 Target sub-niches instead";
  }
}

const formatNumber = (n) => n >= 1000 ? (n / 1000).toFixed(1) + "K" : n.toString();

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("potential");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const analyzerRef = useRef(null);
  useEffect(() => { analyzerRef.current = new BlueOceanAnalyzer(); }, []);

  const handleAnalyze = async () => {
    if (!keyword.trim()) { alert("Please enter a seed keyword"); return; }
    setLoading(true); setShowResults(true);
    const results = await analyzerRef.current.analyze(keyword.trim());
    setResults(results); setLoading(false);
  };

  const filtered = useMemo(() => {
    if (!analyzerRef.current || !results.length) return [];
    return analyzerRef.current.sort(sortBy, analyzerRef.current.filter(filterType));
  }, [results, filterType, sortBy]);

  const stats = useMemo(() => {
    if (!analyzerRef.current || !filtered.length) return null;
    return analyzerRef.current.stats(filtered);
  }, [filtered]);

  const showDetail = (item) => {
    const advice = analyzerRef.current.advice(item);
    const msg = `🔍 ${item.name}\n\n📊 Volume: ${item.volume.toLocaleString()}\n⚔️ Competition: ${item.competition.toLocaleString()}\n💰 CPC: $${item.cpc}\n📈 Trend: ${item.trend > 0 ? '+' : ''}${item.trend}\n🎯 Score: ${item.score}\n\n🏷️ ${item.category} | ${item.status}\n🏷️ Tags: ${item.tags.join(', ')}\n\n💡 Strategy:\n${advice}`;
    alert(msg);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl text-center mb-3">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">🌊 Blue Ocean Keywords</h1>
          <p className="text-sm text-gray-600">Find low-competition, high-value keywords</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-3 border-l-4 border-purple-500">
          <div className="flex gap-2 mb-2 flex-wrap">
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAnalyze()} placeholder="Seed keyword (e.g., fitness, diet, english)" className="flex-1 min-w-[200px] px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm" disabled={loading} />
            <button onClick={handleAnalyze} disabled={loading} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg disabled:opacity-50 hover:opacity-90">{loading ? "∞" : "Analyze"}</button>
          </div>
          <div className="flex gap-2 items-center flex-wrap text-sm">
            <span className="text-gray-600 font-semibold">Try:</span>
            {["Home Workout", "Meal Prep", "Business English"].map((ex) => (
              <button key={ex} onClick={() => setKeyword(ex)} className="px-2 py-1 bg-gray-100 hover:bg-purple-100 rounded border border-gray-200">{ex}</button>
            ))}
          </div>
        </div>

        {showResults && (
          <>
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                {[
                  { label: "Total", value: stats.total, color: "from-blue-500 to-blue-600" },
                  { label: "Ocean", value: stats.blueOcean, color: "from-green-500 to-green-600" },
                  { label: "Compet", value: stats.avgCompet, color: "from-purple-500 to-purple-600" },
                  { label: "Score", value: stats.avgScore, color: "from-orange-500 to-orange-600" }
                ].map((item, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-3 text-center`}>
                    <div className="text-xl font-bold leading-none mb-1">{item.value}</div>
                    <div className="text-[10px] uppercase tracking-wider opacity-90">{item.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl mb-3">
              <div className="flex gap-2 flex-wrap">
                <div className="flex-1 flex gap-1 items-center">
                  <span className="text-sm font-semibold text-gray-700">Filter:</span>
                  <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm">
                    <option value="all">All</option>
                    <option value="blueOcean">Blue Ocean</option>
                    <option value="potential">High Potential</option>
                    <option value="saturated">Saturated</option>
                  </select>
                </div>
                <div className="flex-1 flex gap-1 items-center">
                  <span className="text-sm font-semibold text-gray-700">Sort:</span>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm">
                    <option value="potential">Potential</option>
                    <option value="competition">Competition</option>
                    <option value="volume">Volume</option>
                    <option value="name">A-Z</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600 pt-2">{loading ? "∞" : `${filtered.length} results`}</div>
              </div>
            </div>

            {loading && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-2xl animate-pulse mb-1">🌊 Scanning</div>
                <div className="text-sm text-gray-500">Analyzing the blue ocean...</div>
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div className="space-y-2 mb-3">
                {filtered.map((item, idx) => {
                  const statusColor = { blueOcean: "border-l-4 border-green-500", potential: "border-l-4 border-yellow-500", saturated: "border-l-4 border-red-500" }[item.status];
                  const badgeColor = { blueOcean: "bg-green-500", potential: "bg-yellow-500", saturated: "bg-red-500" }[item.status];
                  const badgeText = { blueOcean: "OCEAN", potential: "POTENTIAL", saturated: "SATURATED" }[item.status];
                  return (
                    <div key={idx} className={`bg-white/95 backdrop-blur-sm rounded-xl p-3 cursor-pointer hover:translate-x-1 transition-all ${statusColor} animate-in slide-in-from-left-4 duration-300`} style={{ animationDelay: `${idx * 50}ms` }} onClick={() => showDetail(item)}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-gray-800 text-[15px]">{item.name}</div>
                        <div className={`px-2 py-0.5 rounded text-[10px] font-bold text-white ${badgeColor}`}>{badgeText}</div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-gray-600 mb-1">
                        <span>🔍 {formatNumber(item.volume)}</span>
                        <span>⚔️ {formatNumber(item.competition)}</span>
                        <span>💰 ${item.cpc}</span>
                        <span>📈 {item.trend > 0 ? '+' : ''}{item.trend}</span>
                        <span>📊 {item.score}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-semibold text-gray-700">{tag}</span>
                        ))}
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded text-[10px] font-semibold">{item.category}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl mb-6">
                <div className="text-sm font-bold text-gray-800 mb-2">📈 Visualization</div>
                <canvas ref={(canvas) => {
                  if (!canvas || !filtered.length) return;
                  const ctx = canvas.getContext('2d');
                  const width = canvas.width = canvas.offsetWidth;
                  const height = canvas.height = 220;
                  ctx.clearRect(0, 0, width, height);
                  const data = filtered.slice(0, 10);
                  const barW = (width - 40) / data.length;
                  const maxComp = Math.max(...data.map(d => d.competition));
                  const maxScore = Math.max(...data.map(d => parseFloat(d.score)));
                  ctx.strokeStyle = "#f3f4f6";
                  for (let i = 0; i <= 4; i++) {
                    const y = 35 + (height - 60) * (i / 4);
                    ctx.beginPath(); ctx.moveTo(30, y); ctx.lineTo(width - 10, y); ctx.stroke();
                  }
                  data.forEach((d, i) => {
                    const x = 40 + i * barW;
                    const hc = (d.competition / maxComp) * (height - 60);
                    ctx.fillStyle = "#ef4444";
                    ctx.fillRect(x, height - 25 - hc, barW * 0.3, hc);
                    const hp = (parseFloat(d.score) / maxScore) * (height - 60);
                    ctx.fillStyle = d.status === 'blueOcean' ? '#10b981' : d.status === 'potential' ? '#f59e0b' : '#ef4444';
                    ctx.fillRect(x + barW * 0.35, height - 25 - hp, barW * 0.3, hp);
                    if (i % 2 === 0) {
                      ctx.fillStyle = "#6b7280";
                      ctx.font = "10px sans-serif";
                      const label = d.name.length > 5 ? d.name.substring(0, 4) + ".." : d.name;
                      ctx.fillText(label, x, height - 10);
                    }
                  });
                  ctx.fillStyle = "#ef4444"; ctx.fillRect(width - 70, 8, 10, 10);
                  ctx.fillStyle = "#333"; ctx.font = "10px sans-serif"; ctx.fillText("COMP", width - 56, 17);
                  ctx.fillStyle = "#10b981"; ctx.fillRect(width - 70, 23, 10, 10);
                  ctx.fillText("SCORE", width - 56, 32);
                }} className="w-full !h-[220px]" />
              </div>
            )}

            {!loading && filtered.length === 0 && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center text-gray-500">No results match your filter</div>
            )}
          </>
        )}

        <div className="text-center text-white/80 text-xs mt-4 pb-2">
          <p>Blue Ocean Keywords © 2024 | Next.js + Cloudflare Pages</p>
        </div>
      </div>
    </main>
  );
}