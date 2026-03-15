"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/staking", label: "Staking" },
  { href: "/dao", label: "DAO" },
  { href: "/analytics", label: "Analytics" },
  { href: "/security", label: "Security" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
      style={{
        background: "rgba(14, 13, 22, 0.75)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 1px 0 0 rgba(123,97,255,0.15)",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative w-7 h-7">
          <div className="absolute inset-0 rounded-md bg-gradient-to-br from-primary to-secondary opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-[3px] rounded-sm bg-surface-dim" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-dim font-mono">CX</span>
          </div>
        </div>
        <span
          className="text-sm font-bold tracking-widest uppercase"
          style={{ fontFamily: "var(--font-sora-var, Sora, sans-serif)", letterSpacing: "0.12em" }}
        >
          <span className="text-primary-dim">Creator</span>
          <span className="text-on-surface">Verse</span>
          <span className="text-secondary"> X</span>
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-4 py-1.5 text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "var(--font-sora-var, Sora, sans-serif)",
                color: active ? "#c9bfff" : "#928ea1",
                letterSpacing: "0.02em",
              }}
            >
              {active && (
                <span
                  className="absolute inset-0 rounded-md"
                  style={{ background: "rgba(123,97,255,0.12)", border: "1px solid rgba(123,97,255,0.25)" }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
              {active && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #7b61ff, transparent)" }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200"
          style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
          aria-label="Notifications"
        >
          <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span
            className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
            style={{ background: "#7b61ff", boxShadow: "0 0 6px #7b61ff" }}
          />
        </button>

        {/* Blog */}
        <Link
          href="/blog"
          className="hidden lg:flex w-8 h-8 items-center justify-center rounded-md transition-all duration-200"
          style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
          aria-label="Blog"
        >
          <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
          </svg>
        </Link>

        {/* Wallet */}
        <Link href="/wallet">
          <button
            className="flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #7b61ff 0%, #00d5ff 100%)",
              color: "#fff",
              fontFamily: "var(--font-sora-var, Sora, sans-serif)",
              letterSpacing: "0.02em",
              boxShadow: "0 0 20px rgba(123,97,255,0.3)",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
            Connect Wallet
          </button>
        </Link>
      </div>
    </nav>
  );
}
