import React from "react";
import { Home, PlusCircle, List, PieChart as PieIcon, Settings as SettingsIcon } from "lucide-react";

const NAV = [
  { key: "home", label: "Home", icon: Home },
  { key: "add", label: "Add", icon: PlusCircle },
  { key: "history", label: "History", icon: List },
  { key: "report", label: "Report", icon: PieIcon },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

export default function BottomNav({ tab, setTab }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around py-2.5"
      style={{ background: "#FFFFFF", borderTop: "1px solid #E4DCC7", paddingBottom: "max(0.4rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-around w-full max-w-2xl mx-auto">
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-current={tab === key ? "page" : undefined}
            className="flex flex-col items-center gap-0.5 px-3 py-1 focus:outline-none"
          >
            <Icon size={20} color={tab === key ? "#1F4B4A" : "#B0A88F"} />
            <span
              className="text-[10px] font-body"
              style={{ fontWeight: tab === key ? 700 : 500, color: tab === key ? "#1F4B4A" : "#B0A88F" }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
