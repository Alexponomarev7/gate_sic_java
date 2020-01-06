package com.gate.gatelib.controller;

import com.gate.gatelib.models.Group;
import com.gate.gatelib.models.ProblemSet;
import com.gate.gatelib.models.Submission;
import com.gate.gatelib.models.User;
import com.gate.gatelib.repository.UserDao;
import com.gate.gatelib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Set;

@RestController
public class ProblemSetController {

    private final UserDao userDao;

    ProblemSetController(UserDao userDao) {
        this.userDao = userDao;
    }

    @Autowired
    private UserService userService;

    @GetMapping(value="/api/contests")
    public Set<ProblemSet> FindContests(@RequestParam("username") String username) {
        System.out.println(username);
        User u = userDao.findByUsername(username);
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        }
        Set<ProblemSet> set = new HashSet<>();
        for (Group g : u.getGroups()) {
            set.addAll(g.getSets());
        };

        return set;
    }
}