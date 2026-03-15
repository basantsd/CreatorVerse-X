"use client";
import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";

const sampleContract = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TokenVault {
    address public owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount);
        (bool success,) = msg.sender.call{value: amount}("");
        require(success);
        balances[msg.sender] -= amount; // Bug: state update after call
    }

    function emergencyDrain() external {
        require(msg.sender == owner);
        payable(owner).transfer(address(this).balance);
    }
}`;

const findings = [
  {
    id: "F-001",
    severity: "CRITICAL",
    title: "Reentrancy Vulnerability in withdraw()",
    description: "External call made before state update. Attacker can recursively call withdraw() to drain funds.",
    line: "L16",
    recommendation: "Apply Checks-Effects-Interactions pattern. Update state before external call.",
    color: "#f87171",
  },
  {
    id: "F-002",
    severity: "HIGH",
    title: "Missing Access Control on emergencyDrain()",
    description: "emergencyDrain() relies solely on msg.sender == owner. No multi-sig or timelock protection.",
    line: "L22",
    recommendation: "Implement multi-signature requirement and 48-hour timelock for emergency functions.",
    color: "#fbbf24",
  },
  {
    id: "F-003",
    severity: "MEDIUM",
    title: "Integer Overflow Risk (Solidity < 0.8 patterns used)",
    description: "balance arithmetic should use SafeMath or ensure Solidity ^0.8 overflow protection is active.",
    line: "L14",
    recommendation: "Verify ^0.8 overflow protection is active. Consider explicit SafeMath usage for clarity.",
    color: "#7b61ff",
  },
  {
    id: "F-004",
    severity: "INFO",
    title: "No Events Emitted for State Changes",
    description: "Deposit and withdraw functions do not emit events, making off-chain tracking impossible.",
    line: "L12",
    recommendation: "Add Deposit and Withdrawal events for all balance-changing operations.",
    color: "#928ea1",
  },
];

const severityColor: Record<string, { bg: string; color: string }> = {
  CRITICAL: { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
  HIGH: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
  MEDIUM: { bg: "rgba(123,97,255,0.15)", color: "#c9bfff" },
  INFO: { bg: "rgba(146,142,161,0.12)", color: "#928ea1" },
};

export default function ContractAnalyzerPage() {
  const [inputCode, setInputCode] = useState(sampleContract);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const filtered = findings.filter(
    (f) => activeFilter === "All" || f.severity === activeFilter
  );

  const riskScore = 42;

  return (
    <PageWrapper auroraVariant="mixed">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // ai contract analyzer
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold text-on-surface mb-2"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
                AI Contract{" "}
                <span style={{ background: "linear-gradient(135deg, #f87171, #7b61ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Analyzer
                </span>
              </h1>
              <p className="text-muted">ML-powered smart contract vulnerability detection. Audited by the community.</p>
            </div>
            <div className="flex gap-3 text-xs"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-success" style={{ boxShadow: "0 0 4px #4ade80" }} />
                <span className="text-success font-bold">Model v4.2 Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="flex flex-col gap-5">
            {/* Code input */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(6,8,22,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
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
                    contract.sol
                  </span>
                </div>
                <div className="flex gap-2">
                  {["Paste ABI", "Upload .sol"].map((action) => (
                    <button
                      key={action}
                      className="px-3 py-1 rounded text-[10px] font-bold transition-all duration-200"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "#928ea1",
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full h-96 p-4 text-xs resize-none outline-none"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  background: "transparent",
                  color: "#c9c4d8",
                  lineHeight: "1.7",
                  caretColor: "#7b61ff",
                }}
                spellCheck={false}
              />

              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {inputCode.split("\n").length} lines · {inputCode.length} chars
                </span>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                    background: isAnalyzing
                      ? "rgba(123,97,255,0.5)"
                      : "linear-gradient(135deg, #7b61ff, #f87171)",
                    boxShadow: isAnalyzing ? "none" : "0 0 20px rgba(123,97,255,0.35)",
                  }}
                >
                  {isAnalyzing ? (
                    <>
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        style={{ animation: "spin-slow 0.8s linear infinite" }}
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      🔍 Analyze Contract
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Risk score */}
            {analyzed && (
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(248,113,113,0.2)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-on-surface"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    Risk Score
                  </h3>
                  <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    {findings.length} issues found
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="relative w-20 h-20 flex-shrink-0"
                  >
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14"
                        fill="none"
                        stroke="url(#riskGrad)"
                        strokeWidth="3"
                        strokeDasharray={`${(riskScore / 100) * 87.96} 87.96`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f87171" />
                          <stop offset="100%" stopColor="#fbbf24" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-danger"
                        style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                        {riskScore}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-danger mb-1"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      HIGH RISK
                    </p>
                    <p className="text-xs text-muted">1 critical, 1 high, 1 medium, 1 informational finding. Immediate remediation required.</p>
                    <div className="flex gap-3 mt-3">
                      {[
                        { label: "Critical", count: 1, color: "#f87171" },
                        { label: "High", count: 1, color: "#fbbf24" },
                        { label: "Medium", count: 1, color: "#c9bfff" },
                        { label: "Info", count: 1, color: "#928ea1" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <p className="text-sm font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)", color: s.color }}>{s.count}</p>
                          <p className="text-[9px] text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Findings */}
          <div>
            {analyzed && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-on-surface"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    Security Findings
                  </h2>
                  <div className="flex gap-1.5">
                    {["All", "CRITICAL", "HIGH", "MEDIUM", "INFO"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className="px-2.5 py-1 rounded text-[10px] font-bold transition-all duration-200"
                        style={{
                          fontFamily: "var(--font-space-mono-var, monospace)",
                          background: activeFilter === f ? "rgba(123,97,255,0.2)" : "rgba(255,255,255,0.04)",
                          border: activeFilter === f ? "1px solid rgba(123,97,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                          color: activeFilter === f ? "#c9bfff" : "#928ea1",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {filtered.map((finding) => {
                    const sc = severityColor[finding.severity] || severityColor.INFO;
                    return (
                      <div
                        key={finding.id}
                        className="p-5 rounded-2xl transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid ${finding.color}25`,
                          backdropFilter: "blur(16px)",
                        }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded"
                              style={{
                                fontFamily: "var(--font-space-mono-var, monospace)",
                                background: sc.bg,
                                color: sc.color,
                                letterSpacing: "0.06em",
                              }}
                            >
                              {finding.severity}
                            </span>
                            <span className="text-xs text-subtle"
                              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                              {finding.id}
                            </span>
                          </div>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded"
                            style={{
                              fontFamily: "var(--font-space-mono-var, monospace)",
                              background: "rgba(255,255,255,0.06)",
                              color: "#928ea1",
                            }}
                          >
                            {finding.line}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-on-surface mb-2"
                          style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                          {finding.title}
                        </h3>
                        <p className="text-xs text-muted mb-3 leading-relaxed">{finding.description}</p>

                        <div
                          className="p-3 rounded-xl"
                          style={{ background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}
                        >
                          <p className="text-[10px] font-bold text-success mb-1"
                            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                            RECOMMENDATION
                          </p>
                          <p className="text-xs text-muted">{finding.recommendation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  className="w-full mt-5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                    background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                    boxShadow: "0 0 20px rgba(123,97,255,0.25)",
                  }}
                >
                  Export Full Audit Report (PDF)
                </button>
              </>
            )}

            {!analyzed && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-base font-bold text-on-surface mb-2"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                  No analysis yet
                </p>
                <p className="text-sm text-subtle">Paste your contract code and click Analyze.</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div
                  className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary mb-4"
                  style={{ animation: "spin-slow 1s linear infinite" }}
                />
                <p className="text-base font-bold text-on-surface mb-1"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                  Analyzing...
                </p>
                <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  Running 42 vulnerability checks
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
