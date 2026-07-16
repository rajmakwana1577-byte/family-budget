import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Wallet, Landmark, Target, PlusCircle, List, PieChart as PieIcon, Settings as SettingsIcon } from "lucide-react";
import { Card, StatCard, BigButton } from "./ui.jsx";
import { CATEGORIES, SLICE_COLORS } from "../constants.js";
import { fmtINR, todayStr, monthStr } from "../utils.js";

export default function Dashboard({ data, goto }) {
  const today = todayStr();
  const thisMonth = monthStr(today);

  const todayTotal = useMemo(
    () => data.expenses.filter((e) => e.date === today).reduce((s, e) => s + Number(e.amount), 0),
    [data.expenses, today]
  );
  const monthExpenses = useMemo(
    () => data.expenses.filter((e) => monthStr(e.date) === thisMonth),
    [data.expenses, thisMonth]
  );
  const monthTotal = monthExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const remaining = Number(data.monthlyBudget || 0) - monthTotal;
  const pct = data.monthlyBudget > 0 ? Math.min(100, (monthTotal / data.monthlyBudget) * 100) : 0;

  const byCategory = useMemo(() => {
    const map = {};
    monthExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [monthExpenses]);

  const topCategory = byCategory[0];

  return (
    <div className="px-4 sm:px-5 pt-5 pb-28 flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<Wallet size={15} />} label="Wallet Balance" value={fmtINR(data.wallet)} tone="ink" />
        <StatCard icon={<Landmark size={15} />} label="Bank Balance" value={fmtINR(data.bank)} tone="ink" />
        <StatCard icon={<span>💸</span>} label="Today's Expense" value={fmtINR(todayTotal)} tone="terracotta" />
        <StatCard icon={<span>📅</span>} label="This Month" value={fmtINR(monthTotal)} tone="terracotta" />
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 font-body text-[13px] text-[#7A7160]">
            <Target size={15} />
            <span>Monthly Budget</span>
          </div>
          <span className="font-display font-bold text-ink">{fmtINR(data.monthlyBudget)}</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#EFE7D3" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: remaining < 0 ? "#C0453D" : "#3F6B54" }}
          />
        </div>
        <div className="mt-2 text-[13px] font-body" style={{ color: remaining < 0 ? "#C0453D" : "#3F6B54" }}>
          {remaining < 0
            ? `Budget se ${fmtINR(Math.abs(remaining))} zyada ho gaya`
            : `${fmtINR(remaining)} bacha hai is mahine`}
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-[13px] mb-2 font-body text-[#7A7160]">Category-wise kharcha (is mahine)</div>
        {byCategory.length === 0 ? (
          <div className="text-[13px] py-6 text-center font-body text-[#B0A88F]">
            Abhi tak koi kharcha nahi jode gaye
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div style={{ width: 130, height: 130, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={32} outerRadius={55} paddingAngle={2}>
                    {byCategory.map((_, i) => (
                      <Cell key={i} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => fmtINR(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 w-full flex flex-col gap-1.5 max-h-[150px] overflow-y-auto pr-1 thin-scroll">
              {byCategory.slice(0, 8).map((c, i) => {
                const cat = CATEGORIES.find((x) => x.label === c.name);
                return (
                  <div key={c.name} className="flex items-center justify-between text-[12px] font-body">
                    <span className="flex items-center gap-1.5 text-[#4A4436]">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }} />
                      {cat?.emoji} {c.name}
                    </span>
                    <span className="font-semibold text-ink">{fmtINR(c.value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {topCategory && (
          <div className="mt-3 pt-3 text-[12px] font-body text-[#7A7160]" style={{ borderTop: "1px dashed #E4DCC7" }}>
            Sabse zyada kharcha: <b className="text-ink">{topCategory.name}</b> mein
          </div>
        )}
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
        <BigButton icon={<PlusCircle size={22} />} label="Add Expense" accent onClick={() => goto("add")} />
        <BigButton icon={<List size={22} />} label="Expense History" onClick={() => goto("history")} />
        <BigButton icon={<PieIcon size={22} />} label="Budget Report" onClick={() => goto("report")} />
        <BigButton icon={<SettingsIcon size={22} />} label="Settings" onClick={() => goto("settings")} />
      </div>
    </div>
  );
}
