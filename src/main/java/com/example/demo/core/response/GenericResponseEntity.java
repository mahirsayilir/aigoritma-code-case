package com.example.demo.core.response;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import static com.example.demo.core.response.CreateGenericResponse.createGenericResponseEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class GenericResponseEntity<T> implements Serializable {

    private String message;
    private int statusCode;
    private T response;


    public GenericResponseEntity(String message, T response) {
        this.message = message;
        this.response = response;
    }

    public static <T> GenericResponseEntity<T> ok() {
        return createGenericResponseEntity(HttpStatus.OK.value(), "success", null);
    }

    public static <T> GenericResponseEntity<T> ok(T response) {
        return createGenericResponseEntity(HttpStatus.OK.value(), "success", response);
    }

    public static <T> GenericResponseEntity<T> bad() {
        return createGenericResponseEntity(HttpStatus.BAD_REQUEST.value(), "bad request", null);
    }

    public static <T> GenericResponseEntity<T> bad(String message) {
        return createGenericResponseEntity(HttpStatus.BAD_REQUEST.value(), message, null);
    }
}
