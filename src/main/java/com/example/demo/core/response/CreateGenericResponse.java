package com.example.demo.core.response;

import java.io.Serializable;

public class CreateGenericResponse implements Serializable {

    public static <T> GenericResponse<T> createGenericResponse(int responseCode,
                                                               String message,
                                                               T response) {
        GenericResponse<T> genericResponse = new GenericResponse<>();
        genericResponse.setResponseCode(responseCode);
        genericResponse.setMessage(message);
        genericResponse.setResponse(response);
        return genericResponse;
    }

    public static <T> GenericResponseEntity<T> createGenericResponseEntity(int responseCode,
                                                                           String message,
                                                                           T response) {
        GenericResponseEntity<T> genericResponse = new GenericResponseEntity<>(message, response);
        genericResponse.setStatusCode(responseCode);
        return genericResponse;
    }

}
