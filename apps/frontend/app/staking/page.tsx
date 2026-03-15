"use client";
import PageWrapper from "@/components/ui/PageWrapper";
import { stakingPools } from "@/lib/data";

const riskColor: Record<string, { bg: string; color: string }> = {
  Low: { bg: "rgba(74,222,128,0.12)", color: "#4ade80" },
  Medium: { bg: "rgba(251,191,36,0.12)", color: "#fbbf24" },
  High: { bg: "rgba(248,113,113,0.12)", color: "#f87171" },
};

const gradientMap: Record<string, string> = {
  "from-primary to-secondary": "linear-gradient(135deg, #7b61ff, #00d5ff)",
  "from-secondary to-primary": "linear-gradient(135deg, #00d5ff, #7b61ff)",
  "from-primary to-accent": "linear-gradient(135deg, #7b61ff, #ff5f8d)",
  "from-accent to-gold": "linear-gradient(135deg, #ff5f8d, #ffb77d)",
};

export default function StakingPage() {
  const userPositions = stakingPools.filter((p) => p.yourStake);

  return (
    <PageWrapper auroraVariant="cyan">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // liquidity staking
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold text-on-surface mb-2"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
                Staking{" "}
                <span style={{ background: "linear-gradient(135deg, #00d5ff, #7b61ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Dashboard
                </span>
              </h1>
              <p className="text-muted">Maximize yield across creator pools with auto-compounding rewards.</p>
            </div>
            <div className="flex gap-4 text-sm"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              <div className="text-center">
                <p className="text-2xl font-bold text-on-surface">$24,720</p>
                <p className="text-xs text-subtle">Your Total Staked</p>
              </div>
              <div
                className="w-px"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />
              <div className="text-center">
                <p className="text-2xl font-bold text-success">$1,437.30</p>
                <p className="text-xs text-subtle">Total Earned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Positions */}
        {userPositions.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-bold text-on-surface mb-4"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              Your Positions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userPositions.map((pool) => (
                <div
                  key={pool.id}
                  className="p-5 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(123,97,255,0.25)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 0 20px rgba(123,97,255,0.1)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `${gradientMap[pool.gradient] || "linear-gradient(135deg,#7b61ff,#00d5ff)"}` }}
                  />

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={pool.nftImageUrl} alt={pool.logo1} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-bold text-on-surface ml-1"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {pool.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Staked</p>
                      <p className="text-sm font-bold text-on-surface" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{pool.yourStake}</p>
                    </div>
                    <div>
                      <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Earned</p>
                      <p className="text-sm font-bold text-success" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{pool.earned}</p>
                    </div>
                    <div>
                      <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>APY</p>
                      <p className="text-lg font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)", color: "#00d5ff" }}>{pool.apy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Duration</p>
                      <p className="text-sm font-bold text-muted" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{pool.duration}</p>
                    </div>
                  </div>

                  <button
                    className="w-full py-2 rounded-xl text-xs font-bold transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                      background: "rgba(74,222,128,0.15)",
                      border: "1px solid rgba(74,222,128,0.3)",
                      color: "#4ade80",
                    }}
                  >
                    Claim {pool.earned} Rewards
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All pools */}
        <section>
          <h2 className="text-lg font-bold text-on-surface mb-5"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
            Available Pools
          </h2>
          <div className="flex flex-col gap-4">
            {stakingPools.map((pool) => {
              const rc = riskColor[pool.risk] || riskColor.Medium;
              return (
                <div
                  key={pool.id}
                  className="group p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,213,255,0.3)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(0,213,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Pool identity */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={pool.nftImageUrl} alt={pool.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-on-surface mb-0.5"
                          style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                          {pool.name}
                        </p>
                        <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                          Rewards: {pool.rewards}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-8">
                      <div>
                        <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>APY</p>
                        <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)", color: "#00d5ff" }}>{pool.apy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>TVL</p>
                        <p className="text-base font-bold text-on-surface" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{pool.tvl}</p>
                      </div>
                      <div>
                        <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Duration</p>
                        <p className="text-base font-bold text-muted" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{pool.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-subtle mb-1" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Risk</p>
                        <span
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{
                            fontFamily: "var(--font-space-mono-var, monospace)",
                            background: rc.bg,
                            color: rc.color,
                          }}
                        >
                          {pool.risk}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div>
                      {pool.yourStake ? (
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 rounded-xl text-xs font-bold"
                            style={{
                              fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                              background: "rgba(248,113,113,0.12)",
                              border: "1px solid rgba(248,113,113,0.3)",
                              color: "#f87171",
                            }}
                          >
                            Unstake
                          </button>
                          <button
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                            style={{
                              fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                              background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                            }}
                          >
                            Add More
                          </button>
                        </div>
                      ) : (
                        <button
                          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
                          style={{
                            fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                            background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                            boxShadow: "0 0 16px rgba(123,97,255,0.25)",
                          }}
                        >
                          Stake Now
                        </button>
                      )}
                    </div>
                  </div>

                  {pool.yourStake && (
                    <div
                      className="mt-4 pt-4 flex gap-6 text-xs"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-space-mono-var, monospace)" }}
                    >
                      <span className="text-subtle">Your stake: <span className="text-on-surface font-bold">{pool.yourStake}</span></span>
                      <span className="text-subtle">Earned: <span className="text-success font-bold">{pool.earned}</span></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
