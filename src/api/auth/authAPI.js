import axios from 'axios';
import { resolve } from '../resolver';
import {jwtDecode} from 'jwt-decode';
import { encodeCredentials } from '../encoder';
import { backend_password, backend_username } from '../../config';

// Function to perform login and get a JWT token
export async function login(username, password) {
    try {
        const encodedCredentials = encodeCredentials(backend_username, backend_password);

        const response = await resolve(
            axios({
                method: 'post',
                url: 'http://localhost:8080/user/auth/login',
                data: { username, password },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${encodedCredentials}`
                },
                withCredentials: true
            })
        );

        // Assuming the JWT token is in response.data.data
        const token = response.data.data;
        if (token) {
            // Store the token in sessionStorage
            sessionStorage.setItem('token', token);

            // Decode the token to get user role
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role; // Assuming the role is stored in the 'role' field

            return { token, userRole };
        } else {
            throw new Error('Login failed: No token received');
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Login failed:', error.response.data);
            throw new Error(`Login failed: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            throw new Error('Login failed: No response received from the server');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}
