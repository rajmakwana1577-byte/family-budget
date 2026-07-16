import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./components/ui.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddExpense from "./components/AddExpense.jsx";
import History from "./components/History.jsx";
import Report from "./components/Report.jsx";
import SettingsView from "./components/SettingsView.jsx";
import GroceryList from "./components/GroceryList.jsx";
import Receipt from "./components/Receipt.jsx";
import BottomNav from "./components/BottomNav.jsx";
import { loadData, saveData, isStorageAvailable, emptyData } from "./storage.js";

const TITLES = {
  home: "Home Dashboard",
  add: "Add Expense",
  history: "Expense History",
  report: "Budget Report",
  settings: "Settings",
  grocery: "Grocery List",
};

export default function App() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("home");
  const [showReceipt, setShowReceipt] = useState(false);
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => {
    setStorageOk(isStorageAvailable());
    setData(loadData());
  }, []);
useEffect(() => {
  const openReceipt = () => setShowReceipt(true);

  window.addEventListener("openReceipt", openReceipt);

  return () => {
    window.removeEventListener("openReceipt", openReceipt);
  };
}, []);
  const persist = useCallback((next) => {
    setData(next);
    const ok = saveData(next);
    setStorageOk(ok);
    return ok;
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center font-body text-[#B0A88F]" style={{ background: "#F1EADA" }}>
        Loading your ledger...
      </div>
    );
  }

  
    if (showReceipt) {
  return (
    <Receipt
      data={data}
      onBack={() => setShowReceipt(false)}
    />
  );
}

return (
    <div className="min-h-screen w-full flex justify-center" style={{ background: "#F1EADA" }}>
      <div className="w-full max-w-2xl min-h-screen relative" style={{ background: "#FBF6EC" }}>
        <Header title={TITLES[tab]} onBack={tab !== "home" ? () => setTab("home") : null} />

        {tab === "home" && <Dashboard data={data} goto={setTab} />}
        {tab === "add" && <AddExpense data={data} persist={persist} goto={setTab} />}
        {tab === "history" && <History data={data} persist={persist} />}
        {tab === "report" && <Report data={data} />}
        {tab === "settings" && <SettingsView data={data} persist={persist} storageOk={storageOk} />}
{tab === "grocery" && <GroceryList data={data} persist={persist} />}
        <BottomNav tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}

export { emptyData };
