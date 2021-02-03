import {CALL_API} from "../midlleware/api";
import {DELETE, GET, POST, PUT} from "../client/api-client";
import {Movie, Movies} from "./schema";

export const CREATE_MOVIE_REQUEST = 'CREATE_MOVIE_REQUEST';
export const CREATE_MOVIE_SUCCESS = 'CREATE_MOVIE_SUCCESS';
export const CREATE_MOVIE_FAILURE = 'CREATE_MOVIE_FAILURE';

export const _createMovie = (data) => ({
    [CALL_API]: {
        types: [CREATE_MOVIE_REQUEST, CREATE_MOVIE_SUCCESS, CREATE_MOVIE_FAILURE],
        endpoint: '/movies/create',
        method: POST,
        data,
        schema: Movie,
    }
});

export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'GET_MOVIES_FAILURE';

export const getMovies = () => ({
    [CALL_API]: {
        types: [GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS, GET_MOVIES_FAILURE],
        endpoint: '/movies/',
        method: GET,
        schema: Movies,
    }
});

export const UPDATE_MOVIE_REQUEST = 'UPDATE_MOVIE_REQUEST';
export const UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS';
export const UPDATE_MOVIE_FAILURE = 'UPDATE_MOVIE_FAILURE';

export const _updateMovie = (movieId, data) => ({
    [CALL_API]: {
        types: [UPDATE_MOVIE_REQUEST, UPDATE_MOVIE_SUCCESS, UPDATE_MOVIE_FAILURE],
        endpoint: `/movies/${movieId}`,
        method: PUT,
        data,
        schema: Movie,
    }
});

export const DELETE_MOVIE_REQUEST = 'DELETE_MOVIE_REQUEST';
export const DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS';
export const DELETE_MOVIE_FAILURE = 'DELETE_MOVIE_FAILURE';

export const _deleteMovie = (movieId) => ({
    [CALL_API]: {
        types: [DELETE_MOVIE_REQUEST, DELETE_MOVIE_SUCCESS, DELETE_MOVIE_FAILURE],
        endpoint: `/movies/${movieId}`,
        method: DELETE,
        schema: Movie,
    }
});