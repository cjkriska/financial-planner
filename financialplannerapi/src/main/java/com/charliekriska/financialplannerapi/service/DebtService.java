package com.charliekriska.financialplannerapi.service;

import com.charliekriska.financialplannerapi.entity.Debt;

import java.util.List;

public interface DebtService {

    List<Debt> getAllDebts();
    Debt getDebtById(int debtId);
    Debt addDebt(Debt debt);
    Debt updateDebt(Debt debt);
    void deleteDebt(int debtId);

}
