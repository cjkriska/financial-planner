package com.charliekriska.financialplannerapi.service;

import com.charliekriska.financialplannerapi.data.DebtsDao;
import com.charliekriska.financialplannerapi.entity.Debt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DebtServiceImpl implements DebtService {

    @Autowired
    DebtsDao debtsDao;

    @Override
    public List<Debt> getAllDebts() {
        return debtsDao.getAllDebts();
    }

    @Override
    public Debt getDebtById(int debtId) {
        return debtsDao.getDebtById(debtId);
    }

    @Override
    public Debt addDebt(Debt debt) {
        return debtsDao.addDebt(debt);
    }

    @Override
    public Debt updateDebt(Debt debt) {
        return debtsDao.updateDebt(debt);
    }

    @Override
    public void deleteDebt(int debtId) {
        debtsDao.deleteDebtById(debtId);
    }
}
