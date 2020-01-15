package com.gate.gatelib.controller;

import com.gate.gatelib.config.CurrentUser;
import com.gate.gatelib.config.UserPrincipal;
import com.gate.gatelib.models.*;
import com.gate.gatelib.payload.UserSummary;
import com.gate.gatelib.repository.RoleDao;
import com.gate.gatelib.repository.UserDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    private final UserDao userDao;

    UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = userDao.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "user not found"
            );
        }
        return user;
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        Optional<User> user = userDao.findById(currentUser.getId());
        boolean isAdmin = false;
        if (user.isPresent()) {
            Set<Role> roles = user.get().getRoles();
            for (Role r : roles) {
                if (r.getName().name().equals("ROLE_ADMIN")) {
                    isAdmin = true;
                }
            }
        }
        return new UserSummary(currentUser.getId(), currentUser.getUsername(), isAdmin);
    }

}
