const data = {
    debts: [
        {
            name: "FedLoan D",
            amount: 6766,
            apr: 6.28,
            minPayment: 131.66
        },
        {
            name: "Earnest",
            amount: 47060,
            apr: 4.09,
            minPayment: 475.00
        },
        {
            name: "FedLoan C",
            amount: 20443,
            apr: 3.73,
            minPayment: 266.15
        }
    ]
}

function calcMonths() {
    let d = data.debts.map(a => {
        return {...a}
    });
    let months = 0;
    let additionalPayment = 1000;

    let focusLeftover = 0;
    let minLeftover = 0;
    for (let i = 0; i < d.length; i++) {

        while (d[i].amount >= (d[i].minPayment + additionalPayment)) {

            // Focus Payment
            d[i].amount *= (d[i].apr / 100 / 12 + 1);
            d[i].amount -= (d[i].minPayment + additionalPayment);

            // Minimum Payments
            for (let j = i + 1; j < d.length; j++) {
                d[j].amount *= (d[j].apr / 100 / 12 + 1);
                if (d[j].amount >= d[j].minPayment) {
                    d[j].amount -= (d[j].minPayment);
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

    return months + 1;
}


console.log(calcMonths());