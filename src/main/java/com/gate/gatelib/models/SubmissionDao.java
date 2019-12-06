package com.gate.gatelib.models;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionDao extends JpaRepository<Submission, Integer> {
    List<Submission> findByUserIdAndProblemSetId(Integer userId, Integer problemSetId);
}
