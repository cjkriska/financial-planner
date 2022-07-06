function PayoffPlan({ data, payoffStrategy, bonusPayment }) {
  function renderPayoffPlan() {
    let payoffSteps = [];
    let d = data.debts.map((a) => {
      return { ...a };
    });

    if (payoffStrategy === "avalanche") {
      d.sort((a, b) => (a.apr < b.apr ? 1 : -1));
    } else {
      d.sort((a, b) => (a.amount > b.amount ? 1 : -1));
    }

    let months = 0;
    let additionalPayment = parseFloat(bonusPayment);

    for (let i = 0; i < d.length; i++) {
      while (d[i].amount > d[i].minPayment + additionalPayment) {
        // Focus Payment
        d[i].amount *= d[i].apr / 100 / 12 + 1;
        d[i].amount -= d[i].minPayment + additionalPayment;

        // Minimum Payments
        for (let j = i + 1; j < d.length; j++) {
          d[j].amount *= d[j].apr / 100 / 12 + 1;

          if (d[j].amount >= d[j].minPayment) {
            d[j].amount -= d[j].minPayment;
          } else if (d[j].amount > 0) {
            d[j].amount = 0;
            additionalPayment += d[j].minPayment;
          }
        }

        months++;
      }

      d[i].amount = 0;
      additionalPayment += d[i].minPayment;
    }

    return payoffSteps;
  }

  function renderPayoffPlan() {
    // Initialize render objects
    let payoffSteps = [];

    // Prepare debts array
    let d = data.debts.map((a) => {
      return { ...a };
    });
    if (payoffStrategy === "avalanche") {
      d.sort((a, b) => (a.apr < b.apr ? 1 : -1));
    } else {
      d.sort((a, b) => (a.amount > b.amount ? 1 : -1));
    }

    // Initializations
    let months = 0;
    let additionalPayment = parseFloat(bonusPayment);

    let hasDebt = true;

    // Idea: look at payments made each month,
    // then check if any payments changed from previous month
    // then push payments to payoffSteps
    let payments = [];
    let prevPayments = [];
    let lastPayment = {};

    while (hasDebt) {
      prevPayments = [];
      for (let i = 0; i < payments.length; i++) {
        prevPayments.push(payments[i]);
      }
      payments = [];

      // Amortization Schedule (Debugging) ------------
      console.log("---------------------------------");
      let output = "";
      for (let i = 0; i < d.length; i++) {
        output += d[i].amount.toFixed(2) + "\t\t";
      }
      console.log(output);
      // ----------------------------------------------

      let leftover = 0;
      let min = 0;
      let addAdditionalPayment = true;
      for (let i = 0; i < d.length; i++) {
        let payment = 0;
        d[i].amount *= d[i].apr / 100 / 12 + 1;
        lastPayment = { name: d[i].debtName, payment: d[i].amount };
        if (i === 0 && addAdditionalPayment) {
          payment = d[i].minPayment - leftover + additionalPayment;
          d[i].amount -= payment;
        } else {
          payment = d[i].minPayment - leftover;
          d[i].amount -= payment;
        }
        payments.push({ name: d[i].debtName, payment: payment });
        leftover = 0;
        if (d[i].amount <= 0) {
          if (i === 0) {
            leftover = d[i].amount;
          } else {
            d[0].amount += d[i].amount;
            payments[0].payment -= d[i].amount;
            payments[i].payment += d[i].amount;
          }
          min += d[i].minPayment;
          d.splice(i, 1);
          i--;
          addAdditionalPayment = false;
        }
      }

      // Logging/Debugging ---------------------------------------
      console.log(payments);
      let sum = 0;
      for (let i = 0; i < payments.length; i++) {
        sum += payments[i].payment;
      }
      console.log("Total: " + sum);
      console.log("---------------------------------");
      // ---------------------------------------------------------

      for (let i = 0; i < payments.length; i++) {
        if (
          prevPayments.length !== 0 &&
          payments[i].payment !== prevPayments[i].payment
        ) {
          payoffSteps.push({
            name: d[0].debtName,
            months: months,
            focusPayment: prevPayments[0].payment,
            minPayments: [...prevPayments].slice(1),
          });
          months = 0;
          break;
        }
      }

      additionalPayment += min;

      if (d.length === 0) {
        hasDebt = false;
      }

      months++;
    }

    payoffSteps.push({
      name: payments[0].name,
      months: --months,
      focusPayment: payments[0].payment,
      minPayments: [],
    });

    payoffSteps.push({
      name: lastPayment.name,
      months: 1,
      focusPayment: lastPayment.payment,
      minPayments: [],
    });

    return payoffSteps;
  }

  return (
    <div className="row-span-2 bg-green-200 rounded p-3 shadow-xl">
      <div className="text-xl">Payoff Plan</div>
      {renderPayoffPlan().map((payoffStep, index) => {
        return (
          <div className="bg-green-100 flex my-4" key={index}>
            <div className="bg-slate-200 rounded-full text-lg px-3 m-2">
              <div className="m-auto">{payoffStep.months}</div>
              <div className="m-auto">months</div>
            </div>
            <div>
              <strong> Focus Payment:</strong>
              <div className="bg-green-200 rounded m-2 p-2 shadow-inner">
                <strong> {payoffStep.name}:</strong> $
                {payoffStep.focusPayment.toFixed(2)}
              </div>
              <strong> Minimum Payments:</strong>
              <br />
              <div className="bg-green-200 rounded m-2 p-2 shadow-inner">
                {payoffStep.minPayments.map((minPay, i) => {
                  return (
                    <div key={i}>
                      <strong> {minPay.name}:</strong> $
                      {minPay.length !== 0 ? minPay.payment.toFixed(2) : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PayoffPlan;
