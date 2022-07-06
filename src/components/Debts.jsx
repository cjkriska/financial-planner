import { useEffect, useState } from "react";

function Debts({ handleOpen, debts, fetchData }) {

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {debts.map((debt, index) => {
        return (
          <div className="bg-green-300 m-2" key={index}>
            <div className="bg-green-400 px-1">{debt.debtName}</div>
            <div className="flex justify-between p-3">
              <div className="text-2xl">${debt.amount.toLocaleString()}</div>
              <div className="bg-green-100 p-2 text-xs">
                <b> APR :</b> {debt.apr}%<br />
                <b> Min :</b>{" "}
                {debt.minPayment.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          </div>
        );
      })}

      <button
        className="bg-slate-200 rounded-full shadow-lg text-lg block m-auto my-2 px-6 hover:shadow-inner"
        onClick={handleOpen}
      >
        +Add Debt
      </button>
    </>
  );
}

export default Debts;
