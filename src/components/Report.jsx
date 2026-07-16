import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "./ui.jsx";
import { CATEGORIES, SLICE_COLORS } from "../constants.js";
import { fmtINR, todayStr, monthStr } from "../utils.js";

export default function Report({ data }) {
  const thisMonth = monthStr(todayStr());
  const monthExpenses = useMemo(
    () => data.expenses.filter((e) => monthStr(e.date) === thisMonth),
    [data.expenses, thisMonth]
  );
  const monthTotal = monthExpenses.reduce((s, e) => s + Number(e.amount), 0);
  const byCategory = useMemo(() => {
    const map = {};
    monthExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + Number(e.amount);
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [monthExpenses]);
  const remaining = Number(data.monthlyBudget || 0) - monthTotal;
  const pct = data.monthlyBudget > 0 ? Math.min(100, (monthTotal / data.monthlyBudget) * 100) : 0;

  return (
    <div className="px-4 sm:px-5 pt-5 pb-28 flex flex-col gap-4 max-w-2xl mx-auto w-full">
      <Card className="p-4">
        <div className="text-[13px] mb-1 font-body text-[#7A7160]">Is mahine ka total kharcha</div>
        <div className="text-[24px] sm:text-[26px] font-display font-extrabold text-ink">{fmtINR(monthTotal)}</div>
        <div className="h-3 rounded-full overflow-hidden mt-3" style={{ background: "#EFE7D3" }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, background: remaining < 0 ? "#C0453D" : "#3F6B54" }}
          />
        </div>
        <div className="mt-2 text-[13px] font-body" style={{ color: remaining < 0 ? "#C0453D" : "#3F6B54" }}>
          Budget: {fmtINR(data.monthlyBudget)} ·{" "}
          {remaining < 0 ? `${fmtINR(Math.abs(remaining))} zyada` : `${fmtINR(remaining)} bacha`}
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-[13px] mb-3 font-body text-[#7A7160]">Category breakdown</div>
        {byCategory.length === 0 ? (
          <div className="text-[13px] py-6 text-center font-body text-[#B0A88F]">Data nahi hai abhi</div>
        ) : (
          <>
            <div style={{ width: "100%", height: 190 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={byCategory} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {byCategory.map((_, i) => (
                      <Cell key={i} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => fmtINR(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {byCategory.map((c, i) => {
                const cat = CATEGORIES.find((x) => x.label === c.name);
                const share = monthTotal > 0 ? Math.round((c.value / monthTotal) * 100) : 0;
                return (
                  <div key={c.name} className="flex items-center justify-between text-[13px] font-body">
                    <span className="flex items-center gap-2 text-[#4A4436]">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }} />
                      {cat?.emoji} {c.name}
                    </span>
                    <span className="text-[#7A7160]">
                      {share}% · <b className="text-ink">{fmtINR(c.value)}</b>
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
