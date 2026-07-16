export const todayStr = () => new Date().toLocaleDateString("sv-SE");

export const monthStr = (dateStr) => (dateStr || "").slice(0, 7);

export const fmtINR = (n) =>
  "₹" + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const isValidDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(new Date(d).getTime());
