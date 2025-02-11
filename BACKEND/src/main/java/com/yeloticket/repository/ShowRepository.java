package com.yeloticket.repository;

import com.yeloticket.entities.ShowEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShowRepository extends JpaRepository<ShowEntity, Long> {
    List<ShowEntity> findAllByTheatreId(Long id);

    List<ShowEntity> findAllByTheatreIdAndMovieId(Long theatreId, Long movieId);
}
