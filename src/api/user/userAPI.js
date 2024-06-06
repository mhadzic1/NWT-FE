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
