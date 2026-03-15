"use client";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { walletData } from "@/lib/data";

const sidebarLinks = [
  { label: "Dashboard", href: "/wallet", icon: "📊", active: true },
  { label: "Assets", href: "/wallet/dashboard", icon: "💎" },
  { label: "Earnings", href: "/staking", icon: "⚡" },
  { label: "NFT Vault", href: "/collections", icon: "🖼️" },
  { label: "Settings", href: "#", icon: "⚙️" },
];

export default function WalletPage() {
  return (
    <PageWrapper auroraVariant="purple">
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside
          className="hidden lg:flex w-60 flex-shrink-0 flex-col p-5"
          style={{
            background: "rgba(14,13,22,0.7)",
            borderRight: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Creator Hub header */}
          <div className="mb-6">
            <p className="text-[10px] font-bold text-subtle uppercase tracking-widest mb-3"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              Creator Hub
            </p>
            <div
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(123,97,255,0.1)", border: "1px solid rgba(123,97,255,0.2)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)" }}
              >
                EV
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                  Elena Void
                </p>
                <div
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    background: "rgba(123,97,255,0.2)",
                    color: "#c9bfff",
                    letterSpacing: "0.06em",
                  }}
                >
                  ELITE TIER
                </div>
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 flex-1">
            {sidebarLinks.map((link) => (
              <Link key={link.label} href={link.href}>
                <div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                    background: link.active ? "rgba(123,97,255,0.12)" : "transparent",
                    border: link.active ? "1px solid rgba(123,97,255,0.25)" : "1px solid transparent",
                    color: link.active ? "#c9bfff" : "#928ea1",
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/marketplace">
              <button
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                  background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                  color: "#fff",
                }}
              >
                <span>+</span> Mint New NFT
              </button>
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Portfolio Summary */}
          <div className="mb-8">
            <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              {walletData.address}
            </p>
            <div className="flex items-end gap-4">
              <h1
                className="text-5xl font-bold"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  background: "linear-gradient(135deg, #c9bfff, #00d5ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {walletData.totalValue}
              </h1>
              <div
                className="mb-2 text-sm font-bold px-2.5 py-1 rounded"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  background: walletData.positive ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)",
                  color: walletData.positive ? "#4ade80" : "#f87171",
                }}
              >
                {walletData.change}
              </div>
            </div>
            <p className="text-sm text-subtle mt-1">Total Portfolio Value</p>
          </div>

          {/* Asset breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {walletData.assets.map((asset) => (
              <div
                key={asset.symbol}
                className="p-5 rounded-2xl transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={asset.imageUrl} alt={asset.symbol} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface" style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>{asset.symbol}</p>
                      <p className="text-[10px] text-subtle">{asset.name}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      color: asset.positive ? "#4ade80" : "#f87171",
                    }}
                  >
                    {asset.change}
                  </span>
                </div>

                <p className="text-xl font-bold text-on-surface mb-1"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {asset.value}
                </p>
                <p className="text-xs text-subtle mb-3" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {asset.balance}
                </p>

                {/* Allocation bar */}
                <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${asset.allocation}%`,
                      background: "linear-gradient(90deg, #7b61ff, #00d5ff)",
                    }}
                  />
                </div>
                <p className="text-[10px] text-subtle mt-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {asset.allocation}% of portfolio
                </p>
              </div>
            ))}
          </div>

          {/* Token balances table */}
          <div
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-base font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Token Balances
              </h2>
              <div className="flex gap-2">
                {["filter", "refresh"].map((icon) => (
                  <button
                    key={icon}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-subtle hover:text-on-surface transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {icon === "filter" ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 px-6 py-2 text-[10px] font-medium text-subtle"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)", letterSpacing: "0.08em" }}>
              {["Asset", "Balance", "Price", "24h", "Actions"].map((h) => (
                <span key={h} className={h === "Actions" ? "text-right" : ""}>{h}</span>
              ))}
            </div>

            {walletData.assets.map((asset) => (
              <div
                key={asset.symbol}
                className="grid grid-cols-5 items-center px-6 py-4 transition-all duration-200"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md overflow-hidden flex-shrink-0">
                    <img src={asset.imageUrl} alt={asset.symbol} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-on-surface"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {asset.symbol}
                  </span>
                </div>
                <span className="text-xs text-muted" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{asset.balance.split(" ")[0]}</span>
                <span className="text-xs text-on-surface font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{asset.value}</span>
                <span
                  className="text-xs font-bold"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    color: asset.positive ? "#4ade80" : "#f87171",
                  }}
                >
                  {asset.change}
                </span>
                <div className="flex justify-end gap-2">
                  {["Send", "Receive"].map((action) => (
                    <button
                      key={action}
                      className="px-2.5 py-1 rounded text-[10px] font-bold transition-all duration-200"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: "rgba(123,97,255,0.12)",
                        border: "1px solid rgba(123,97,255,0.25)",
                        color: "#c9bfff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-base font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Recent Activity
              </h2>
              <button className="text-xs text-primary-dim hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                Download Full Report
              </button>
            </div>

            {walletData.transactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 transition-all duration-200"
                style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: tx.type === "receive" ? "rgba(74,222,128,0.12)" : tx.type === "send" ? "rgba(248,113,113,0.12)" : "rgba(123,97,255,0.12)",
                    }}
                  >
                    <span className="text-sm">
                      {tx.type === "receive" ? "↙" : tx.type === "send" ? "↗" : "⇄"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface mb-0.5"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {tx.label}
                    </p>
                    <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {tx.hash} · {tx.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className="text-sm font-bold mb-0.5"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      color: tx.type === "receive" ? "#4ade80" : tx.type === "send" ? "#f87171" : "#e5e0ee",
                    }}
                  >
                    {tx.amount}
                  </p>
                  <div
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded inline-block"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      background: "rgba(74,222,128,0.12)",
                      color: "#4ade80",
                    }}
                  >
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
