package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class CustomServiceException extends RuntimeException
{
    public CustomServiceException(String exception) {
        super(exception);
    }
}
