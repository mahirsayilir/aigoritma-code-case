import {
    CREATE_MOVIE_FAILURE,
    CREATE_MOVIE_REQUEST,
    CREATE_MOVIE_SUCCESS, GET_MOVIES_FAILURE,
    GET_MOVIES_REQUEST,
    GET_MOVIES_SUCCESS, UPDATE_MOVIE_FAILURE, UPDATE_MOVIE_REQUEST, UPDATE_MOVIE_SUCCESS
} from "./api-action";

const movieReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_MOVIE_REQUEST:
        case UPDATE_MOVIE_REQUEST:
            return {
                ...state,
                movie_creation: {
                    status: 'request'
                }
            };
        case CREATE_MOVIE_SUCCESS:
        case UPDATE_MOVIE_SUCCESS:
            return {
                ...state,
                movie_creation: {
                    status: 'success',
                    result: action.response,
                }
            };
        case CREATE_MOVIE_FAILURE:
        case UPDATE_MOVIE_FAILURE:
            return {
                ...state,
                movie_creation: {
                    status: 'failure',
                    error: action.error
                }
            };
        case GET_MOVIES_REQUEST:
            return {
                ...state,
                get_movie: {
                    status: 'request'
                },
                movie_creation: {}
            };
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                get_movie: {
                    status: 'success',
                    result:  action.response,
                }
            };
        case GET_MOVIES_FAILURE:
            return {
                ...state,
                get_movie: {
                    status: 'failure',
                    error: action.error
                }
            };
        default:
            return state;
    }
}

export default movieReducer;

export const getMoviesFromEntities = (state) => state.movies.get_movie && state.movies.get_movie.result;

export const getMovieCreationStatus = (state) => state.movies.movie_creation && state.movies.movie_creation;