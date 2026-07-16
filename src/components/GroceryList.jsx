import React, { useMemo } from "react";

const ITEMS = [
  { id: 1, name: "🌾 आटा" },
  { id: 2, name: "🍚 चावल" },
  { id: 3, name: "🥣 दाल" },
  { id: 4, name: "🧂 नमक" },
  { id: 5, name: "🍬 चीनी" },
  { id: 6, name: "🫖 चाय" },
  { id: 7, name: "☕ कॉफी" },
  { id: 8, name: "🛢️ तेल" },
  { id: 9, name: "🌶️ मसाले" },
  { id: 10, name: "🧈 घी" },
  { id: 11, name: "🥛 दूध" },
  { id: 12, name: "🧀 पनीर" },
  { id: 13, name: "🥚 अंडे" },
  { id: 14, name: "🧅 प्याज" },
  { id: 15, name: "🥔 आलू" },
  { id: 16, name: "🍅 टमाटर" },
  { id: 17, name: "🧄 लहसुन" },
  { id: 18, name: "🫚 अदरक" },
  { id: 19, name: "🧼 साबुन" },
  { id: 20, name: "🧴 शैम्पू" },
  { id: 21, name: "🪥 टूथपेस्ट" },
  { id: 22, name: "🧻 टिश्यू" },
  { id: 23, name: "🧺 डिटर्जेंट" },
  { id: 24, name: "🧹 फिनाइल" },
  { id: 25, name: "💧 RO Candle" },
  { id: 26, name: "🔥 गैस सिलेंडर" },
];

export default function GroceryList({ data, persist }) {

  const grocery = useMemo(() => {
    return data.grocery || [];
  }, [data]);
    const toggleItem = (name) => {
    const exists = grocery.find((x) => x.name === name);

    let next;

    if (exists) {
      next = grocery.map((x) =>
        x.name === name
          ? { ...x, done: !x.done }
          : x
      );
    } else {
      next = [
        ...grocery,
        {
          name,
          qty: "",
          price: "",
          done: true,
        },
      ];
    }

    persist({
      ...data,
      grocery: next,
    });
  };

  const updateField = (name, field, value) => {
    const next = grocery.map((x) =>
      x.name === name
        ? { ...x, [field]: value }
        : x
    );

    persist({
      ...data,
      grocery: next,
    });
  };
const purchased = grocery.filter((item) => item.done).length;
const totalItems = ITEMS.length;
const progress = Math.round((purchased / totalItems) * 100);
  const total = grocery.reduce(
    (sum, item) =>
      sum + (Number(item.qty || 0) * Number(item.price || 0)),
    0
  );
    return (
    <div className="p-4 space-y-4">

      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-bold mb-3">
          🥔 Grocery List
        </h2>

        <div className="space-y-3">

          {ITEMS.map((item) => {

            const row =
              grocery.find((g) => g.name === item.name) || {
                qty: "",
                price: "",
                done: false,
              };

            return (

              <div
                key={item.id}
                className="flex items-center gap-2 border rounded-xl p-2"
              >

                <input
                  type="checkbox"
                  checked={row.done}
                  onChange={() => toggleItem(item.name)}
                />

                <div className="flex-1 text-sm">
                  {item.name}
                </div>

                <input
                  className="w-16 border rounded p-1 text-center"
                  placeholder="Qty"
                  value={row.qty}
                  onChange={(e) =>
                    updateField(item.name, "qty", e.target.value)
                  }
                />

                <input
                  className="w-20 border rounded p-1 text-center"
                  placeholder="₹"
                  value={row.price}
                  onChange={(e) =>
                    updateField(item.name, "price", e.target.value)
                  }
                />

              </div>

            );

          })}

        </div> 
              </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <div className="text-lg font-bold">
          💰 Total Grocery Cost
        </div>

        <div className="mt-2 text-3xl font-bold text-green-700">
          ₹{total}
        </div>

        <div className="mt-2 text-sm text-gray-500">
          Qty × Price का Total अपने आप निकल जाएगा।
        </div>
      </div>

    </div>
  );
}
