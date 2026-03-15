"use client";
import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import { blogPosts, creators } from "@/lib/data";

const creatorImageMap = Object.fromEntries(creators.map((c) => [c.name, c.imageUrl]));

const categories = ["All", "DAO", "NFT", "DeFi", "Security", "Protocol"];

const categoryColor: Record<string, { bg: string; color: string }> = {
  DAO: { bg: "rgba(123,97,255,0.15)", color: "#c9bfff" },
  NFT: { bg: "rgba(0,213,255,0.12)", color: "#00d5ff" },
  DeFi: { bg: "rgba(74,222,128,0.12)", color: "#4ade80" },
  Security: { bg: "rgba(248,113,113,0.12)", color: "#f87171" },
  Protocol: { bg: "rgba(255,183,125,0.12)", color: "#ffb77d" },
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = blogPosts.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const featured = blogPosts.find((p) => p.featured);

  return (
    <PageWrapper auroraVariant="mixed">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium text-subtle tracking-widest uppercase mb-3"
            style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
            // decentralized blog
          </p>
          <h1 className="text-5xl font-bold text-on-surface mb-2"
            style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.03em" }}>
            The{" "}
            <span style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Verse
            </span>{" "}
            Blog
          </h1>
          <p className="text-muted max-w-lg">Insights, tutorials, and deep-dives from the CreatorVerse ecosystem's top voices.</p>
        </div>

        {/* Featured post */}
        {featured && (
          <div
            className="group relative p-8 rounded-2xl mb-12 cursor-pointer overflow-hidden transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(123,97,255,0.3)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(123,97,255,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(123,97,255,0.12), transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    background: "linear-gradient(135deg, #7b61ff, #00d5ff)",
                    color: "#fff",
                    letterSpacing: "0.06em",
                  }}
                >
                  FEATURED
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{
                    fontFamily: "var(--font-space-mono-var, monospace)",
                    ...(categoryColor[featured.category] || { bg: "rgba(255,255,255,0.1)", color: "#e5e0ee" }),
                  }}
                >
                  {featured.category}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-on-surface mb-3 max-w-2xl"
                style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "-0.02em" }}>
                {featured.title}
              </h2>
              <p className="text-muted leading-relaxed max-w-2xl mb-5">{featured.excerpt}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-subtle"
                style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0">
                    {creatorImageMap[featured.author] ? (
                      <img src={creatorImageMap[featured.author]} alt={featured.author} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)" }}>
                        {featured.author.substring(0, 1)}
                      </div>
                    )}
                  </div>
                  <span className="text-muted">{featured.author}</span>
                </div>
                <span>{featured.date}</span>
                <span>{featured.readTime} read</span>
              </div>
            </div>
          </div>
        )}

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
              style={{
                fontFamily: "var(--font-space-mono-var, monospace)",
                background: activeCategory === cat ? "rgba(123,97,255,0.2)" : "rgba(255,255,255,0.04)",
                border: activeCategory === cat ? "1px solid rgba(123,97,255,0.4)" : "1px solid rgba(255,255,255,0.07)",
                color: activeCategory === cat ? "#c9bfff" : "#928ea1",
                letterSpacing: "0.06em",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => {
            const cc = categoryColor[post.category] || { bg: "rgba(255,255,255,0.1)", color: "#e5e0ee" };
            return (
              <article
                key={post.id}
                className="group p-6 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(123,97,255,0.25)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Thumbnail */}
                <div className="h-36 rounded-xl overflow-hidden mb-4 -mx-6 -mt-6">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category badge */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{
                      fontFamily: "var(--font-space-mono-var, monospace)",
                      background: cc.bg,
                      color: cc.color,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-on-surface mb-2 flex-1"
                  style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", lineHeight: "1.4" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider"
                      style={{
                        fontFamily: "var(--font-space-mono-var, monospace)",
                        background: "rgba(255,255,255,0.05)",
                        color: "#928ea1",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author + meta */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md overflow-hidden flex-shrink-0">
                      {creatorImageMap[post.author] ? (
                        <img src={creatorImageMap[post.author]} alt={post.author} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #7b61ff, #00d5ff)" }}>
                          {post.author.substring(0, 1)}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted"
                      style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                      {post.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-subtle"
                    style={{ fontFamily: "var(--font-space-mono-var, monospace)" }}>
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
