package com.example.demo.service;

import com.example.demo.core.request.CreateMovieRequest;
import com.example.demo.core.request.UpdateMovieRequest;
import com.example.demo.core.response.GenericResponse;

public interface MovieService {

    GenericResponse<?> getAllMovies();

    GenericResponse<?> create(CreateMovieRequest request);

    GenericResponse<?> update(Long movieId, UpdateMovieRequest  request);

    GenericResponse<?> delete(Long movieId);

}
