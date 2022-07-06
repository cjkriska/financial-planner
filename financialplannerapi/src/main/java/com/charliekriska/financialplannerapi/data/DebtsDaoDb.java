package com.charliekriska.financialplannerapi.data;

import com.charliekriska.financialplannerapi.entity.Debt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class DebtsDaoDb implements DebtsDao {

    @Autowired
    JdbcTemplate jdbc;

    // Create
    @Override
    @Transactional
    public Debt addDebt(Debt debt) {

        final String INSERT_DEBT = "INSERT INTO debt(userId, debtName, amount, apr, minPayment) " +
                                   "VALUES(?,?,?,?,?);";
        jdbc.update(INSERT_DEBT,
                    debt.getUserId(),
                    debt.getDebtName(),
                    debt.getAmount(),
                    debt.getApr(),
                    debt.getMinPayment());
        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        debt.setDebtId(newId);

        return debt;
    }

    // Read
    @Override
    public List<Debt> getAllDebts() {

        final String SELECT_ALL_DEBTS = "SELECT * FROM debt;";
        List<Debt> debts = jdbc.query(SELECT_ALL_DEBTS, new DebtMapper());

        return debts;
    }
    @Override
    public Debt getDebtById(int debtId) {

        try {

            final String SELECT_DEBT_BY_ID = "SELECT * FROM debt WHERE debtId = ?;";
            Debt debt = jdbc.queryForObject(SELECT_DEBT_BY_ID, new DebtMapper(), debtId);
            return debt;

        } catch(DataAccessException ex) {
            return null;
        }
    }

    // Update
    @Override
    public Debt updateDebt(Debt debt) {
        final String UPDATE_DEBT = "UPDATE debt SET userId = ?, debtName = ?, amount = ?, apr = ?, minPayment = ? " +
                                   "WHERE debtId = ?;";
        jdbc.update(UPDATE_DEBT,
                    debt.getUserId(),
                    debt.getDebtName(),
                    debt.getAmount(),
                    debt.getApr(),
                    debt.getMinPayment(),
                    debt.getDebtId());

        return getDebtById(debt.getDebtId());
    }

    // Delete
    @Override
    @Transactional
    public void deleteDebtById(int debtId) {

        final String DELETE_DEBT = "DELETE FROM debt WHERE debtId = ?;";
        jdbc.update(DELETE_DEBT, debtId);

    }

    public static final class DebtMapper implements RowMapper<Debt> {

        @Override
        public Debt mapRow(ResultSet rs, int rowNum) throws SQLException {
            Debt debt = new Debt();
            debt.setDebtId(rs.getInt("debtId"));
            debt.setUserId(rs.getInt("userId"));
            debt.setDebtName(rs.getString("debtName"));
            debt.setAmount(rs.getDouble("amount"));
            debt.setApr(rs.getDouble("apr"));
            debt.setMinPayment(rs.getDouble("minPayment"));

            return debt;
        }
    }
}
