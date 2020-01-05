package com.gate.gatelib.repository;

import com.gate.gatelib.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {
}
