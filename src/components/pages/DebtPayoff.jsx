import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Debts from "../Debts";
import AddDebt from "../AddDebt";
import MainInfo from "../MainInfo";
import PayoffPlan from "../PayoffPlan";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DebtPayoff() {
  const chart = {
    labels: [],
    datasets: [
      {
        label: "Total Debt",
        backgroundColor: "cyan",
        borderColor: "black",
        borderWidth: 2,
        data: [],
      },
    ],
  };

  const [chartData, setChartData] = useState(chart);
  const [data, setData] = useState({debts: []});

  const [addDebtOpen, setAddDebtOpen] = useState(false);
  const [payoffStrategy, setPayoffStrategy] = useState("avalanche");
  const [bonusPayment, setBonusPayment] = useState(0.0);

  let userId = 4;

  useEffect(() => {
    setChartData(chart);
  }, [bonusPayment, payoffStrategy]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    console.log("Running fetchData")
    try {
      let response = await fetch(`http://localhost:8080/user/${userId}`);
      let resData = await response.json();
      setData(JSON.parse(JSON.stringify(resData)));
    } catch(e) {
      console.error(e);
    }
  }

  const handleOpenCloseDebt = () => {
    setAddDebtOpen(!addDebtOpen);
  };

  const handlePayoffStrategyChange = () => {
    if (payoffStrategy === "avalanche") {
      setPayoffStrategy("snowball");
    } else {
      setPayoffStrategy("avalanche");
    }
  };

  const handleBonusPaymentChange = (event) => {
    setBonusPayment(event.target.value);
  };

  function calculateTotalMinPayments() {
    let sum = 0;
    data.debts.forEach((debt) => {
      sum += debt.minPayment;
    });
    return sum;
  }

  function calculateDebtTotal(debts) {
    let sum = 0;
    debts.forEach((debt) => {
      sum += debt.amount;
    });
    return sum;
  }

  function calculateTimeUntilPayoff() {
    // Intialize Chart to Empty
    chart.labels = [];
    chart.datasets[0].data = [];

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

    while (hasDebt) {
      // Amortization Schedule (Debugging) ------------
      // let output = "";
      // for (let i = 0; i < d.length; i++) {
      //   output += d[i].amount.toFixed(2) + "\t\t";
      // }
      // console.log(output);
      // ----------------------------------------------

      let leftover = 0;
      let min = 0;
      let addAdditionalPayment = true;
      for (let i = 0; i < d.length; i++) {
        d[i].amount *= d[i].apr / 100 / 12 + 1;
        if (i === 0 && addAdditionalPayment) {
          d[i].amount -= d[i].minPayment - leftover + additionalPayment;
        } else {
          d[i].amount -= d[i].minPayment - leftover;
        }
        leftover = 0;
        if (d[i].amount <= 0) {
          if (i === 0) {
            leftover = d[i].amount;
          } else {
            d[0].amount += d[i].amount;
          }
          min = d[i].minPayment;
          d.splice(i, 1);
          i--;
          addAdditionalPayment = false;
        }
      }

      additionalPayment += min;

      if (d.length === 0) {
        hasDebt = false;
      }

      months++;

      // Fill Chart
      chart.labels.push("");
      chart.datasets[0].data.push(calculateDebtTotal(d));
    }

    return months;
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_2fr] grid-rows-min gap-5 mt-4 mr-4">
      {/* Debts */}
      <div className="row-span-3 bg-green-200 rounded shadow-xl">
        <div className="bg-green-500 text-center text-xl mb-2 p-2">Debts</div>
        {addDebtOpen ? (
          <AddDebt handleClose={handleOpenCloseDebt} />
        ) : (
          <Debts handleOpen={handleOpenCloseDebt} debts={data.debts} fetchData={fetchData}/>
        )}
      </div>

      {/* MainInfo */}
      <MainInfo
        debts={data.debts}
        calculateTime={calculateTimeUntilPayoff}
        calculateDebtTotal={calculateDebtTotal}
      />

      {/* TotalDebtGraph */}
      <div className="bg-green-200 rounded p-3 shadow-xl">
        <div className="text-xl">Total Debt Projection</div>
        <Line
          data={chartData}
          options={{
            title: {
              display: true,
              text: "Daily spending for one week",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>

      {/* PayoffPlan */}
      {/* <PayoffPlan
        data={data}
        payoffStrategy={payoffStrategy}
        bonusPayment={bonusPayment}
      /> */}

      {/* InputStrategy */}
      <div className="bg-green-200 rounded p-3 shadow-xl">
        <div className="text-xl">Strategy</div>
        <div className="text-center m-2">
          <label htmlFor="strategies"> Payoff Strategy: </label>
          <select
            onChange={handlePayoffStrategyChange}
            name="strategies"
            id="strategies"
          >
            <option value="avalanche"> Avalanche </option>
            <option value="snowball"> Snowball </option>
          </select>
        </div>
        <div className="m-2">
          Minimum Payment: ${calculateTotalMinPayments()} +
          <input
            className="w-12"
            onChange={handleBonusPaymentChange}
            value={bonusPayment}
            type="text"
            id="extra-payment"
            name="extra-payment"
          />
          = ${(calculateTotalMinPayments() + parseFloat(bonusPayment)).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default DebtPayoff;
