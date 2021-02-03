package com.example.demo.core.entity;

import com.example.demo.core.entity.base.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Entity
public class Movie extends BaseEntity {

    private String name;

    @NotEmpty
    private String director;

    @Min(1900)
    @Max(2100)
    private int year;
}
