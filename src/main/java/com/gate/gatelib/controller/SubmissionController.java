package com.gate.gatelib.controller;

import com.gate.gatelib.models.*;
import com.gate.gatelib.payload.ResolutionRequest;
import com.gate.gatelib.repository.SubmissionDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping(value = "/api/admin/submissions", produces = MediaType.APPLICATION_JSON_VALUE)
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

    @PostMapping("/resolve")
    @PreAuthorize("hasRole('ADMIN')")
    public Submission setStatus(@Valid @RequestBody ResolutionRequest request) {
        Optional<Submission> maybeSubmission = submissionDao.findById(request.getId());
        if (!maybeSubmission.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Submission not found."
            );
        }
        Submission s = maybeSubmission.get();
        s.setStatus(request.getStatus());
        s.setResolution(request.getResolution());
        submissionDao.save(s);
        return s;

    }
}
