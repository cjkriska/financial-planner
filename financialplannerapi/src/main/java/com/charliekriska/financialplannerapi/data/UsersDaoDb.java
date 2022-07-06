package com.charliekriska.financialplannerapi.data;

import com.charliekriska.financialplannerapi.entity.Debt;
import com.charliekriska.financialplannerapi.entity.User;
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
public class UsersDaoDb implements UsersDao {

    @Autowired
    JdbcTemplate jdbc;

    // Create
    @Override
    @Transactional
    public User addUser(User user) {

        final String INSERT_USER = "INSERT INTO user(username, password) " +
                                   "VALUES(?,?);";
        jdbc.update(INSERT_USER,
                    user.getUsername(),
                    user.getPassword());
        int newId = jdbc.queryForObject("SELECT LAST_INSERT_ID()", Integer.class);
        user.setUserId(newId);

        return user;
    }

    // Read
    @Override
    public List<User> getAllUsers() {

        final String SELECT_ALL_USERS = "SELECT * FROM user;";
        List<User> users = jdbc.query(SELECT_ALL_USERS, new UserMapper());
        for(User user : users) {
            user.setDebts(getDebtsForUser(user.getUserId()));
        }

        return users;
    }
    @Override
    public User getUserById(int userId) {
        try {

            final String SELECT_USER_BY_ID = "SELECT * FROM user " +
                                             "WHERE userId = ?;";
            User user = jdbc.queryForObject(SELECT_USER_BY_ID, new UserMapper(), userId);
            user.setDebts(getDebtsForUser(userId));

            return user;

        } catch(DataAccessException ex) {
            return null;
        }
    }
    public List<Debt> getDebtsForUser(int userId) {
        final String SELECT_DEBTS_BY_USER = "SELECT * FROM debt " +
                                            "WHERE userId = ?;";
        List<Debt> debts = jdbc.query(SELECT_DEBTS_BY_USER, new DebtsDaoDb.DebtMapper(), userId);

        return debts;
    }

    // Update
    @Override
    public User updateUser(User user) {

        final String UPDATE_USER = "UPDATE user SET username = ?, password = ? " +
                                   "WHERE userId = ?;";
        jdbc.update(UPDATE_USER,
                    user.getUsername(),
                    user.getPassword(),
                    user.getUserId());

        return getUserById(user.getUserId());
    }

    // Delete
    @Override
    @Transactional
    public void deleteUserById(int userId) {

        final String DELETE_USER = "DELETE FROM user WHERE userId = ?;";
        jdbc.update(DELETE_USER, userId);
    }

    public static final class UserMapper implements RowMapper<User> {

        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setUserId(rs.getInt("userId"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));

            return user;
        }
    }
}
