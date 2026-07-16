import React, { useState } from "react";
import { Card, Field, inputStyle } from "./ui.jsx";

export default function SettingsView({ data, persist, storageOk }) {
  const [wallet, setWallet] = useState(String(data.wallet));
  const [bank, setBank] = useState(String(data.bank));
  const [budget, setBudget] = useState(String(data.monthlyBudget));
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const next = {};
    [
      ["wallet", wallet],
      ["bank", bank],
      ["budget", budget],
    ].forEach(([key, val]) => {
      const n = Number(val);
      if (val !== "" && (Number.isNaN(n) || n < 0)) next[key] = "Sahi amount daalein (0 ya usse zyada)";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const save = async () => {
    if (!validate()) return;
    await persist({
      ...data,
      wallet: Number(wallet) || 0,
      bank: Number(bank) || 0,
      monthlyBudget: Number(budget) || 0,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  };

  return (
    <div className="px-4 sm:px-5 pt-5 pb-28 flex flex-col gap-4 max-w-xl mx-auto w-full">
      {!storageOk && (
        <Card className="p-3.5">
          <div className="text-[12px] font-body text-terracotta">
            ⚠ Is browser mein local storage available nahi hai (shayad private/incognito mode). Data save nahi ho payega jab tak aap normal browsing mode mein na ho.
          </div>
        </Card>
      )}
      <Card className="p-4 flex flex-col gap-4">
        <Field label="👛 Wallet Balance" error={errors.wallet}>
          <input
            type="number"
            min="0"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="rounded-xl px-3 py-2.5 text-[15px] font-body"
            style={inputStyle}
          />
        </Field>
        <Field label="🏦 Bank Balance" error={errors.bank}>
          <input
            type="number"
            min="0"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="rounded-xl px-3 py-2.5 text-[15px] font-body"
            style={inputStyle}
          />
        </Field>
        <Field label="🎯 Monthly Budget" error={errors.budget}>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="rounded-xl px-3 py-2.5 text-[15px] font-body"
            style={inputStyle}
          />
        </Field>
        <button
          type="button"
          onClick={save}
          className="rounded-xl py-3.5 mt-1 font-display font-bold text-[16px]"
          style={{ background: "#1F4B4A", color: "#FBF6EC" }}
        >
          {saved ? "✓ Saved!" : "💾 Save Settings"}
        </button>
      </Card>
      <div className="text-center text-[12px] font-body text-[#B0A88F]">
        Data is saved automatically on this device — no accounts, no GST, no invoices.
      </div>
    </div>
  );
}
