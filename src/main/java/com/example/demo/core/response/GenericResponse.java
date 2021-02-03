package com.example.demo.core.response;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import static com.example.demo.core.response.CreateGenericResponse.createGenericResponse;


/**
 * {@link GenericResponse} is a Generic Http Response object that the controllers will be return.
 * @param <T>
 */

@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class GenericResponse<T> implements Serializable {

    private String message;
    private int responseCode;
    private T response;

    public static <T> GenericResponse<T> empty() {
        return new GenericResponse<>();
    }


    public static <T> GenericResponse<T> ok() {
        return createGenericResponse(HttpStatus.OK.value(), "success", null);
    }

    public static <T> GenericResponse<T> ok(T response) {
        return createGenericResponse(HttpStatus.OK.value(), "success", response);
    }

    public static <T> GenericResponse<T> bad() {
        return createGenericResponse(HttpStatus.BAD_REQUEST.value(), "bad request", null);
    }

    public static <T> GenericResponse<T> bad(String message) {
        return createGenericResponse(HttpStatus.BAD_REQUEST.value(), message, null);
    }

    public static <T> GenericResponse<T> internal() {
        return createGenericResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error", null);
    }

}
