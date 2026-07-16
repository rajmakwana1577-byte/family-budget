import React, { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Card } from "./ui.jsx";
import { CATEGORIES } from "../constants.js";
import { fmtINR } from "../utils.js";

export default function History({ data, persist }) {
  const [confirmId, setConfirmId] = useState(null);

  const sorted = useMemo(
    () => [...data.expenses].sort((a, b) => (b.date.localeCompare(a.date) || b.id.localeCompare(a.id))),
    [data.expenses]
  );

  const remove = async (id) => {
    await persist({ ...data, expenses: data.expenses.filter((e) => e.id !== id) });
    setConfirmId(null);
  };

  return (
    <div className="px-4 sm:px-5 pt-5 pb-28 flex flex-col gap-3 max-w-2xl mx-auto w-full">
      {sorted.length === 0 && (
        <Card className="p-6 text-center">
          <div className="text-[14px] font-body text-[#B0A88F]">Koi expense record nahi hai abhi</div>
        </Card>
      )}
      {sorted.map((e) => {
        const cat = CATEGORIES.find((c) => c.label === e.category);
        return (
          <Card key={e.id} className="p-3.5 flex items-center gap-3">
            <div className="text-[22px]" aria-hidden>
              {cat?.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-display font-semibold text-ink truncate">{e.category}</span>
                <span className="font-display font-bold text-terracotta whitespace-nowrap">{fmtINR(e.amount)}</span>
              </div>
              <div className="text-[12px] font-body text-[#7A7160] truncate">
                {e.description ? `${e.description} · ` : ""}
                {e.date} · {e.paymentMode} · {e.paidBy}
              </div>
            </div>
            {confirmId === e.id ? (
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => remove(e.id)}
                  className="text-[11px] font-body font-semibold rounded-lg px-2 py-1"
                  style={{ background: "#C0453D", color: "#fff" }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmId(null)}
                  className="text-[11px] font-body rounded-lg px-2 py-1"
                  style={{ background: "#EFE7D3", color: "#4A4436" }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                aria-label="Delete entry"
                onClick={() => setConfirmId(e.id)}
                className="text-terracotta p-1 shrink-0"
              >
                <Trash2 size={17} />
              </button>
            )}
          </Card>
        );
      })}
    </div>
  );
}
