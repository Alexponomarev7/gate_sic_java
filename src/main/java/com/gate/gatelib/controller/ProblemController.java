package com.gate.gatelib.controller;

import com.gate.gatelib.config.CurrentUser;
import com.gate.gatelib.config.UserPrincipal;
import com.gate.gatelib.models.Group;
import com.gate.gatelib.models.ProblemSet;
import com.gate.gatelib.models.Problem;
import com.gate.gatelib.models.Submission;
import com.gate.gatelib.models.User;
import com.gate.gatelib.payload.ProblemResponse;
import com.gate.gatelib.repository.ProblemDao;
import com.gate.gatelib.repository.ProblemSetDao;
import com.gate.gatelib.repository.SubmissionDao;
import com.gate.gatelib.repository.UserDao;
import com.gate.gatelib.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.Optional;
import java.util.List;

@RestController
public class ProblemController {
    @Autowired
    ProblemDao problemDao;

    @Autowired
    UserDao userDao;

    private static final String ProblemsPath = "/Users/lexolordan/gate_problems";

    private static final String StatementSuffix = "/statements/russian/problem.tex";

    ProblemController(ProblemDao problemDao, UserDao userDao) {
        this.problemDao = problemDao;
        this.userDao = userDao;
    }

    @GetMapping(value="/api/problems/{problemId}")
    @PreAuthorize("hasRole('USER')")
    public ProblemResponse getProblem(@CurrentUser UserPrincipal currentUser,
                                        @PathVariable Long problemId) throws IOException {
        User u = userDao.findByUsername(currentUser.getUsername());
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found.");
        }

        Optional<Problem> problem = problemDao.findById(problemId);

        if (!problem.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Problem not found.");
        }
        System.out.println(ProblemsPath + problem.get().getPath() + StatementSuffix);

        ProblemResponse response = new ProblemResponse();
        response.setStatement(new String(Files.readAllBytes(
                Paths.get(ProblemsPath + problem.get().getPath() + StatementSuffix)
        ), StandardCharsets.UTF_8));

        return response;
    }

}
