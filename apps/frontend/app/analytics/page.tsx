"use client";
import PageWrapper from "@/components/ui/PageWrapper";
import { analyticsData } from "@/lib/data";

const barMax = Math.max(...analyticsData.chartData.map((d) => d.tvl));

export default function AnalyticsPage() {
  return (
    <PageWrapper auroraVariant="mixed">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // blockchain analytics
          </p>
          <h1 className="text-5xl font-bold text-on-surface mb-2"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
            On-Chain{" "}
            <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Analytics
            </span>
          </h1>
          <p className="text-muted">Real-time data visualizations across all CreatorVerse ecosystem metrics.</p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Value Locked", value: analyticsData.tvl, delta: "+8.2%", positive: true, icon: "📈" },
            { label: "24h Volume", value: analyticsData.volume24h, delta: "+12.4%", positive: true, icon: "⚡" },
            { label: "Active Users", value: analyticsData.activeUsers, delta: "+4.1%", positive: true, icon: "👥" },
            { label: "Transactions", value: analyticsData.transactions, delta: "+18.7%", positive: true, icon: "🔗" },
          ].map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(123,97,255,0.5), transparent)" }} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl">{m.icon}</span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    background: m.positive ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)",
                    color: m.positive ? "#4ade80" : "#f87171",
                  }}
                >
                  {m.delta}
                </span>
              </div>
              <p
                className="text-3xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  background: "linear-gradient(135deg, #c9bfff, #00d5ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {m.value}
              </p>
              <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{m.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* TVL Chart */}
          <div
            className="lg:col-span-2 p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-on-surface mb-1"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                  TVL vs Volume
                </h2>
                <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  Jan — Jul 2026
                </p>
              </div>
              <div className="flex gap-3 text-xs" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 rounded" style={{ background: "linear-gradient(90deg, #7b61ff, #00d5ff)" }} />
                  <span className="text-subtle">TVL ($M)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 rounded" style={{ background: "linear-gradient(90deg, #00d5ff, #ff5f8d)" }} />
                  <span className="text-subtle">Volume ($M)</span>
                </div>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end justify-between gap-2 h-48">
              {analyticsData.chartData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: "160px" }}>
                    {/* TVL bar */}
                    <div
                      className="flex-1 rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${(d.tvl / barMax) * 100}%`,
                        background: "linear-gradient(180deg, #7b61ff, rgba(123,97,255,0.3))",
                        boxShadow: i === analyticsData.chartData.length - 1 ? "0 0 12px rgba(123,97,255,0.5)" : "none",
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                    {/* Volume bar */}
                    <div
                      className="flex-1 rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${(d.volume / barMax) * 100}%`,
                        background: "linear-gradient(180deg, #00d5ff, rgba(0,213,255,0.2))",
                        boxShadow: i === analyticsData.chartData.length - 1 ? "0 0 12px rgba(0,213,255,0.4)" : "none",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-subtle"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    {d.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Volume breakdown */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <h2 className="text-base font-bold text-on-surface mb-5"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              Volume Breakdown
            </h2>
            {[
              { label: "NFT Trading", value: 42, color: "#7b61ff" },
              { label: "Staking", value: 28, color: "#00d5ff" },
              { label: "DAO Treasury", value: 18, color: "#ff5f8d" },
              { label: "Other", value: 12, color: "#ffb77d" },
            ].map((item) => (
              <div key={item.label} className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{item.label}</span>
                  <span className="font-bold text-on-surface" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{item.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.value}%`,
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              className="mt-6 rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <img
                src={analyticsData.networkMapUrl}
                alt="Global Node Distribution"
                className="w-full h-36 object-cover"
              />
              <div className="p-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-xs text-subtle mb-2" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Network Health</p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                  />
                  <span className="text-xs text-success font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    OPTIMAL — 6,284 nodes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Assets */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <h2 className="text-base font-bold text-on-surface"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              Top Assets
            </h2>
          </div>
          <div className="grid grid-cols-4 px-6 py-2 text-[10px] font-medium text-subtle"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)", letterSpacing: "0.08em" }}>
            {["Asset", "Price", "24h Change", "Volume"].map((h) => (
              <span key={h} className={h !== "Asset" ? "text-right" : ""}>{h}</span>
            ))}
          </div>
          {analyticsData.topAssets.map((asset) => (
            <div
              key={asset.symbol}
              className="grid grid-cols-4 items-center px-6 py-4 transition-all duration-200"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                  {asset.imageUrl ? (
                    <img src={asset.imageUrl} alt={asset.symbol} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)" }}>
                      {asset.symbol.substring(0, 1)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {asset.symbol}
                  </p>
                  <p className="text-[10px] text-subtle">{asset.name}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-on-surface text-right"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                {asset.price}
              </p>
              <p
                className="text-sm font-bold text-right"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  color: asset.positive ? "#4ade80" : "#f87171",
                }}
              >
                {asset.change}
              </p>
              <p className="text-sm text-secondary-dim text-right"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                {asset.volume}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
