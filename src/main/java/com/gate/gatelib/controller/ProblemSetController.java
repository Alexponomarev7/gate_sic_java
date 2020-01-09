package com.gate.gatelib.controller;

import com.gate.gatelib.config.CurrentUser;
import com.gate.gatelib.config.UserPrincipal;
import com.gate.gatelib.models.Group;
import com.gate.gatelib.models.ProblemSet;
import com.gate.gatelib.models.Problem;
import com.gate.gatelib.models.User;
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
import java.util.Optional;
import java.util.List;

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
    public Set<ProblemSet> findContests(@CurrentUser UserPrincipal currentUser) {
        User u = userDao.findByUsername(currentUser.getUsername());
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found.");
        }
        // TODO: do it on sql
        Set<ProblemSet> set = new HashSet<>();
        for (Group g : u.getGroups()) {
            set.addAll(g.getSets());
        };

        return set;
    }

    @GetMapping(value="/api/contests/{contestId}")
    @PreAuthorize("hasRole('USER')")
    public List<Problem> loadContest(@PathVariable Long contestId,
                                     @CurrentUser UserPrincipal currentUser) {
        Optional<User> maybeUser = userDao.findById(currentUser.getId());

        if (!maybeUser.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User not found."
            );
        }

        Optional<ProblemSet> maybeProblemSet = problemSetDao.findById(contestId);
        if (!maybeProblemSet.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Contest not found"
            );
        }
        // TODO: redundant check? private contests and public?
        checkAccessibility(maybeUser.get(), maybeProblemSet.get());

        return maybeProblemSet.get().getProblems();
    }

    private void checkAccessibility(User user, ProblemSet problemSet) {
        Set<Group> intersection = new HashSet<>(problemSet.getGroups());
        intersection.retainAll(user.getGroups());

        if (intersection.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "not access");
        }
    }
}