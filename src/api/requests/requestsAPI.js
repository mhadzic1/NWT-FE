import axios from 'axios';
import { resolve } from '../resolver';
import { encodeCredentials } from '../encoder';
import { backend_password, backend_username } from '../../config';
import { jwtDecode } from "jwt-decode";
import { getUserByUsername } from "../user/userAPI";
import { sendEmail } from "../mailer/mailer";

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Adjust the base URL according to your API endpoint
    timeout: 5000, // Set a timeout for requests
});

// Add a request interceptor to include the token in the request headers
api.interceptors.request.use(config => {
    // Add your token handling logic here if needed
    return config;
}, error => {
    return Promise.reject(error);
});

export async function getRequests(options) {
    let encodedCredentials = encodeCredentials(backend_username, backend_password);

    return await resolve(
        api.get('/zahtjevi', {
            params: options,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}
export async function getSuperAdminRequests(options) {
    let encodedCredentials = encodeCredentials(backend_username, backend_password);

    return await resolve(
        api.get('/zahtjevi/superAdminZahtjevi', {
            params: options,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function deleteUserRequest(requestId) {
    return await resolve(
        api.delete(`/zahtjevi/${requestId}`, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function getRequestByUserId(userId) {
    let encodedCredentials = encodeCredentials(backend_username, backend_password);

    return await resolve(
        api.get(`/zahtjevi/user/${userId}`, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function getRequestById(requestId) {
    let encodedCredentials = encodeCredentials(backend_username, backend_password);

    return await resolve(
        api.get(`/zahtjevi/${requestId}`, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}


export async function updateRequestStatus(requestId, username, status) {
    let encodedCredentials = encodeCredentials(backend_username, backend_password);
    let userData = getUserByUsername(username).then(async (data) => {
        console.log("USER DATA");
        console.log(data.data);
        await sendEmail(data.data.data.email, "This is a test email", status, username);
    })

    return await resolve(
        api.put(`/zahtjevi/${requestId}/status`, { status }, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function updateRequestPriority(requestId, priority) {
    return await resolve(
        api.put(`/zahtjevi/${requestId}/priority`, { priority }, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function updateStatusDetails(requestId, statusDetails) {
    return await resolve(
        api.put(`/zahtjevi/${requestId}/statusDetails`, { statusDetails }, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function raiseRequestToSuperAdmin(requestId, raiseBool) {
    return await resolve(
        api.put(`/zahtjevi/requestSuperAdmin/${requestId}/raise`, { superAdminZahtjev: raiseBool }, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function saveNewRequest(newRequest) {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const user = decodedToken.sub; // Adjust this according to how the user ID is stored in the token
        console.log('Request body:', newRequest);
        newRequest.username = user; // Add the userId to the newRequest object

        return await resolve(
            api.post('/zahtjevi', newRequest, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            })
        );
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}