function MainInfo({ debts, calculateTime, calculateDebtTotal }) {
  function formatTimeUntilPayoff() {
    let months = calculateTime();
    let mon = months % 12;
    let years = Math.floor(months / 12);

    return years + " years, " + mon + " months";
  }

  function calculatePayoffDate() {
    let months = calculateTime();
    let years = Math.floor(months / 12);
    let mon = months % 12;
    let date = new Date();
    date.setMonth(date.getMonth() + mon);
    date.setFullYear(date.getFullYear() + years);
    return date.toDateString();
  }

  return (
    <div className="col-span-2 flex justify-between p-4 bg-slate-200 rounded shadow-xl">
      <div className="">
        <div className="">Total Debt:</div>
        <div className="text-3xl">
          ${calculateDebtTotal(debts).toLocaleString()}
        </div>
      </div>
      <div className="">
        <div className="">Payoff Date:</div>
        <div className="text-3xl">{calculatePayoffDate()}</div>
      </div>
      <div className="">
        <div className="">Time Until Payoff:</div>
        <div className="text-3xl">{formatTimeUntilPayoff()}</div>
      </div>
    </div>
  );
}

export default MainInfo;
