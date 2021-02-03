import {_createMovie, _deleteMovie, _updateMovie, getMovies} from "./api-action";

export const createMovie = (data) => (dispatch) => {
    dispatch(_createMovie(data));
    dispatch(getMovies());
};

export const updateMovie = (movieId,data) => (dispatch) => {
    dispatch(_updateMovie(movieId, data));
    dispatch(getMovies());
};

export const deleteMovie = (movieId) => (dispatch) => {
    dispatch(_deleteMovie(movieId));
    dispatch(getMovies());
};