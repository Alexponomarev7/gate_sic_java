package com.gate.gatelib.repository;

import com.gate.gatelib.models.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemDao extends JpaRepository<Problem, Integer> {

}
