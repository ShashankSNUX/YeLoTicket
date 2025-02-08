package com.yeloticket.service;

import com.yeloticket.dtos.MovieRequestDto;
import com.yeloticket.entities.MovieEntity;
import com.yeloticket.repository.MovieRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ModelMapper mapper;

    public Optional<MovieEntity> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    public String addMovie(MovieRequestDto movieRequest) throws Exception{
        MovieEntity movie = movieRepository.findByTitle(movieRequest.getTitle());
        if(movie != null ) {
            throw new Exception("The movie already exists");
        }
        movie = mapper.map(movieRequest, MovieEntity.class);
        movie.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        movieRepository.save(movie);
        return "The movie has been added successfully";
    }

    public List<MovieEntity> getMovies() {
        return movieRepository.findAll();
    }
}
