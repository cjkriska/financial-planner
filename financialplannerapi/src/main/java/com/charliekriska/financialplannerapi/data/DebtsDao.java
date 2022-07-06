package com.charliekriska.financialplannerapi.data;

import com.charliekriska.financialplannerapi.entity.Debt;

import java.util.List;

public interface DebtsDao {

    // Create
    Debt addDebt(Debt debt);
    // Read
    List<Debt> getAllDebts();
    Debt getDebtById(int debtId);
    // Update
    Debt updateDebt(Debt debt);
    // Delete
    void deleteDebtById(int debtId);

}
