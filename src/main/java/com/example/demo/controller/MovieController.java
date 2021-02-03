package com.example.demo.controller;

import com.example.demo.core.request.CreateMovieRequest;
import com.example.demo.core.request.UpdateMovieRequest;
import com.example.demo.core.response.GenericResponse;
import com.example.demo.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost"})
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping(value = "/")
    public GenericResponse getAllMovies() {
        return movieService.getAllMovies();
    }

    @PutMapping(value = "/{movieId}")
    public GenericResponse update(@PathVariable Long movieId, @RequestBody UpdateMovieRequest request) {
        return movieService.update(movieId, request);
    }

    @DeleteMapping(value = "/{movieId}")
    public GenericResponse delete(@PathVariable Long movieId) {
        return movieService.delete(movieId);
    }

    @PostMapping(value = "/create")
    public GenericResponse create(@RequestBody CreateMovieRequest request) {
        return movieService.create(request);
    }
}
