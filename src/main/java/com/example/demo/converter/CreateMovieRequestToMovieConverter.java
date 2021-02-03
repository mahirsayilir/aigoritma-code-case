package com.example.demo.converter;

import com.example.demo.converter.base.BaseConverter;
import com.example.demo.core.entity.Movie;
import com.example.demo.core.request.CreateMovieRequest;
import org.springframework.stereotype.Component;

@Component
public class CreateMovieRequestToMovieConverter implements BaseConverter<CreateMovieRequest, Movie> {

    @Override
    public Movie convert(CreateMovieRequest input) {
        Movie movie = new Movie();
        movie.setName(input.getName());
        movie.setDirector(input.getDirector());
        movie.setEnabled(true);
        movie.setYear(input.getYear());
        return movie;
    }
}
