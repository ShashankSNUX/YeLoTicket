package com.yeloticket.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity extends BaseEntity {
    @Column(length = 100, name = "name", nullable = false, unique = true)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(length = 100, name = "email", nullable = false, unique = true)
    private String email;
    @Column()
    private UserRole role;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdOn = LocalDateTime.now();
}