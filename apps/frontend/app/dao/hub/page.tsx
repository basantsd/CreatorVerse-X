"use client";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { proposals } from "@/lib/data";

const sidebarLinks = [
  { label: "Dashboard", href: "/dao/hub", icon: "📊", active: true },
  { label: "Assets", href: "/wallet", icon: "💎" },
  { label: "Earnings", href: "/staking", icon: "⚡" },
  { label: "Followers", href: "/explore", icon: "👥" },
  { label: "Settings", href: "#", icon: "⚙️" },
];

const topContributors = [
  { rank: 1, handle: "Alpha_Node", tier: "MASTER", contributions: "$124K", votingPower: "8.4%", color: "#7b61ff" },
  { rank: 2, handle: "Cypher_Queen", tier: "ELITE", contributions: "$98K", votingPower: "6.2%", color: "#00d5ff" },
  { rank: 3, handle: "Zero_One", tier: "ELITE", contributions: "$74K", votingPower: "4.9%", color: "#ff5f8d" },
];

const monthlyTreasury = [
  { month: "Jan", value: 2.8 },
  { month: "Feb", value: 3.1 },
  { month: "Mar", value: 2.9 },
  { month: "Apr", value: 3.6 },
  { month: "May", value: 4.29 },
];
const maxTreasury = Math.max(...monthlyTreasury.map((m) => m.value));

export default function DAOHubPage() {
  return (
    <PageWrapper auroraVariant="mixed">
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

          <div className="mt-4 flex flex-col gap-2">
            <Link href="/dao">
              <button
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 text-white"
                style={{
                  fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                  background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                }}
              >
                + Create Proposal
              </button>
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-on-surface mb-1"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.02em" }}>
              Nexus{" "}
              <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                DAO Dashboard
              </span>
            </h1>
            <p className="text-sm text-muted">Empowering the decentralized future of the CreatorVerse community.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Active Proposals", value: "24", icon: "📋", color: "#7b61ff" },
              { label: "Participation Rate", value: "82%", icon: "🗳️", color: "#00d5ff" },
              { label: "New Members (30d)", value: "1,240", icon: "👥", color: "#4ade80" },
              { label: "Social Engagement", value: "+42%", icon: "📈", color: "#ffb77d" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span className="text-xl mb-2 block">{s.icon}</span>
                <p className="text-xl font-bold mb-0.5"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)", color: s.color }}>
                  {s.value}
                </p>
                <p className="text-[10px] text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Treasury chart */}
            <div
              className="lg:col-span-2 p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-sm font-bold text-on-surface"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    Treasury Overview
                  </h2>
                  <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Jan — May 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-on-surface"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    $4.29M
                  </p>
                  <p className="text-xs text-success font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>+12.4% monthly</p>
                </div>
              </div>

              {/* Chart */}
              <div className="flex items-end gap-3 h-40">
                {monthlyTreasury.map((m, i) => (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${(m.value / maxTreasury) * 128}px`,
                        background: i === monthlyTreasury.length - 1
                          ? "linear-gradient(180deg, #7b61ff, rgba(123,97,255,0.3))"
                          : "rgba(123,97,255,0.25)",
                        boxShadow: i === monthlyTreasury.length - 1 ? "0 0 12px rgba(123,97,255,0.5)" : "none",
                      }}
                    />
                    <span className="text-[10px] text-subtle"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {m.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community stats */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <h2 className="text-sm font-bold text-on-surface mb-4"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Community Growth
              </h2>
              {[
                { label: "Token Holders", value: "12.5K", delta: "+8.4%", positive: true },
                { label: "Active Voters", value: "4,280", delta: "+12.1%", positive: true },
                { label: "Treasury Inflow", value: "$420K", delta: "+18.4%", positive: true },
                { label: "Proposals Passed", value: "41/48", delta: "85.4%", positive: true },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</p>
                  <div className="text-right">
                    <p className="text-xs font-bold text-on-surface"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {s.value}
                    </p>
                    <p
                      className="text-[10px] font-bold"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)", color: s.positive ? "#4ade80" : "#f87171" }}
                    >
                      {s.delta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <div
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-sm font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Top Contributors
              </h2>
            </div>
            <div className="grid grid-cols-4 px-6 py-2 text-[10px] font-medium text-subtle"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)", letterSpacing: "0.06em" }}>
              {["Rank", "Member", "Contributions", "Voting Power"].map((h) => (
                <span key={h} className={h !== "Rank" && h !== "Member" ? "text-right" : ""}>{h}</span>
              ))}
            </div>
            {topContributors.map((c) => (
              <div
                key={c.rank}
                className="grid grid-cols-4 items-center px-6 py-4 transition-all duration-200"
                style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.04)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <span
                  className="text-sm font-bold w-6 h-6 rounded-md flex items-center justify-center"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    background: c.rank === 1 ? "rgba(255,183,125,0.2)" : "rgba(255,255,255,0.06)",
                    color: c.rank === 1 ? "#ffb77d" : "#928ea1",
                  }}
                >
                  {c.rank}
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}88)` }}
                  >
                    {c.handle.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-on-surface"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {c.handle}
                    </p>
                    <p
                      className="text-[9px] font-bold"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)", color: c.color }}
                    >
                      {c.tier}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-on-surface text-right"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {c.contributions}
                </span>
                <span className="text-xs font-bold text-secondary-dim text-right"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {c.votingPower}
                </span>
              </div>
            ))}
          </div>

          {/* Recent proposals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                Recent Proposals
              </h2>
              <Link href="/dao" className="text-xs text-primary-dim hover:text-primary transition-colors"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                View all →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {proposals.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(123,97,255,0.25)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  <div>
                    <p className="text-xs font-bold text-on-surface mb-0.5"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {p.title}
                    </p>
                    <p className="text-[10px] text-subtle"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {p.id} · {p.proposer}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-success font-bold"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {p.votes.for}% For
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: p.status === "ACTIVE" ? "rgba(123,97,255,0.15)" : p.status === "PASSED" ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)",
                        color: p.status === "ACTIVE" ? "#c9bfff" : p.status === "PASSED" ? "#4ade80" : "#f87171",
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
