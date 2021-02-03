package com.example.demo.service.imp;

import com.example.demo.converter.CreateMovieRequestToMovieConverter;
import com.example.demo.core.entity.Movie;
import com.example.demo.core.request.CreateMovieRequest;
import com.example.demo.core.request.UpdateMovieRequest;
import com.example.demo.core.response.GenericResponse;
import com.example.demo.exception.CustomServiceException;
import com.example.demo.repository.MovieRepository;
import com.example.demo.service.MovieService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MovieServiceImp implements MovieService {

    @Autowired
    MovieRepository movieRepository;
    @Autowired
    CreateMovieRequestToMovieConverter converter;

    @Override
    public GenericResponse<?> getAllMovies() {
        List<Movie> movies = movieRepository.findAllByDeletedIsFalseOrderByIdDesc();
        return GenericResponse.ok(movies);
    }

    @Override
    @Transactional
    public GenericResponse<?> create(CreateMovieRequest request) {
        Movie movie = converter.convert(request);
        try {
            movieRepository.save(movie);
        } catch (ConstraintViolationException ex) {
            badRequestWithMessage(ex);
        }
        return GenericResponse.ok();
    }

    @Override
    @Transactional
    public GenericResponse<?> update(Long movieId, UpdateMovieRequest request) {
        Optional<Movie> movieOptional = movieRepository.findByIdAndAndDeletedIsFalse(movieId);
        if (!movieOptional.isPresent()) {
            throw new CustomServiceException("Movie Not Found!");
        }
        Movie updatedMovie = updateMovie(movieOptional.get(), request);
        try {
            movieRepository.save(updatedMovie);
        } catch (ConstraintViolationException ex) {
            badRequestWithMessage(ex);
        }
        return GenericResponse.ok();
    }

    @Override
    @Transactional
    public GenericResponse<?> delete(Long movieId) {
        Optional<Movie> movieOptional = movieRepository.findByIdAndAndDeletedIsFalse(movieId);
        if (!movieOptional.isPresent()) {
            throw new CustomServiceException("Movie Not Found!");
        }
        movieOptional.get().setDeleted(true);
        return GenericResponse.ok(movieOptional.get());
    }

    private Movie updateMovie(Movie movie, UpdateMovieRequest request) {
        movie.setName(request.getName());
        movie.setDirector(request.getDirector());
        movie.setYear(request.getYear());
        return movie;
    }

    private GenericResponse<?> badRequestWithMessage(ConstraintViolationException ex) {
        String errorMessage =
                ex.getConstraintViolations()
                        .stream()
                        .map(e -> e.getPropertyPath().toString() + " " + e.getMessage())
                        .collect(Collectors.joining(","));
        return GenericResponse.bad(errorMessage);
    }
}
