"use client";
import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";
import { collections, nfts } from "@/lib/data";

const gradientMap: Record<string, string> = {
  "from-secondary to-primary": "linear-gradient(135deg, #00d5ff, #7b61ff)",
  "from-primary to-accent": "linear-gradient(135deg, #7b61ff, #ff5f8d)",
  "from-accent to-secondary": "linear-gradient(135deg, #ff5f8d, #00d5ff)",
  "from-gold to-primary": "linear-gradient(135deg, #ffb77d, #7b61ff)",
};

export default function CollectionsPage() {
  return (
    <PageWrapper auroraVariant="cyan">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // nft collections
          </p>
          <h1 className="text-5xl font-bold text-on-surface mb-3"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
            NFT{" "}
            <span style={{ background: "linear-gradient(135deg, #00d5ff, #7b61ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Collections Hub
            </span>
          </h1>
          <p className="text-muted max-w-lg">Explore curated collections from the CreatorVerse ecosystem. Trade, stake, and govern.</p>
        </div>

        {/* Top Collections Table */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-on-surface"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              Top Collections
            </h2>
            <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>24h Volume</span>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-6 px-6 py-3 text-xs font-medium text-subtle"
              style={{
                fontFamily: "var(--font-space-mono-var, monospace)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                letterSpacing: "0.06em",
              }}
            >
              <span className="col-span-2"># Collection</span>
              <span className="text-right">Items</span>
              <span className="text-right">Floor</span>
              <span className="text-right">Volume</span>
              <span className="text-right">24h %</span>
            </div>

            {collections.map((col, i) => (
              <div
                key={col.id}
                className="group grid grid-cols-6 items-center px-6 py-4 transition-all duration-200 cursor-pointer"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(123,97,255,0.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
              >
                <div className="col-span-2 flex items-center gap-4">
                  <span className="text-sm text-subtle w-4" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{i + 1}</span>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: gradientMap[col.gradient] || "linear-gradient(135deg,#7b61ff,#00d5ff)" }}
                  >
                    {col.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface mb-0.5"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {col.name}
                    </p>
                    <p className="text-xs text-subtle">{col.creator}</p>
                  </div>
                </div>
                <span className="text-sm text-right font-medium text-muted"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {col.items}
                </span>
                <span className="text-sm text-right font-bold text-on-surface"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {col.floorPrice}
                </span>
                <span className="text-sm text-right font-bold text-secondary-dim"
                  style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                  {col.volume}
                </span>
                <span
                  className="text-sm text-right font-bold"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    color: col.positive ? "#4ade80" : "#f87171",
                  }}
                >
                  {col.change}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured collections */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-on-surface mb-6"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collections.slice(0, 2).map((col) => (
              <div
                key={col.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Banner */}
                <div
                  className="h-36 relative"
                  style={{ background: gradientMap[col.gradient] || "linear-gradient(135deg,#7b61ff,#00d5ff)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-black text-white/20"
                      style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                      {col.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-on-surface mb-0.5"
                        style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                        {col.name}
                      </h3>
                      <p className="text-xs text-subtle">by {col.creator}</p>
                    </div>
                    <div
                      className="text-xs font-bold px-2 py-1 rounded"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: col.positive ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)",
                        color: col.positive ? "#4ade80" : "#f87171",
                      }}
                    >
                      {col.change}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Items", value: col.items },
                      { label: "Floor", value: col.floorPrice },
                      { label: "Volume", value: col.volume },
                    ].map((s) => (
                      <div key={s.label}
                        className="text-center py-2 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
                        <p className="text-xs text-subtle mb-1"
                          style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                          {s.label}
                        </p>
                        <p className="text-sm font-bold text-on-surface"
                          style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent NFTs */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-on-surface"
              style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
              Recently Listed
            </h2>
            <Link href="/marketplace" className="text-sm text-primary-dim hover:text-primary flex items-center gap-1 transition-colors">
              View marketplace
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {nfts.map((nft) => (
              <div
                key={nft.id}
                className="rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: { "from-primary to-secondary": "linear-gradient(135deg,#7b61ff,#00d5ff)", "from-secondary to-accent": "linear-gradient(135deg,#00d5ff,#ff5f8d)", "from-accent to-gold": "linear-gradient(135deg,#ff5f8d,#ffb77d)", "from-gold to-primary": "linear-gradient(135deg,#ffb77d,#7b61ff)", "from-primary to-accent": "linear-gradient(135deg,#7b61ff,#ff5f8d)", "from-secondary to-primary": "linear-gradient(135deg,#00d5ff,#7b61ff)" }[nft.gradient] || "linear-gradient(135deg,#7b61ff,#00d5ff)" }}
                >
                  <span className="text-2xl font-black text-white/30"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {nft.image}
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-bold text-on-surface mb-0.5 truncate"
                    style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                    {nft.name}
                  </p>
                  <p className="text-xs font-bold text-primary-dim"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    {nft.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
