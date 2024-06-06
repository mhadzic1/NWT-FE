import axios from 'axios';
import { resolve } from '../resolver';
import { encodeCredentials } from '../encoder';
import { backend_password, backend_username } from '../../config';

export const getAllPacijenti = async () => {


    //let encodedCredentials = encodeCredentials(backend_username, backend_password);
    try{
        const response = await fetch('http://localhost:8080/pacijenti');

        const data = await response.json();

        return data;
    } catch(error){
        console.error('Error fetching patients data', error);
        return [];
    }
    
}

export const getPacijentById = async (id) => {
    const response = await fetch(`${"http://localhost:8080/pacijenti"}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch pacijent by ID');
    }
    return await response.json();
};

export const createPacijent = async (doktor) => {
    const response = await fetch('http://localhost:8080/pacijenti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doktor)
    });
    if (!response.ok) {
        throw new Error('Failed to create pacijent');
    }
    return await response.json();
};