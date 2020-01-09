package com.gate.gatelib.repository;

import com.gate.gatelib.models.ProblemSet;
import com.gate.gatelib.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionDao extends JpaRepository<Submission, Integer> {
    List<Submission> findAllByProblemSetOrderBySendTSDesc(ProblemSet problemSet);
}
