package com.yeloticket.controller;

import com.yeloticket.entities.MovieEntity;
import com.yeloticket.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/movies")
@CrossOrigin("*")  // Allow frontend to access backend
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/{id}")
    public ResponseEntity<MovieEntity> getMovieById(@PathVariable Long id) {
        Optional<MovieEntity> movie = movieService.getMovieById(id);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
