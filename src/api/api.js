import axios from 'axios';
import { encodeCredentials } from './encoder';
import { backend_username, backend_password } from '../config';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Adjust the base URL according to your API endpoint
    timeout: 5000, // Set a timeout for requests
});

// Add a request interceptor to include both Basic Auth and Bearer token in the request headers
api.interceptors.request.use(config => {
    // Retrieve Basic Auth credentials

    // Retrieve Bearer token from sessionStorage
    const token = sessionStorage.getItem('token');
    console.log('Retrieved token from sessionStorage:', token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Bearer ', token);
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export default api;
