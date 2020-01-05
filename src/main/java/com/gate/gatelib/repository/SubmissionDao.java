package com.gate.gatelib.repository;

import com.gate.gatelib.models.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionDao extends JpaRepository<Submission, Integer> {

}
