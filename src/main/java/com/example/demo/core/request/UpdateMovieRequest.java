package com.example.demo.core.request;

import com.example.demo.core.request.base.BaseRequest;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UpdateMovieRequest extends BaseRequest {

    private String name;
    @NotEmpty
    @NotNull
    private String director;
    private int year;

}
