package com.gate.gatelib.controller;

import com.gate.gatelib.config.CurrentUser;
import com.gate.gatelib.config.UserPrincipal;
import com.gate.gatelib.models.*;
import com.gate.gatelib.repository.ProblemDao;
import com.gate.gatelib.repository.ProblemSetDao;
import com.gate.gatelib.repository.UserDao;
import com.gate.gatelib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class ProblemSetController {

    @Autowired
    UserDao userDao;

    @Autowired
    ProblemDao problemDao;

    @Autowired
    ProblemSetDao problemSetDao;

    ProblemSetController(UserDao userDao, ProblemDao problemDao, ProblemSetDao problemSetDao) {
        this.userDao = userDao;
        this.problemDao = problemDao;
        this.problemSetDao = problemSetDao;
    }

    @Autowired
    private UserService userService;

    @GetMapping(value="/api/contests")
    @PreAuthorize("hasRole('USER')")
    public Set<ProblemSet> FindContests(@CurrentUser UserPrincipal currentUser) {
        User u = userDao.findByUsername(currentUser.getUsername());
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        }
        Set<ProblemSet> set = new HashSet<>();
        for (Group g : u.getGroups()) {
            set.addAll(g.getSets());
        };

        return set;
    }

    @GetMapping(value="/api/contests/{contestId}")
    @PreAuthorize("hasRole('USER')")
    public List<Problem> loadContest(@CurrentUser UserPrincipal currentUser,
                                     @PathVariable Long contestId) {
        User u = userDao.findByUsername(currentUser.getUsername());

        if (u == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "user not found");
        }

        Optional<ProblemSet> problemSet = problemSetDao.findById(contestId);

        if (!problemSet.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "contest not found");
        }

        ProblemSet existedProblemSet = problemSet.get();
        Set<Group> intersection = new HashSet<Group>(existedProblemSet.getGroups());
        intersection.retainAll(u.getGroups());

        if (intersection.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "not access");
        }

        return existedProblemSet.getProblems();
    }
}