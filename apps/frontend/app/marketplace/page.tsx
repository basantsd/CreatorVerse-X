"use client";
import { useState, useEffect } from "react";
import PageWrapper from "@/components/ui/PageWrapper";

interface NFT {
  id: string;
  name: string;
  creator: string;
  price: string;
  usdPrice: string;
  status: string;
  endTime: string | null;
  rarity: string;
  royalty: string;
  image: string;
  gradient: string;
  imageUrl: string;
}

const rarities = ["All", "LEGENDARY", "RARE", "COMMON"];
const chains = ["Ethereum", "Polygon", "Solana"];
const saleTypes = ["All", "Buy Now", "Live Auction"];

const rarityColor: Record<string, string> = {
  LEGENDARY: "#ffb77d",
  RARE: "#7b61ff",
  COMMON: "#928ea1",
};

const gradientMap: Record<string, string> = {
  "from-primary to-secondary": "linear-gradient(135deg, #7b61ff, #00d5ff)",
  "from-secondary to-accent": "linear-gradient(135deg, #00d5ff, #ff5f8d)",
  "from-accent to-gold": "linear-gradient(135deg, #ff5f8d, #ffb77d)",
  "from-gold to-primary": "linear-gradient(135deg, #ffb77d, #7b61ff)",
  "from-primary to-accent": "linear-gradient(135deg, #7b61ff, #ff5f8d)",
  "from-secondary to-primary": "linear-gradient(135deg, #00d5ff, #7b61ff)",
};

