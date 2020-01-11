package com.gate.gatelib.repository;

import com.gate.gatelib.models.Problem;
import com.gate.gatelib.models.ProblemSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemDao extends JpaRepository<Problem, Long> {
    List<Problem> findAllBySetsContainsOrderByNameAsc(ProblemSet problemSet);
}
