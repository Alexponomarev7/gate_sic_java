package com.gate.gatelib.controller;

import com.gate.gatelib.models.*;
import com.gate.gatelib.repository.SubmissionDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;


@RestController
@RequestMapping(value = "/submissions", produces = MediaType.APPLICATION_JSON_VALUE)
public class SubmissionController {
    private final SubmissionDao submissionDao;

    SubmissionController(SubmissionDao submissionDao) { this.submissionDao = submissionDao; }

    @GetMapping("/{submissionId}")
    @PreAuthorize("hasRole('ADMIN')")
    public Submission getSubmissionById(@PathVariable Long submissionId) {
        Optional<Submission> maybeSubmission = submissionDao.findById(submissionId);
        if (!maybeSubmission.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Submission not found."
            );
        }
        return maybeSubmission.get();
    }
}
