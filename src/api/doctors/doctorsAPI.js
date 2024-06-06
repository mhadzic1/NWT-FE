import { backend_password, backend_username } from "../../config";
import { encodeCredentials } from "../encoder";

export const getAllDoktori = async () => {


    //let encodedCredentials = encodeCredentials(backend_username, backend_password);
    try{
        const response = await fetch('http://localhost:8080/doktori');

        const data = await response.json();

        return data;
    } catch(error){
        console.error('Error fetching doctors data', error);
        return [];
    }
    
};

export const getDoktorById = async (id) => {
    const response = await fetch(`${"http://localhost:8080/doktori"}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch doctor by ID');
    }
    return await response.json();
};

export const createDoktor = async (doktor) => {
    const response = await fetch('http://localhost:8080/doktori', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doktor)
    });
    if (!response.ok) {
        throw new Error('Failed to create doctor');
    }
    return await response.json();
};