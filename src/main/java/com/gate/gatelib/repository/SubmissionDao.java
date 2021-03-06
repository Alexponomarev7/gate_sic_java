package com.gate.gatelib.repository;

import com.gate.gatelib.models.ProblemSet;
import com.gate.gatelib.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionDao extends JpaRepository<Submission, Long> {
    List<Submission> findAllByProblemSetOrderBySendTSDesc(ProblemSet problemSet);
    List<Submission> findByUserIdAndProblemSetId(Long userId, Long problemSetId);
}
