"use client";
import { useState } from "react";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { securityLabs } from "@/lib/data";

const difficultyColor: Record<string, { bg: string; color: string }> = {
  EASY: { bg: "rgba(74,222,128,0.12)", color: "#4ade80" },
  MEDIUM: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
  HARD: { bg: "rgba(248,113,113,0.12)", color: "#f87171" },
  EXPERT: { bg: "rgba(255,95,141,0.12)", color: "#ff5f8d" },
};

const vulnerableCode = `// VulnerableContract.sol
01  pragma solidity ^0.8.0;
02
03  contract VulnerableVault {
04    mapping(address => uint) public balances;
05
06    function withdraw(uint amount) public {
07      require(balances[msg.sender] >= amount);
08
09      // ⚠ CRITICAL: External call before state update
10      (bool success,) = msg.sender.call{
11        value: amount
12      }("");
13      require(success);
14
15      // State updated AFTER external call
16      balances[msg.sender] -= amount;
17    }
18  }`;

export default function SecurityPage() {
  const [activeLabId, setActiveLabId] = useState("reentrancy");
  const activeLab = securityLabs.find((l) => l.id === activeLabId) || securityLabs[0];
  const [playbackStep, setPlaybackStep] = useState(1);

  const executionLogs = [
    { time: "00:00:001", type: "info", msg: "EVM fork initialized — Block #21,842,410" },
    { time: "00:00:142", type: "info", msg: "VulnerableVault.sol deployed at 0x7b61...ffAB" },
    { time: "00:00:288", type: "warn", msg: "Attacker contract detected — recursive call pattern" },
    { time: "00:00:419", type: "error", msg: "Reentrancy exploit confirmed — vault drained 1,200 ETH" },
  ];

  return (
    <PageWrapper auroraVariant="mixed">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // security research
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold text-on-surface mb-2"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
                Security{" "}
                <span style={{ background: "linear-gradient(135deg, #f87171, #ff5f8d)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Playground
                </span>
              </h1>
              <p className="text-muted">Elite educational sandbox for smart contract vulnerability research.</p>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.25)",
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <span className="text-xs font-bold text-success"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                MAINNET FORK ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Labs list */}
          <div>
            <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-4"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              Learning Modules
            </h2>
            <div className="flex flex-col gap-3">
              {securityLabs.map((lab) => {
                const dc = difficultyColor[lab.difficulty] || difficultyColor.MEDIUM;
                const isActive = lab.id === activeLabId;
                const isLocked = lab.status === "locked";

                return (
                  <button
                    key={lab.id}
                    onClick={() => !isLocked && setActiveLabId(lab.id)}
                    className="w-full p-4 rounded-xl text-left transition-all duration-200"
                    style={{
                      background: isActive ? "rgba(123,97,255,0.12)" : "rgba(255,255,255,0.04)",
                      border: isActive ? "1px solid rgba(123,97,255,0.35)" : "1px solid rgba(255,255,255,0.07)",
                      opacity: isLocked ? 0.5 : 1,
                      cursor: isLocked ? "not-allowed" : "pointer",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{
                          fontFamily: "var(--font-space-mono-var, monospace)",
                          background: dc.bg,
                          color: dc.color,
                          letterSpacing: "0.06em",
                        }}
                      >
                        {lab.difficulty}
                      </span>
                      {isLocked && (
                        <svg className="w-4 h-4 text-subtle" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      )}
                      {lab.status === "active" && (
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4ade80", boxShadow: "0 0 4px #4ade80" }} />
                          <span className="text-[10px] text-success" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Active</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-bold text-on-surface mb-1"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {lab.name}
                    </p>
                    <p className="text-xs text-muted leading-relaxed mb-2">{lab.description}</p>
                    <div className="flex gap-3 text-[10px] text-subtle"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      <span>{lab.completions} completed</span>
                      <span>Success: {lab.successRate}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <Link href="/security/contract">
              <button
                className="w-full mt-4 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                  background: "linear-gradient(135deg, #f87171, #ff5f8d)",
                  boxShadow: "0 0 20px rgba(248,113,113,0.25)",
                }}
              >
                AI Contract Analyzer →
              </button>
            </Link>
          </div>

          {/* Lab content */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Lab title */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-on-surface"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                  {activeLab.name}
                </h2>
                <button
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                  style={{
                    fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                    background: "linear-gradient(135deg, #f87171, #ff5f8d)",
                  }}
                >
                  Start Lab
                </button>
              </div>
              <p className="text-sm text-muted">{activeLab.description}</p>
            </div>

            {/* Code viewer */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(6,8,22,0.9)",
                border: "1px solid rgba(248,113,113,0.2)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {["#f87171", "#fbbf24", "#4ade80"].map((c) => (
                      <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    VulnerableContract.sol
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-2.5 py-1 rounded"
                  style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-danger" />
                  <span className="text-[10px] font-bold text-danger" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    VULNERABILITY DETECTED
                  </span>
                </div>
              </div>
              <pre
                className="text-xs leading-6 p-4 overflow-x-auto"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  color: "#c9c4d8",
                }}
              >
                {vulnerableCode.split("\n").map((line, i) => (
                  <div
                    key={i}
                    style={{
                      background: line.includes("⚠") || line.includes("AFTER") ? "rgba(248,113,113,0.08)" : "transparent",
                      borderLeft: line.includes("⚠") || line.includes("AFTER") ? "2px solid #f87171" : "2px solid transparent",
                      paddingLeft: "8px",
                      color: line.includes("//") ? "#928ea1" : line.includes("pragma") || line.includes("contract") ? "#00d5ff" : "#c9c4d8",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </pre>

              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(248,113,113,0.06)" }}
              >
                <span className="text-xs text-danger" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  ⚠ Checks-Effects-Interactions pattern violation
                </span>
                <button
                  className="px-3 py-1 rounded text-[10px] font-bold text-white"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    background: "rgba(248,113,113,0.2)",
                    border: "1px solid rgba(248,113,113,0.4)",
                    color: "#f87171",
                  }}
                >
                  Deploy Patch →
                </button>
              </div>
            </div>

            {/* Attack visualization */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-on-surface"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                  Attack Replay Visualization
                </h3>
                <div className="flex gap-3 text-xs text-subtle"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  <span>Success: <span className="text-success font-bold">{activeLab.successRate}</span></span>
                  <span>Vault: <span className="text-warning font-bold">1.2k ETH</span></span>
                </div>
              </div>

              {/* Entity flow */}
              <div className="flex items-center justify-between mb-5">
                {["Attacker", "→ Call →", "Vault", "← Drain ←", "Attacker"].map((e, i) => (
                  <div key={i} className="text-center">
                    {(i === 0 || i === 2 || i === 4) ? (
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-1"
                        style={{
                          background: i === 0 || i === 4 ? "rgba(248,113,113,0.12)" : "rgba(123,97,255,0.12)",
                          border: `1px solid ${i === 0 || i === 4 ? "rgba(248,113,113,0.3)" : "rgba(123,97,255,0.3)"}`,
                        }}
                      >
                        <span className="text-2xl">{i === 0 || i === 4 ? "🔴" : "🏦"}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{e}</span>
                    )}
                    {(i === 0 || i === 2 || i === 4) && (
                      <p className="text-[10px] text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                        {e}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Playback controls */}
              <div className="flex items-center gap-3">
                {["prev", "play", "next"].map((ctrl) => (
                  <button
                    key={ctrl}
                    onClick={() => {
                      if (ctrl === "next") setPlaybackStep((s) => Math.min(4, s + 1));
                      if (ctrl === "prev") setPlaybackStep((s) => Math.max(1, s - 1));
                    }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: ctrl === "play" ? "rgba(248,113,113,0.2)" : "rgba(255,255,255,0.05)",
                      border: ctrl === "play" ? "1px solid rgba(248,113,113,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: ctrl === "play" ? "#f87171" : "#928ea1",
                    }}
                  >
                    {ctrl === "prev" ? "⏮" : ctrl === "play" ? "▶" : "⏭"}
                  </button>
                ))}
                <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(playbackStep / 4) * 100}%`,
                      background: "linear-gradient(90deg, #f87171, #ff5f8d)",
                    }}
                  />
                </div>
                <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {playbackStep}/4
                </span>
              </div>
            </div>

            {/* Execution logs */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(6,8,22,0.8)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="flex gap-1.5">
                  {["#f87171", "#fbbf24", "#4ade80"].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  execution_log.stdout
                </span>
              </div>
              <div className="p-4 space-y-2">
                {executionLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    <span className="text-subtle flex-shrink-0">[{log.time}]</span>
                    <span
                      style={{
                        color: log.type === "error" ? "#f87171" : log.type === "warn" ? "#fbbf24" : "#928ea1",
                      }}
                    >
                      {log.type === "error" ? "✗ " : log.type === "warn" ? "⚠ " : "✓ "}
                      {log.msg}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 text-xs text-success"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  <div
                    className="w-1.5 h-3 rounded-sm"
                    style={{ background: "#4ade80", animation: "glow-pulse 1s ease-in-out infinite" }}
                  />
                  <span className="opacity-60">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
