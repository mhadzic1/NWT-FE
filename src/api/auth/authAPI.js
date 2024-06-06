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
                url: 'http://localhost:8080/auth/login',
                data: { username, password }
            })
        );

        // Assuming the JWT token is in response.data.token
        const token = response.data.data;
        console.log(token);
        if (token) {
            // Store the token in sessionStorage
            sessionStorage.setItem('token', token);
            console.log('Token stored in sessionStorage:', token);

            // Decode the token to get user role
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role; // Assuming the role is stored in the 'role' field

            return { token, userRole };
        } else {
            throw new Error('Login failed: No token received');
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
