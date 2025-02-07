package com.yeloticket.repository;

import com.yeloticket.entities.ShowEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<ShowEntity, Long> {
}
