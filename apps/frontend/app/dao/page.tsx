"use client";
import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import { proposals } from "@/lib/data";

const statusColor: Record<string, { bg: string; color: string }> = {
  ACTIVE: { bg: "rgba(123,97,255,0.15)", color: "#c9bfff" },
  PASSED: { bg: "rgba(74,222,128,0.12)", color: "#4ade80" },
  REJECTED: { bg: "rgba(248,113,113,0.12)", color: "#f87171" },
  PENDING: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
};

export default function DAOPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "closed">("all");

  const filtered = proposals.filter((p) => {
    if (activeTab === "active") return p.status === "ACTIVE";
    if (activeTab === "closed") return p.status !== "ACTIVE";
    return true;
  });

  const daoStats = [
    { label: "Active Proposals", value: "24", icon: "📋" },
    { label: "Participation Rate", value: "82%", icon: "🗳️" },
    { label: "Treasury", value: "$4.29M", icon: "💰" },
    { label: "XCV Holders", value: "12.5K", icon: "👥" },
  ];

  return (
    <PageWrapper auroraVariant="mixed">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // on-chain governance
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold text-on-surface mb-2"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
                DAO{" "}
                <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Governance
                </span>
              </h1>
              <p className="text-muted">Shape the future of the CreatorVerse ecosystem through on-chain voting.</p>
            </div>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                boxShadow: "0 0 20px rgba(123,97,255,0.3)",
              }}
            >
              + Create Proposal
            </button>
          </div>
        </div>

        {/* DAO Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {daoStats.map((s) => (
            <div
              key={s.label}
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <span className="text-2xl mb-3 block">{s.icon}</span>
              <p className="text-2xl font-bold text-on-surface mb-1"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                {s.value}
              </p>
              <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-7">
          {(["all", "active", "closed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200"
              style={{
                fontFamily: "var(--font-space-mono-var, monospace)",
                background: activeTab === tab ? "rgba(123,97,255,0.2)" : "rgba(255,255,255,0.04)",
                border: activeTab === tab ? "1px solid rgba(123,97,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                color: activeTab === tab ? "#c9bfff" : "#928ea1",
                boxShadow: activeTab === tab ? "0 0 12px rgba(123,97,255,0.2)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Proposals */}
        <div className="flex flex-col gap-4">
          {filtered.map((p) => {
            const sc = statusColor[p.status] || statusColor.PENDING;
            return (
              <div
                key={p.id}
                className="group p-6 rounded-2xl transition-all duration-300 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(123,97,255,0.3)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{
                          fontFamily: "var(--font-space-mono-var, monospace)",
                          background: "rgba(255,255,255,0.06)",
                          color: "#928ea1",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {p.id}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{
                          fontFamily: "var(--font-space-mono-var, monospace)",
                          background: "rgba(0,213,255,0.1)",
                          color: "#00d5ff",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-on-surface"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {p.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: sc.bg,
                        color: sc.color,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {p.status}
                    </span>
                    {p.status === "ACTIVE" && (
                      <button
                        className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 text-white"
                        style={{
                          fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                          background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                        }}
                      >
                        Vote Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Vote bars */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-success font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      For {p.votes.for}%
                    </span>
                    <span className="text-danger font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      Against {p.votes.against}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(248,113,113,0.2)" }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${p.votes.for}%`,
                        background: "linear-gradient(90deg, #4ade80, #22d3ee)",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${p.votes.abstain}%`, background: "rgba(146,142,161,0.4)" }}
                    />
                    <span className="text-[10px] text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      Abstain {p.votes.abstain}%
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-xs text-subtle"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  <span>Proposer: <span className="text-muted">{p.proposer}</span></span>
                  <span>Total Votes: <span className="text-muted">{p.totalVotes}</span></span>
                  <span>Quorum: <span className="text-muted">{p.quorum}</span></span>
                  <span>
                    {p.status === "ACTIVE" ? "Ends in: " : "Status: "}
                    <span className={p.status === "ACTIVE" ? "text-warning" : "text-muted"}>{p.endsIn}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