export default function MarketplacePage() {
  const [activeRarity, setActiveRarity] = useState("All");
  const [activeSale, setActiveSale] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNfts();
  }, [activeRarity, activeSale]);

  const fetchNfts = async () => {
    try {
      const params = new URLSearchParams();
      if (activeRarity !== "All") params.append("rarity", activeRarity);
      if (activeSale !== "All") params.append("status", activeSale);

      const response = await fetch(`/api/nfts?${params}`);
      const data = await response.json();
      if (data.success) {
        setNfts(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = nfts;

  return (
    <PageWrapper auroraVariant="mixed">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // nft marketplace
          </p>
          <h1 className="text-5xl font-bold text-on-surface mb-2"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
            Explore{" "}
            <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Galaxy
            </span>
          </h1>
          <p className="text-muted max-w-lg">Curated digital artifacts from the universe's most visionary creators.</p>
        </div>

        {/* Live stats bar */}
        <div
          className="flex flex-wrap gap-6 items-center px-6 py-4 rounded-xl mb-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
        >
          {[
            { label: "24h Volume", value: "42,910 ETH", change: "+12.4%" },
            { label: "Floor (Neon Knights)", value: "2.4 ETH", change: null },
            { label: "Active Traders", value: "1.2M", change: null },
            { label: "Gas", value: "14 Gwei", change: null },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div>
                <p className="text-xs text-subtle mb-0.5" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-on-surface" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{s.value}</p>
                  {s.change && (
                    <span className="text-[10px] font-bold text-success"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {s.change}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-px h-8 bg-outline-variant hidden sm:block" />
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Left sidebar filters */}
          <aside
            className="hidden lg:block w-56 flex-shrink-0 p-5 rounded-xl h-fit sticky top-20"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}
          >
            <h3 className="text-xs font-bold text-subtle uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
              Filters
            </h3>

            {/* Rarity */}
            <div className="mb-6">
              <p className="text-xs text-subtle mb-3" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Rarity Tier</p>
              <div className="flex flex-col gap-1.5">
                {rarities.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRarity(r)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-left transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      background: activeRarity === r ? "rgba(123,97,255,0.15)" : "transparent",
                      border: activeRarity === r ? "1px solid rgba(123,97,255,0.35)" : "1px solid transparent",
                      color: activeRarity === r ? "#c9bfff" : "#928ea1",
                    }}
                  >
                    {r !== "All" && (
                      <span
                        className="w-2 h-2 rounded-sm"
                        style={{ background: rarityColor[r] || "#928ea1" }}
                      />
                    )}
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Chain */}
            <div className="mb-6">
              <p className="text-xs text-subtle mb-3" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Blockchain</p>
              <div className="flex flex-col gap-2">
                {chains.map((ch) => (
                  <label key={ch} className="flex items-center gap-2 cursor-pointer">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center"
                      style={{
                        background: "rgba(123,97,255,0.2)",
                        border: "1px solid rgba(123,97,255,0.4)",
                      }}
                    >
                      <svg className="w-2.5 h-2.5 text-primary-dim" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-xs text-muted" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{ch}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sale Type */}
            <div className="mb-6">
              <p className="text-xs text-subtle mb-3" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Sale Type</p>
              <div className="flex flex-col gap-1.5">
                {saleTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveSale(t)}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-left transition-all duration-200"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      background: activeSale === t ? "rgba(0,213,255,0.12)" : "transparent",
                      border: activeSale === t ? "1px solid rgba(0,213,255,0.35)" : "1px solid transparent",
                      color: activeSale === t ? "#00d5ff" : "#928ea1",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="w-full py-2 rounded-lg text-xs font-bold text-subtle transition-all duration-200 hover:text-on-surface"
              style={{
                fontFamily: "var(--font-space-mono-var, monospace)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onClick={() => { setActiveRarity("All"); setActiveSale("All"); }}
            >
              Reset All
            </button>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                <span className="text-on-surface font-bold">{filtered.length}</span> items
              </p>
              <div className="flex gap-1.5">
                {(["grid", "list"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      background: view === v ? "rgba(123,97,255,0.2)" : "rgba(255,255,255,0.04)",
                      border: view === v ? "1px solid rgba(123,97,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {v === "grid" ? (
                      <svg className="w-3.5 h-3.5 text-muted" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 0113.5 15h-3A1.5 1.5 0 019 13.5v-3z" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* NFT Grid */}
            <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" : "flex flex-col gap-3"}>
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden animate-pulse"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    <div className="h-52 bg-gradient-to-br from-gray-700 to-gray-800"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded mb-3"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-700 rounded w-16"></div>
                        <div className="h-4 bg-gray-700 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                filtered.map((nft) => (
                <div
                  key={nft.id}
                  className="group rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(16px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(123,97,255,0.35)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 24px rgba(123,97,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Image area */}
                  <div
                    className="relative h-52 overflow-hidden"
                    style={{ background: gradientMap[nft.gradient] || "linear-gradient(135deg, #7b61ff, #00d5ff)" }}
                  >
                    <img
                      src={nft.imageUrl}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Rarity badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: "rgba(0,0,0,0.6)",
                        backdropFilter: "blur(8px)",
                        color: rarityColor[nft.rarity] || "#928ea1",
                        border: `1px solid ${rarityColor[nft.rarity]}40` || "1px solid rgba(146,142,161,0.3)",
                      }}
                    >
                      {nft.rarity}
                    </div>

                    {/* Favorite */}
                    <button
                      className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
                    >
                      <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>

                    {/* Auction countdown */}
                    {nft.status === "auction" && nft.endTime && (
                      <div
                        className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg"
                        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
                      >
                        <span className="text-xs text-subtle" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>Ends in</span>
                        <span className="text-xs font-bold text-secondary-dim" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{nft.endTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-bold text-on-surface mb-0.5"
                          style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)" }}>
                          {nft.name}
                        </p>
                        <p className="text-xs text-subtle">{nft.creator}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-subtle mb-0.5" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                          {nft.status === "auction" ? "Current Bid" : nft.status === "reserve" ? "Reserve" : "Price"}
                        </p>
                        <p className="text-sm font-bold text-on-surface" style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>{nft.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-subtle mb-3"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      <span>{nft.usdPrice}</span>
                      <span>Royalty: {nft.royalty}</span>
                    </div>

                    <button
                      className="w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-white"
                      style={{
                        fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                        background: nft.status === "fixed"
                          ? "linear-gradient(135deg, #7b61ff, #00d5ff)"
                          : "rgba(123,97,255,0.2)",
                        border: nft.status !== "fixed" ? "1px solid rgba(123,97,255,0.4)" : "none",
                        boxShadow: nft.status === "fixed" ? "0 0 16px rgba(123,97,255,0.3)" : "none",
                        color: nft.status !== "fixed" ? "#c9bfff" : "#fff",
                      }}
                    >
                      {nft.status === "auction" ? "Place Bid" : nft.status === "reserve" ? "View Details" : "Buy Now"}
                    </button>
                  </div>
                </div>
              ))}
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
