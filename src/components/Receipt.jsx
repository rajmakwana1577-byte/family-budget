import React from "react";

export default function Receipt({ data, onBack }) {
  const grocery = (data?.grocery || []).filter((x) => x.done);

  const total = grocery.reduce(
    (sum, item) =>
      sum +
      Number(item.qty || 0) * Number(item.price || 0),
    0
  );

  const receiptNo = "RCP-" + Date.now().toString().slice(-6);

  const today = new Date().toLocaleString("en-IN");

  return (
    <div className="p-4 bg-gray-100 min-h-screen">

      <div className="bg-white rounded-2xl shadow-lg p-5">

        <div className="text-center border-b pb-3">
          <h1 className="text-2xl font-bold">
            🧾 Grocery Receipt
          </h1>

          <p className="text-gray-500 text-sm">
            Krishna Family Ledger
          </p>

          <p className="text-xs mt-2">
            Receipt No : {receiptNo}
          </p>

          <p className="text-xs">
            {today}
          </p>
        </div>

        <div className="mt-5">
          <div className="grid grid-cols-4 font-bold border-b pb-2">
            <div>Item</div>
            <div className="text-center">Qty</div>
            <div className="text-center">Price</div>
            <div className="text-right">Amount</div>
          </div> 
                    {grocery.map((item, index) => {
            const amount =
              Number(item.qty || 0) *
              Number(item.price || 0);

            return (
              <div
                key={index}
                className="grid grid-cols-4 py-2 border-b text-sm"
              >
                <div>{item.name}</div>

                <div className="text-center">
                  {item.qty}
                </div>

                <div className="text-center">
                  ₹{item.price}
                </div>

                <div className="text-right font-medium">
                  ₹{amount}
                </div>
              </div>
            );
          })} 
                  <div className="border-t mt-5 pt-4">

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="mt-6 flex gap-3">

            <button
              onClick={onBack}
              className="flex-1 bg-gray-200 rounded-xl py-3 font-medium"
            >
              ⬅ Back
            </button>

                        <button
              className="flex-1 bg-green-600 text-white rounded-xl py-3 font-medium"
            >
              📄 Download PDF
            </button>

          </div>

        </div>

      </div>

    </div>
  );
      }
