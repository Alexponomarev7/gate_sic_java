package com.gate.gatelib.controller;

import com.gate.gatelib.config.CurrentUser;
import com.gate.gatelib.config.UserPrincipal;
import com.gate.gatelib.models.*;
import com.gate.gatelib.payload.SubmitRequest;
import com.gate.gatelib.repository.ProblemDao;
import com.gate.gatelib.repository.ProblemSetDao;
import com.gate.gatelib.repository.SubmissionDao;
import com.gate.gatelib.repository.UserDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class SubmitController {

    private final UserDao userDao;
    private final ProblemSetDao problemSetDao;
    private final ProblemDao problemDao;
    private final SubmissionDao submissionDao;

    SubmitController(UserDao userDao, ProblemSetDao problemSetDao,
                     ProblemDao problemDao, SubmissionDao submissionDao) {
        this.userDao = userDao;
        this.problemSetDao = problemSetDao;
        this.problemDao = problemDao;
        this.submissionDao = submissionDao;
    }

    private void checkContestAccessibility(User user, ProblemSet problemSet, Problem problem) {
        boolean found = false;
        List<Problem> problemList = problemSet.getProblems();
        for (Problem checkedProblem : problemList) {
            if (checkedProblem.getId().equals(problem.getId())) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Problem does not exist in this problem set"
            );
        }
        // TODO: SQL?
        List<Group> userGroups = user.getGroups();
        Set<Group> problemSetGroups = problemSet.getGroups();
        found = false;
        for (Group group : userGroups) {
            if (problemSetGroups.contains(group)) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User does not have access to this contest"
            );
        }
    }



    @PostMapping(value="/competitions/{contestId}/problem/{problemId}/submit", consumes={"multipart/form-data"})
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> submitProblem(@PathVariable Long contestId, @PathVariable Long problemId,
                                           @Valid @RequestPart("payload") SubmitRequest submitRequest,
                                           @NotNull @RequestPart("file") MultipartFile file,
                                           @CurrentUser UserPrincipal currentUser) throws IOException {
        Optional<ProblemSet> maybeProblemSet = problemSetDao.findById(contestId);
        if (!maybeProblemSet.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Problem set does not exist"
            );
        }
        ProblemSet problemSet = maybeProblemSet.get();
        Optional<User> maybeUser = userDao.findById(currentUser.getId());
        if (!maybeUser.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User does not exist"
            );
        }
        User user = maybeUser.get();
        Optional<Problem> maybeProblem = problemDao.findById(problemId);
        if (!maybeProblem.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Problem does not exist"
            );
        }
        Problem problem = maybeProblem.get();
        checkContestAccessibility(user, problemSet, problem);

        Submission submission = new Submission();
        submission.setProblemSet(problemSet);
        submission.setUser(user);
        submission.setProblem(problem);

        // TODO: probably should verify that language is correct
        submission.setLang(submitRequest.getLanguage());

        submission.setSendTS(new Date());
        submission.setContents(new String(file.getBytes(), StandardCharsets.UTF_8));

        // TODO: send for testing instead of OK
        submission.setStatus("OK");

        Submission result = submissionDao.save(submission);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/submissions/{submissionId}")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location).body("");
    }
}