import axios from 'axios';
import { resolve } from '../resolver';
import { encodeCredentials } from '../encoder';
import { backend_password, backend_username } from '../../config';
import {jwtDecode} from "jwt-decode";

export async function getServiceLevelAgreements(options) {
    let encodedCredentials = encodeCredentials(backend_username, backend_password);

    return await resolve(
        axios({
            method: 'get',
            url: 'http://localhost:8080/sla/',
            params: options,
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        }));
}

export async function getServiceLevelAgreementsByUserId() {
    let encodedCredentials = encodeCredentials(backend_username, backend_password);
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    return await resolve(
        axios({
            method: 'get',
            url: `http://localhost:8080/sla/${userId}`, // Assuming your backend supports this endpoint
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
        })
    );
}

export async function createSLA(newSLA){
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return false;
    }
    const decodedToken = jwtDecode(token);
    const user = decodedToken.userId;
    newSLA.id_pacijenta = user;
    console.log("U slaAPI objekat je: ", newSLA);

    try {

        axios.post('http://localhost:8080/sla/', newSLA, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Response data:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } catch (error) {
        console.error('Error in try block:', error);
    }
}