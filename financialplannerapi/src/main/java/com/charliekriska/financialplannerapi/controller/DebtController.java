package com.charliekriska.financialplannerapi.controller;

import com.charliekriska.financialplannerapi.entity.Debt;
import com.charliekriska.financialplannerapi.service.DebtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class DebtController {

    @Autowired
    DebtService debtService;

    @GetMapping("debts")
    public List<Debt> getDebts() {
        return debtService.getAllDebts();
    }

    @GetMapping("debt/{debtId}")
    public Debt getDebtById(@PathVariable int debtId) {
        return debtService.getDebtById(debtId);
    }

    @PostMapping("addDebt")
    public Debt addDebt(@RequestBody Debt debt) {
        return debtService.addDebt(debt);
    }

    @PutMapping("updateDebt")
    public Debt updateDebt(@RequestBody Debt debt) {
        return debtService.updateDebt(debt);
    }

    @DeleteMapping("debt/{debtId}")
    public void deleteDebt(@PathVariable int debtId) {
        debtService.deleteDebt(debtId);
    }

}