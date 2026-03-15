"use client";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { creators } from "@/lib/data";

const stats = [
  { label: "Total Value Locked", value: "$1.42B", mono: true },
  { label: "Active Creators", value: "12.4K", mono: true },
  { label: "Staking APY", value: "142%", mono: true, accent: true },
  { label: "Total Volume", value: "$892M", mono: true },
  { label: "DAO Voting Power", value: "4.2M XCV", mono: true },
  { label: "Nodes Online", value: "6.2K", mono: true, green: true },
];

const modules = [
  { icon: "🏪", title: "NFT Marketplace", desc: "Fractionalized ownership and zero-knowledge trading of digital assets.", href: "/marketplace" },
  { icon: "🏛️", title: "DAO Governance", desc: "On-chain voting with quadratic weighting and reputation staking.", href: "/dao" },
  { icon: "⚡", title: "Liquidity Staking", desc: "Maximize yield across creator pools with auto-compounding rewards.", href: "/staking" },
  { icon: "🧠", title: "AI Analytics", desc: "Predictive modeling and on-chain sentiment analysis for creators.", href: "/analytics" },
  { icon: "📊", title: "Real-time Stats", desc: "Live on-chain data visualizations across all ecosystem metrics.", href: "/analytics" },
  { icon: "🔗", title: "Cross-chain Bridge", desc: "Seamless asset movement across Ethereum, Solana, and Polygon.", href: "/wallet" },
];

export default function LandingPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-6 text-center pt-8">
        {/* Live badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            background: "rgba(123,97,255,0.1)",
            border: "1px solid rgba(123,97,255,0.3)",
            animation: "fade-up 0.6s ease both",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "ping-slow 2s ease-in-out infinite" }}
          />
          <span className="text-xs font-medium tracking-widest text-muted uppercase"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            MAINNET LIVE — 6,284 Nodes Online
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6"
          style={{
            fontFamily: "var(--font-sora-var, Sora, sans-serif)",
            letterSpacing: "-0.03em",
            animation: "fade-up 0.6s ease 0.1s both",
          }}
        >
          <span className="block text-on-surface">The Sovereign</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #c9bfff 0%, #7b61ff 50%, #00d5ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Creator Economy
          </span>
        </h1>

        <p
          className="max-w-2xl text-lg text-muted leading-relaxed mb-10"
          style={{ animation: "fade-up 0.6s ease 0.2s both" }}
        >
          Launch personalized tokens, govern DAO-controlled IP, trade fractionalized NFTs,
          and earn yield — all on one sovereign Web3 platform built for the next generation of creators.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 justify-center mb-16"
          style={{ animation: "fade-up 0.6s ease 0.3s both" }}
        >
          <Link href="/explore">
            <button
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-bold text-white tracking-wide transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                boxShadow: "0 0 30px rgba(123,97,255,0.4)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.boxShadow = "0 0 50px rgba(123,97,255,0.6)"; (e.target as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(123,97,255,0.4)"; (e.target as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Explore Creators
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </Link>
          <Link href="/marketplace">
            <button
              className="flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-bold transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(123,97,255,0.4)",
                color: "#c9bfff",
                backdropFilter: "blur(12px)",
                letterSpacing: "0.04em",
              }}
            >
              Launch Token
            </button>
          </Link>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px w-full max-w-5xl rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.07)",
            animation: "fade-up 0.6s ease 0.4s both",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-5 px-3"
              style={{ background: "rgba(14,13,22,0.6)", backdropFilter: "blur(12px)" }}
            >
              <span
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  color: s.accent ? "#7b61ff" : s.green ? "#4ade80" : "#e5e0ee",
                }}
              >
                {s.value}
              </span>
              <span className="text-xs text-subtle uppercase tracking-wider text-center leading-tight"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Creators */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-2"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                // trending now
              </p>
              <h2 className="text-3xl font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.02em" }}>
                Trending Creators
              </h2>
            </div>
            <Link href="/explore" className="text-sm text-primary-dim hover:text-primary flex items-center gap-1 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {creators.map((c) => (
              <Link key={c.id} href={`/creator/${c.id}`}>
                <div
                  className="group relative p-4 rounded-xl cursor-pointer transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${c.color}50`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${c.color}25`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-xl mb-3 overflow-hidden">
                    <img
                      src={c.imageUrl}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold mb-2"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      background: `${c.color}20`,
                      color: c.color,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {c.status === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-current" style={{ boxShadow: `0 0 4px currentColor` }} />}
                    {c.tier}
                  </div>

                  <p className="text-sm font-bold text-on-surface mb-0.5"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {c.name}
                  </p>
                  <p className="text-xs text-subtle mb-3">{c.handle}</p>

                  <div className="flex justify-between text-xs mb-3">
                    <div>
                      <p className="text-subtle mb-0.5">Token</p>
                      <p className="font-bold text-on-surface" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{c.tokenPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-subtle mb-0.5">APY</p>
                      <p className="font-bold text-success" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{c.apy}</p>
                    </div>
                  </div>

                  <button
                    className="w-full py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                      background: `${c.color}20`,
                      border: `1px solid ${c.color}40`,
                      color: c.color,
                    }}
                  >
                    Stake Creator
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Modules */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              // ecosystem modules
            </p>
            <h2 className="text-4xl font-bold text-on-surface mb-4"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.02em" }}>
              Everything You Need
              <br />
              <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                On-Chain
              </span>
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              A complete suite of DeFi and creator tools, governed by the community and built for sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <Link key={m.title} href={m.href}>
                <div
                  className="group p-6 rounded-xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(16px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(123,97,255,0.3)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <div className="text-3xl mb-4">{m.icon}</div>
                  <h3 className="text-lg font-bold text-on-surface mb-2"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">{m.desc}</p>
                  <span className="text-xs font-bold text-primary-dim group-hover:text-primary transition-colors flex items-center gap-1"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    EXPLORE →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 md:px-16 py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            © 2026 CreatorVerse X — The Future is Decentralized.
          </p>
          <div className="flex items-center gap-6 text-xs text-subtle">
            {["Documentation", "Privacy Policy", "Discord", "Github"].map((l) => (
              <a key={l} href="#" className="hover:text-primary-dim transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-success" style={{ boxShadow: "0 0 6px #4ade80" }} />
            <span className="text-success">SYSTEM: OPTIMAL</span>
          </div>
        </div>
      </footer>
    </PageWrapper>
  );
}
