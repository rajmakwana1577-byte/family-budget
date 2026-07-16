import React, { useState } from "react";
import { Check } from "lucide-react";
import { Card, Field, inputStyle } from "./ui.jsx";
import { CATEGORIES, PAYMENT_MODES, FAMILY } from "../constants.js";
import { todayStr, isValidDate } from "../utils.js";

export default function AddExpense({ persist, data, goto }) {
  const [date, setDate] = useState(todayStr());
  const [category, setCategory] = useState(CATEGORIES[0].label);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [paidBy, setPaidBy] = useState(FAMILY[0]);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const next = {};
    if (!isValidDate(date)) next.date = "Sahi date chunein";
    const numAmount = Number(amount);
    if (!amount || Number.isNaN(numAmount) || numAmount <= 0) {
      next.amount = "Amount 0 se zyada hona chahiye";
    } else if (numAmount > 10000000) {
      next.amount = "Amount bahut zyada lag raha hai";
    }
    if (description.length > 120) next.description = "Description thoda chota rakhein (120 characters tak)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const save = async () => {
    if (!validate() || saving) return;
    setSaving(true);
    const entry = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      date,
      category,
      description: description.trim().slice(0, 120),
      amount: Math.round(Number(amount) * 100) / 100,
      paymentMode,
      paidBy,
    };
    const ok = await persist({ ...data, expenses: [...data.expenses, entry] });
    setSaving(false);
    if (ok === false) {
      setErrors({ save: "Save nahi ho paya. Storage full ya disabled ho sakta hai." });
      return;
    }
    setSaved(true);
    setTimeout(() => {
      setAmount("");
      setDescription("");
      setSaved(false);
      goto("home");
    }, 550);
  };

  return (
    <div className="px-4 sm:px-5 pt-5 pb-28 flex flex-col gap-4 max-w-xl mx-auto w-full">
      <Card className="p-4 flex flex-col gap-4">
        <Field label="📅 Date" error={errors.date}>
          <input
            type="date"
            value={date}
            max={todayStr()}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl px-3 py-2.5 text-[15px] font-body"
            style={inputStyle}
          />
        </Field>
        <Field label="🛒 Category">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl px-3 py-2.5 text-[15px] font-body"
            style={inputStyle}
          >
            {CATEGORIES.map((c) => (
              <option key={c.label} value={c.label}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="✍ Description (optional)" error={errors.description}>
          <input
            type="text"
            value={description}
            maxLength={120}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="jaise: Swiggy order, petrol pump..."
            className="rounded-xl px-3 py-2.5 text-[15px] font-body"
            style={inputStyle}
          />
        </Field>
        <Field label="💰 Amount" error={errors.amount}>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="rounded-xl px-3 py-2.5 text-[15px] font-body"
            style={inputStyle}
          />
        </Field>
        <Field label="💳 Payment Mode">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PAYMENT_MODES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPaymentMode(m)}
                className="rounded-xl py-2 text-[12px] font-body font-semibold"
                style={{
                  background: paymentMode === m ? "#1F4B4A" : "#FBF6EC",
                  color: paymentMode === m ? "#FBF6EC" : "#4A4436",
                  border: "1px solid #E4DCC7",
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </Field>
        <Field label="👤 Paid By">
          <div className="grid grid-cols-2 gap-2">
            {FAMILY.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPaidBy(p)}
                className="rounded-xl py-2 text-[13px] font-body font-semibold"
                style={{
                  background: paidBy === p ? "#E8A33D" : "#FBF6EC",
                  color: paidBy === p ? "#3A2A0F" : "#4A4436",
                  border: "1px solid #E4DCC7",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </Field>

        {errors.save && <div className="text-[12px] font-body text-terracotta">{errors.save}</div>}

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl py-3.5 mt-2 flex items-center justify-center gap-2 font-display font-bold text-[16px]"
          style={{ background: saving ? "#D9CFB8" : "#1F4B4A", color: "#FBF6EC" }}
        >
          {saved ? (
            <>
              <Check size={18} /> Saved!
            </>
          ) : saving ? (
            "Saving..."
          ) : (
            "💾 Save"
          )}
        </button>
      </Card>
    </div>
  );
}
