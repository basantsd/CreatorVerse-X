"use client";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { walletData } from "@/lib/data";

export default function WalletDashboardPage() {
  const tokens = [
    ...walletData.assets,
    { symbol: "MATIC", name: "Polygon", balance: "112,448 MATIC", value: "$93,332", allocation: 7.4, change: "+8.4%", positive: true },
  ];

  const nftsHeld = [
    { name: "Neon Knights #01", collection: "Neon Knights", value: "24 ETH", rarity: "LEGENDARY" },
    { name: "Void Fragment #44", collection: "Void Fragments", value: "1.8 ETH", rarity: "RARE" },
    { name: "Chromium Flow", collection: "Chromium", value: "0.95 ETH", rarity: "COMMON" },
  ];

  return (
    <PageWrapper auroraVariant="purple">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/wallet" className="text-xs text-subtle hover:text-on-surface transition-colors"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              ← Wallet
            </Link>
            <span className="text-subtle">/</span>
            <span className="text-xs text-muted" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Dashboard</span>
          </div>
          <h1 className="text-4xl font-bold text-on-surface mb-1"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.02em" }}>
            Smart{" "}
            <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Wallet Dashboard
            </span>
          </h1>
          <p className="text-muted text-sm">{walletData.address} — <span className="text-primary-dim">ELITE TIER</span></p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Portfolio Value", value: walletData.totalValue, change: walletData.change, positive: true },
            { label: "NFTs Held", value: "3", change: null, positive: true },
            { label: "Active Stakes", value: "3", change: null, positive: true },
            { label: "Earned (30d)", value: "$1,437", change: "+42.1%", positive: true },
          ].map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <p className="text-xs text-subtle mb-2" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</p>
              <p
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  background: "linear-gradient(135deg, #c9bfff, #00d5ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </p>
              {s.change && (
                <span
                  className="text-xs font-bold"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)", color: s.positive ? "#4ade80" : "#f87171" }}
                >
                  {s.change}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Portfolio allocation visual */}
        <div
          className="p-6 rounded-2xl mb-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(16px)",
          }}
        >
          <h2 className="text-base font-bold text-on-surface mb-4"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
            Asset Allocation
          </h2>
          <div className="flex items-center gap-6">
            {/* Visual bar */}
            <div className="flex-1 h-8 rounded-xl overflow-hidden flex">
              {[
                { pct: 67.5, color: "linear-gradient(90deg, #7b61ff, #5a45d0)", label: "ETH 67.5%" },
                { pct: 25.1, color: "linear-gradient(90deg, #00d5ff, #0099cc)", label: "SOL 25.1%" },
                { pct: 7.4, color: "linear-gradient(90deg, #ffb77d, #e89040)", label: "XCV 7.4%" },
              ].map((seg) => (
                <div
                  key={seg.label}
                  style={{ width: `${seg.pct}%`, background: seg.color }}
                  title={seg.label}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex gap-4 flex-shrink-0">
              {[
                { label: "ETH", color: "#7b61ff", pct: "67.5%" },
                { label: "SOL", color: "#00d5ff", pct: "25.1%" },
                { label: "XCV", color: "#ffb77d", pct: "7.4%" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 text-xs"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                  <span className="text-muted">{l.label}</span>
                  <span className="text-on-surface font-bold">{l.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-subtle mt-3" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            Dominance: <span className="text-primary-dim font-bold">67.5% ETH Ecosystem</span> · Blue Chip NFTs 42% · Yield Farms 28%
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tokens */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-sm font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Token Holdings
              </h2>
            </div>
            {tokens.map((t, i) => (
              <div
                key={t.symbol}
                className="flex items-center justify-between px-5 py-4 transition-all duration-200"
                style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)" }}
                  >
                    {t.symbol.substring(0, 1)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {t.symbol}
                    </p>
                    <p className="text-[10px] text-subtle">{t.balance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-on-surface"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    {t.value}
                  </p>
                  <p
                    className="text-[10px] font-bold"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      color: t.positive ? "#4ade80" : "#f87171",
                    }}
                  >
                    {t.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* NFTs held */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-sm font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                NFT Vault
              </h2>
              <Link href="/collections" className="text-xs text-primary-dim hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                View all →
              </Link>
            </div>
            {nftsHeld.map((nft, i) => (
              <div
                key={nft.name}
                className="flex items-center justify-between px-5 py-4 transition-all duration-200"
                style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xs"
                    style={{ background: "linear-gradient(135deg, #7b61ff, #ff5f8d)" }}
                  >
                    NFT
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface mb-0.5"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {nft.name}
                    </p>
                    <p className="text-[10px] text-subtle">{nft.collection}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-on-surface mb-0.5"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    {nft.value}
                  </p>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      background: nft.rarity === "LEGENDARY" ? "rgba(255,183,125,0.15)" : nft.rarity === "RARE" ? "rgba(123,97,255,0.15)" : "rgba(146,142,161,0.12)",
                      color: nft.rarity === "LEGENDARY" ? "#ffb77d" : nft.rarity === "RARE" ? "#c9bfff" : "#928ea1",
                    }}
                  >
                    {nft.rarity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
