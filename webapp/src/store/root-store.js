import {
    createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { ApiClient } from '../client/api-client';
import api from '../midlleware/api';

const configureStore = (initialState, appConfig, reducers) => {
    const apiClient = new ApiClient(appConfig);
    const analyticsMiddlewareConfig = {
        debugEnabled: process.env.NODE_ENV === 'development',
    };
    const middlewares = [
        thunk,
        api(apiClient),
    ];
    const enhancers = [applyMiddleware(...middlewares)];
    return createStore(
        (state, action) => {
            const { typeahead, ...rest } = state;
            return {
                ...(reducers(rest, action)),
            };
        },
        initialState,
        compose(...enhancers),
    );
};

export default configureStore;