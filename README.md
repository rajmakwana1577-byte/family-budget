# Krishna Family Ledger 🏡

A simple, mobile-friendly **home budget & daily expense tracker** for the family.
No GST, no invoices, no vendors, no accounting — just wallet/bank balance, daily
expenses, a monthly budget, and a pie-chart breakdown.

Built with React + Vite + Tailwind CSS + Recharts. All data is saved **locally in
your browser** (`localStorage`) — nothing leaves your device, no login required.

---

## ✨ Features

- 🏠 **Home Dashboard** — wallet balance, bank balance, today's expense, this
  month's expense, budget progress bar, category pie chart
- ➕ **Add Expense** — date, category (16 emoji categories), description, amount,
  payment mode, paid by
- 📒 **Expense History** — full list with delete (with confirm step)
- 📊 **Budget Report** — pie chart + % breakdown by category
- ⚙ **Settings** — edit wallet/bank balance and monthly budget
- 📱 Fully responsive — works great on Android, iPhone, and desktop
- 💾 Data persists automatically after closing the browser (localStorage)
- ✅ Input validation (amount, date) and graceful error handling if storage is
  unavailable (e.g. private/incognito mode)

---

## 🚀 Run locally

Requirements: [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in your browser.

To create a production build locally:

```bash
npm run build
npm run preview
```

---

## ☁️ Deploy in under 2 minutes

### Option A — Vercel (recommended)

1. Push this project to a GitHub repository (see below).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects the Vite settings from `vercel.json` — just click **Deploy**.
4. Done. You'll get a live URL like `https://your-project.vercel.app`.

No environment variables or manual configuration needed.

### Option B — Netlify

1. Push this project to GitHub.
2. Go to [app.netlify.com/start](https://app.netlify.com/start) and pick the repo.
3. Netlify reads `netlify.toml` automatically — build command and publish folder
   are already set. Click **Deploy site**.
4. Done. You'll get a live URL like `https://your-project.netlify.app`.

### Option C — Drag & drop (no GitHub needed)

1. Run `npm install && npm run build` locally.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the generated `dist` folder into the browser window.
4. Your site is live instantly.

---

## 📁 Project structure

```
family-budget/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── netlify.toml
├── .gitignore
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── ErrorBoundary.jsx
    ├── storage.js          # localStorage persistence layer
    ├── constants.js        # categories, payment modes, chart colors
    ├── utils.js            # date/currency formatting helpers
    ├── index.css
    └── components/
        ├── ui.jsx           # shared Card / Field / Header / Buttons
        ├── Dashboard.jsx
        ├── AddExpense.jsx
        ├── History.jsx
        ├── Report.jsx
        ├── SettingsView.jsx
        └── BottomNav.jsx
```

---

## 🗄️ Pushing to GitHub

```bash
git init
git add .
git commit -m "Krishna Family Ledger — initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then connect that repo to Vercel or Netlify as described above.

---

## 🔒 Data & privacy

All expense data is stored only in your browser's `localStorage` on your own
device. There is no server, no database, and no account system — clearing your
browser data or using a different browser/device will start a fresh ledger.
