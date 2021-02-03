import axios from 'axios';

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export class ApiClient {
    constructor(config = {}) {
        this.client = axios.create({
            baseURL: `http://localhost:8080/api`,
            headers: {
            },
            ...config,
        });
    }

    async request(callParams, config = {}) {
        if (!callParams.method) {
            throw new Error('Method is required for `request` call');
        }
        switch (callParams.method) {
            case GET:
                return this.get(callParams.endpoint, config);
            case POST:
                return this.post(callParams.endpoint, callParams.data, config);
            case PUT:
                return this.put(callParams.endpoint, callParams.data, config);
            case DELETE:
                return this.delete(callParams.endpoint, config);
            default:
                throw new Error('Not implemented');
        }
    }

    async get(path, config = {}) {
        return this.client.get(path, config);
    }

    async post(path, data = {}, config = {}) {
        return this.client.post(path, data, config);
    }

    async put(path, data = {}, config = {}) {
        return this.client.put(path, data, config);
    }

    async delete(path, config = {}) {
        return this.client.delete(path, config);
    }
}