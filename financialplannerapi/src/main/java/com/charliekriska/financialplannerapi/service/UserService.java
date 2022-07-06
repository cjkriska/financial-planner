package com.charliekriska.financialplannerapi.service;

import com.charliekriska.financialplannerapi.entity.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(int userId);
    User addUser(User user);
    User updateUser(User user);
    void deleteUser(int userId);

}
