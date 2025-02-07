package com.yeloticket.repository;

import com.yeloticket.entities.TheatreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TheatreRepository extends JpaRepository<TheatreEntity, Long> {

    TheatreEntity findByName(String name);
}
