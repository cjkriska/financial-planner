import { useState } from "react";

function AddDebt({ handleClose }) {
  const [debtName, setDebtName] = useState("");
  const [amount, setAmount] = useState("");
  const [apr, setApr] = useState("");
  const [minPayment, setMinPayment] = useState("");

  async function addDebt(event) {
    event.preventDefault();
    await fetch("http://localhost:8080/addDebt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        debtName: debtName,
        userId: 4,
        amount: amount,
        apr: apr,
        minPayment: minPayment,
      }),
    });
  }

  return (
    <div>
      <form
        className=""
        onSubmit={(e) => {
          addDebt(e);
          handleClose();
        }}
      >
        {/* Debt Name */}
        <div>
          <label htmlFor="debtName">Debt Name</label>
          <input
            type="text"
            id="debtName"
            value={debtName}
            onChange={(e) => setDebtName(e.target.value)}
            required
            className=""
          />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className=""
          />
        </div>

        {/* APR */}
        <div>
          <label htmlFor="apr">APR</label>
          <input
            type="text"
            id="apr"
            value={apr}
            onChange={(e) => setApr(e.target.value)}
            required
            className=""
          />
        </div>

        {/* Minimum Payment */}
        <div>
          <label htmlFor="minPayment">Minimum Payment</label>
          <input
            type="text"
            id="minPayment"
            value={minPayment}
            onChange={(e) => setMinPayment(e.target.value)}
            required
            className=""
          />
        </div>
        <button
          className="bg-slate-200 rounded-full shadow-lg text-lg block m-auto my-2 px-6 hover:shadow-inner"
          type="submit"
        >
          Add Debt
        </button>
        <button
          className="bg-slate-200 rounded-full shadow-lg text-lg block m-auto my-2 px-6 hover:shadow-inner"
          onClick={handleClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddDebt;
