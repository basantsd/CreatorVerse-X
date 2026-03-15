"use client";
import { useState } from "react";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { creators } from "@/lib/data";

const categories = ["All", "Music", "Art", "Gaming", "Film", "Tech", "Code", "DAO"];
const tiers = ["All Tiers", "ELITE", "DAO HEAD", "TRENDING", "CREATOR"];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTier, setActiveTier] = useState("All Tiers");
  const [search, setSearch] = useState("");

  const filtered = creators.filter((c) => {
    const matchCat = activeCategory === "All" || c.tags.includes(activeCategory);
    const matchTier = activeTier === "All Tiers" || c.tier === activeTier;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchTier && matchSearch;
  });

  return (
    <PageWrapper auroraVariant="purple">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // discover creators
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold text-on-surface mb-2"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
                Explore{" "}
                <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Creators
                </span>
              </h1>
              <p className="text-muted">Discover, stake, and govern the next generation of digital creators.</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-subtle"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              <span className="text-on-surface font-bold text-lg">{creators.length}</span> creators indexed
            </div>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search bar */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-subtle" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or handle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm text-on-surface placeholder:text-subtle outline-none transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                fontFamily: "var(--font-space-mono-var, monospace)",
              }}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                style={{
                  fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                  background: activeCategory === cat ? "rgba(123,97,255,0.2)" : "rgba(255,255,255,0.04)",
                  border: activeCategory === cat ? "1px solid rgba(123,97,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  color: activeCategory === cat ? "#c9bfff" : "#928ea1",
                  boxShadow: activeCategory === cat ? "0 0 12px rgba(123,97,255,0.2)" : "none",
                  letterSpacing: "0.02em",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tier filters */}
          <div className="flex flex-wrap gap-2">
            {tiers.map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className="px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-200"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  background: activeTier === tier ? "rgba(0,213,255,0.15)" : "rgba(255,255,255,0.03)",
                  border: activeTier === tier ? "1px solid rgba(0,213,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                  color: activeTier === tier ? "#00d5ff" : "#928ea1",
                  letterSpacing: "0.06em",
                }}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Creator Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-lg font-bold text-on-surface mb-2"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              No creators found
            </p>
            <p className="text-sm text-subtle">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <Link key={c.id} href={`/creator/${c.id}`}>
                <div
                  className="group relative p-6 rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${c.color}60`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${c.color}20, 0 8px 32px rgba(0,0,0,0.3)`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Top bar gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${c.color}60, transparent)` }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-base font-bold text-on-surface"
                            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                            {c.name}
                          </p>
                          {c.verified && (
                            <svg className="w-4 h-4" style={{ color: c.color }} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-subtle">{c.handle}</p>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: `${c.color}20`,
                        color: c.color,
                        border: `1px solid ${c.color}40`,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {c.status === "LIVE" && (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                        />
                      )}
                      {c.tier}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 mb-5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider"
                        style={{
                          fontFamily: "var(--font-space-mono-var, monospace)",
                          background: "rgba(255,255,255,0.06)",
                          color: "#928ea1",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: "Token", value: c.tokenPrice },
                      { label: "APY", value: c.apy, positive: true },
                      { label: "TVL", value: c.tvl },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-xs text-subtle mb-1"
                          style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                          {stat.label}
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{
                            fontFamily: "var(--font-space-mono-var, monospace)",
                            color: stat.positive ? "#4ade80" : "#e5e0ee",
                          }}
                        >
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Followers bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Followers</span>
                      <span className="text-on-surface font-bold" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{c.followers}</span>
                    </div>
                    <div className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, parseInt(c.followers) / 4)}%`,
                          background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className="w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                      background: `${c.color}18`,
                      border: `1px solid ${c.color}35`,
                      color: c.color,
                    }}
                  >
                    Stake Creator ↗
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
