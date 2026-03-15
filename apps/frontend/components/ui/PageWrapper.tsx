import { ReactNode } from "react";
import Navbar from "./Navbar";

interface PageWrapperProps {
  children: ReactNode;
  showNav?: boolean;
  className?: string;
  auroraVariant?: "purple" | "cyan" | "mixed";
}

export default function PageWrapper({
  children,
  showNav = true,
  className = "",
  auroraVariant = "mixed",
}: PageWrapperProps) {
  const auroras =
    auroraVariant === "purple"
      ? [
          { color: "rgba(123,97,255,0.18)", size: "700px", top: "-10%", left: "10%", delay: "0s" },
          { color: "rgba(123,97,255,0.10)", size: "500px", top: "60%", left: "60%", delay: "3s" },
        ]
      : auroraVariant === "cyan"
      ? [
          { color: "rgba(0,213,255,0.15)", size: "700px", top: "-10%", right: "10%", delay: "0s" },
          { color: "rgba(0,213,255,0.08)", size: "500px", top: "70%", left: "20%", delay: "4s" },
        ]
      : [
          { color: "rgba(123,97,255,0.16)", size: "650px", top: "-8%", left: "-5%", delay: "0s" },
          { color: "rgba(0,213,255,0.12)", size: "550px", top: "40%", right: "-8%", delay: "4s" },
          { color: "rgba(255,95,141,0.08)", size: "400px", top: "75%", left: "35%", delay: "8s" },
        ];

  return (
    <div className={`relative min-h-screen bg-surface overflow-hidden ${className}`}>
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123,97,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123,97,255,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Aurora blobs */}
      {auroras.map((a, i) => (
        <div
          key={i}
          className="pointer-events-none fixed z-0 rounded-full"
          style={{
            width: a.size,
            height: a.size,
            background: `radial-gradient(circle, ${a.color} 0%, transparent 70%)`,
            top: a.top,
            left: (a as { left?: string }).left,
            right: (a as { right?: string }).right,
            filter: "blur(60px)",
            animation: `aurora 10s ease-in-out infinite`,
            animationDelay: a.delay,
          }}
        />
      ))}

      {showNav && <Navbar />}

      <main className={`relative z-10 ${showNav ? "pt-16" : ""}`}>
        {children}
      </main>
    </div>
  );
}
