import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {resolve} from "../resolver";
import api from "../api";

export async function getEmailByUserId(userId) {
    const token = sessionStorage.getItem('token');

    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/users/${userId}/email`,
            headers: { 'Authorization': 'Bearer ' + token }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching email:", error);
        throw error;
    }
}

export async function getUserByUsername(username) {
    return await resolve(
        api.get(`/users/username/${username}`, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function getAllUsers() {
    const token = sessionStorage.getItem('token');

    try {
        const response = await axios({
            method: 'get',
            url: 'http://localhost:8080/user',
            headers: { 'Authorization': 'Bearer ' + token },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export async function addUser(userData) {
    // Add active: true to the userData object
    userData = { ...userData, active: true };

    const token = sessionStorage.getItem('token');

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/user',
            headers: { 'Authorization': 'Bearer ' + token },
            data: userData,
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export async function deleteUserByUsername(username) {
    const token = sessionStorage.getItem('token');
    const url = `http://localhost:8080/user/${username}`;

    try {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        // If the request is successful, return the response data
        return response.data;
    } catch (error) {
        // If an error occurs, log the error and throw it for handling
        console.error('Error deleting user:', error);
        throw error;
    }
}

