package com.yeloticket.service;

import com.yeloticket.entities.MovieEntity;
import com.yeloticket.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Optional<MovieEntity> getMovieById(Long id) {
        return movieRepository.findById(id);
    }
}
