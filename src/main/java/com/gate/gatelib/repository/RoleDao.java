package com.gate.gatelib.repository;

import com.gate.gatelib.models.Role;
import com.gate.gatelib.models.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleDao extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
