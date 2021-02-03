import { decamelizeKeys } from 'humps';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (apiClient) => (callParams = {}, schema) => {
    if (callParams.data) {
        callParams.data = decamelizeKeys(callParams.data);
    }
    const query = callParams.query ? callParams.query : {};
    return apiClient.request(callParams, { params: query })
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject(response.data);
            }
            if (typeof response.data === 'object') {
                return response.data;
            }
            return {};
        });
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (apiClient) => (store) => (next) => (action) => {
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endpoint } = callAPI;
    const {
        schema, types, data, method, query,
    } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
    }
    if (!schema) {
        throw new Error('Specify one of the exported Schemas.');
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
    }
    if (!types.every((type) => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
    }

    const actionWith = (data) => {
        const finalAction = { ...action, ...data };
        delete finalAction[CALL_API];
        return finalAction;
    };

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    const callParams = {
        endpoint,
        method,
        data,
    };
    if (query) {
        callParams.query = query;
    }
    return callApi(apiClient)(callParams, schema).then(
        (response) => next(actionWith({
            response,
            type: successType,
        })),
        (error) => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened',
        })),
    );
};