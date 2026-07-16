import React from "react";
import { ChevronLeft } from "lucide-react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white border border-line shadow-sm ${className}`}
      style={{ boxShadow: "0 2px 10px rgba(31,75,74,0.06)" }}
    >
      {children}
    </div>
  );
}

export function StatCard({ icon, label, value, tone = "ink" }) {
  const toneColor = {
    ink: "#1F4B4A",
    marigold: "#B8791F",
    terracotta: "#C0453D",
    sage: "#3F6B54",
  }[tone];
  return (
    <Card className="p-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[13px] text-[#7A7160] font-body">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-[20px] sm:text-[22px] leading-tight font-display font-bold" style={{ color: toneColor }}>
        {value}
      </div>
    </Card>
  );
}

export function BigButton({ icon, label, onClick, accent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl p-4 flex flex-col items-center justify-center gap-2 active:scale-[0.97] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      style={{
        background: accent ? "#1F4B4A" : "#FFFFFF",
        border: `1px solid ${accent ? "#1F4B4A" : "#E4DCC7"}`,
        boxShadow: "0 2px 10px rgba(31,75,74,0.06)",
      }}
    >
      <div style={{ color: accent ? "#F6E7C9" : "#1F4B4A" }}>{icon}</div>
      <div
        className="text-[13px] text-center font-display font-semibold"
        style={{ color: accent ? "#FBF6EC" : "#1F4B4A" }}
      >
        {label}
      </div>
    </button>
  );
}

export function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-body text-[#7A7160]">{label}</span>
      {children}
      {error && <span className="text-[12px] font-body text-terracotta">{error}</span>}
    </label>
  );
}

export const inputStyle = {
  background: "#FBF6EC",
  border: "1px solid #E4DCC7",
};

export function Header({ title, onBack }) {
  return (
    <div className="sticky top-0 z-10 px-4 sm:px-5 pt-6 pb-4 flex items-center gap-3" style={{ background: "#1F4B4A" }}>
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="text-[#F6E7C9] focus:outline-none focus-visible:ring-2 focus-visible:ring-marigold rounded-full"
        >
          <ChevronLeft size={22} />
        </button>
      )}
      <div>
        <div className="text-[11px] tracking-wide uppercase font-body" style={{ color: "#9FC2BC" }}>
          Krishna Family Ledger
        </div>
        <div className="text-[19px] sm:text-[20px] font-display font-bold" style={{ color: "#FBF6EC" }}>
          {title}
        </div>
      </div>
    </div>
  );
}
