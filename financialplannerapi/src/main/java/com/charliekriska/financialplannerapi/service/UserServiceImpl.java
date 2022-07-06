package com.charliekriska.financialplannerapi.service;

import com.charliekriska.financialplannerapi.data.UsersDao;
import com.charliekriska.financialplannerapi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UsersDao usersDao;

    @Override
    public List<User> getAllUsers() {
        return usersDao.getAllUsers();
    }

    @Override
    public User getUserById(int userId) {
        return usersDao.getUserById(userId);
    }

    @Override
    public User addUser(User user) {
        return usersDao.addUser(user);
    }

    @Override
    public User updateUser(User user) {
        return usersDao.updateUser(user);
    }

    @Override
    public void deleteUser(int userId) {
        usersDao.deleteUserById(userId);
    }
}
