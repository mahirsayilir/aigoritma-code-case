package com.example.demo.repository;

import com.example.demo.core.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByIdAndAndDeletedIsFalse(Long id);

    List<Movie> findAllByDeletedIsFalseOrderByIdDesc();
}
