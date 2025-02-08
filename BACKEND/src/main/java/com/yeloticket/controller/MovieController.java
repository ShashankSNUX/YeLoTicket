package com.yeloticket.controller;

import com.yeloticket.entities.MovieEntity;
import com.yeloticket.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/movies")
@CrossOrigin("*")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/all")
    public ResponseEntity<List<MovieEntity>> getAllMovie() {
        List<MovieEntity> movies = movieService.getMovies();
        return ResponseEntity.status(HttpStatus.OK).body(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MovieEntity> getMovieById(@PathVariable Long id) {
        Optional<MovieEntity> movie = movieService.getMovieById(id);
        return movie.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
