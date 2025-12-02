package com.jewelora.marketplace.userservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "inventory_manager")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class InventoryManager {
	@Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "inventory_manager_id")
	private String inventoryManagerId;

    @Column(name = "role_id", nullable = false, length = 36)
    private String roleId;

    @Column(name = "inventory_manager_username", nullable = false, unique = true, length = 50)
    private String inventoryManagerUsername;

    @Column(name = "inventory_manager_password", nullable = false, length = 255)
    private String inventoryManagerPassword;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "is_active")
    private Boolean isActive = true;
}
