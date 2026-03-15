"use client";
import { use } from "react";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { creators, nfts } from "@/lib/data";

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const creator = creators.find((c) => c.id === id) || creators[0];
  const creatorNfts = nfts.slice(0, 3);

  const tabs = ["Portfolio", "NFTs", "DAO Activity", "About"];

  const gradientMap: Record<string, string> = {
    "from-primary to-secondary": "linear-gradient(135deg, #7b61ff, #00d5ff)",
    "from-secondary to-accent": "linear-gradient(135deg, #00d5ff, #ff5f8d)",
    "from-accent to-gold": "linear-gradient(135deg, #ff5f8d, #ffb77d)",
    "from-gold to-primary": "linear-gradient(135deg, #ffb77d, #7b61ff)",
    "from-primary to-accent": "linear-gradient(135deg, #7b61ff, #ff5f8d)",
    "from-secondary to-primary": "linear-gradient(135deg, #00d5ff, #7b61ff)",
  };

  return (
    <PageWrapper auroraVariant="purple">
      {/* Hero banner */}
      <div className="relative h-64 flex items-end overflow-hidden">
        <img
          src={creator.imageUrl}
          alt={creator.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${creator.color}66, transparent 60%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

        {/* Back */}
        <Link
          href="/explore"
          className="absolute top-8 left-6 md:left-16 flex items-center gap-2 text-sm text-muted hover:text-on-surface transition-colors"
          style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}
        >
          ← Back to Explore
        </Link>

        <div className="relative z-10 px-6 md:px-16 pb-0 flex items-end gap-5 w-full max-w-7xl mx-auto">
          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-2xl flex-shrink-0 translate-y-12 overflow-hidden"
            style={{
              border: `3px solid ${creator.color}60`,
              boxShadow: `0 0 30px ${creator.color}40`,
            }}
          >
            <img src={creator.imageUrl} alt={creator.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-16 pb-4">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.02em" }}>
                {creator.name}
              </h1>
              {creator.verified && (
                <svg className="w-6 h-6" style={{ color: creator.color }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  background: `${creator.color}20`,
                  color: creator.color,
                  border: `1px solid ${creator.color}40`,
                  letterSpacing: "0.06em",
                }}
              >
                {creator.tier}
              </span>
            </div>
            <p className="text-muted mb-3">{creator.handle}</p>
            <div className="flex flex-wrap gap-2">
              {creator.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#928ea1",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e5e0ee",
              }}
            >
              Follow
            </button>
            <button
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                background: `linear-gradient(135deg, ${creator.color}, #00d5ff)`,
                boxShadow: `0 0 20px ${creator.color}30`,
              }}
            >
              Stake Creator
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Token Price", value: creator.tokenPrice, highlight: true },
            { label: "APY", value: creator.apy, green: true },
            { label: "TVL", value: creator.tvl, highlight: false },
            { label: "Followers", value: creator.followers, highlight: false },
          ].map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-xl text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${s.highlight ? `${creator.color}30` : "rgba(255,255,255,0.07)"}`,
                backdropFilter: "blur(12px)",
              }}
            >
              <p
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "var(--font-space-mono-var, monospace)",
                  color: s.green ? "#4ade80" : s.highlight ? creator.color : "#e5e0ee",
                }}
              >
                {s.value}
              </p>
              <p className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className="px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                background: i === 0 ? "rgba(123,97,255,0.2)" : "transparent",
                border: i === 0 ? "1px solid rgba(123,97,255,0.35)" : "1px solid transparent",
                color: i === 0 ? "#c9bfff" : "#928ea1",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Token chart placeholder */}
          <div
            className="lg:col-span-2 p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-on-surface"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                {creator.name} Token Price
              </h3>
              <span className="text-xs font-bold text-success"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                +{creator.apy} APY
              </span>
            </div>

            {/* Simulated chart */}
            <div
              className="h-40 flex items-end gap-1 relative overflow-hidden rounded-lg p-4"
              style={{ background: "rgba(0,0,0,0.2)" }}
            >
              {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg, ${creator.color}cc, ${creator.color}22)`,
                    boxShadow: i === 11 ? `0 0 10px ${creator.color}80` : "none",
                  }}
                />
              ))}
              {/* Glow line */}
              <div
                className="absolute bottom-4 left-4 right-4 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${creator.color}60, transparent)` }}
              />
            </div>

            <div className="flex justify-between mt-3 text-xs text-subtle"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              <span>Current: <span className="text-on-surface font-bold">{creator.tokenPrice}</span></span>
              <span>ATH: <span className="text-on-surface font-bold">${(parseFloat(creator.tokenPrice.replace("$", "")) * 2.4).toFixed(2)}</span></span>
            </div>
          </div>

          {/* Creator stats panel */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
            }}
          >
            <h3 className="text-base font-bold text-on-surface mb-4"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              Creator Stats
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { label: "Stakers", value: "8,420" },
                { label: "NFTs Minted", value: "2,841" },
                { label: "DAO Proposals", value: "14" },
                { label: "Content Posts", value: "428" },
                { label: "Avg. Royalty", value: "7.5%" },
              ].map((s) => (
                <div key={s.label} className="flex justify-between items-center">
                  <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</span>
                  <span className="text-xs font-bold text-on-surface" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NFTs */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-on-surface"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              Latest NFTs
            </h3>
            <Link href="/marketplace" className="text-xs text-primary-dim hover:text-primary transition-colors"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {creatorNfts.map((nft) => (
              <div
                key={nft.id}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ background: gradientMap[nft.gradient] || "linear-gradient(135deg,#7b61ff,#00d5ff)" }}
                >
                  <span className="text-4xl font-black text-white/30"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {nft.image}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-on-surface mb-1"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {nft.name}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary-dim"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {nft.price}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: nft.rarity === "LEGENDARY" ? "rgba(255,183,125,0.15)" : "rgba(123,97,255,0.15)",
                        color: nft.rarity === "LEGENDARY" ? "#ffb77d" : "#c9bfff",
                      }}
                    >
                      {nft.rarity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
