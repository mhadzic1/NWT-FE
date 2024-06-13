import axios from 'axios';
import { resolve } from '../resolver';
import {jwtDecode} from "jwt-decode";

export async function getLogs(options) {

    return await resolve(
        axios({
            method: 'get',
            url: 'http://localhost:8080/user/log',
            params: options,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        }));
}

export async function getLogsForUser() {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    return await resolve(
        axios({
            method: 'get',
            url: `http://localhost:8080/user/log/user/${userId}`,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}