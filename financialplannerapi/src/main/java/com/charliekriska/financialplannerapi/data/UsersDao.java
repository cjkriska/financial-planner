package com.charliekriska.financialplannerapi.data;

import com.charliekriska.financialplannerapi.entity.User;

import java.util.List;

public interface UsersDao {

    // Create
    User addUser(User user);
    // Read
    List<User> getAllUsers();
    User getUserById(int userId);
    // Update
    User updateUser(User user);
    // Delete
    void deleteUserById(int userId);

}
