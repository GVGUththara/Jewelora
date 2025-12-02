package com.jewelora.marketplace.userservice.repository;

import com.jewelora.marketplace.userservice.entity.UserRole;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, String> {
	Optional<UserRole> findByRoleName(String roleName);
}