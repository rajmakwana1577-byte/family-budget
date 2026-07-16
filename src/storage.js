const STORAGE_KEY = "krishna-family-budget:v1";

export const emptyData = () => ({
  wallet: 0,
  bank: 0,
  monthlyBudget: 0,
  expenses: [],
});

function isValidShape(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.wallet === "number" &&
    typeof obj.bank === "number" &&
    typeof obj.monthlyBudget === "number" &&
    Array.isArray(obj.expenses)
  );
}

export function loadData() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw);
    return isValidShape(parsed) ? parsed : emptyData();
  } catch (err) {
    console.error("Failed to load saved budget data:", err);
    return emptyData();
  }
}

export function saveData(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    // Most common cause: private/incognito mode with storage disabled, or quota exceeded
    console.error("Failed to save budget data:", err);
    return false;
  }
}

export function isStorageAvailable() {
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
