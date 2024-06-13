import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { getUserById } from "../user/userAPI"; // Adjust the import path as needed

export const getUserRooms = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in session storage');
    }

    try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const user = await getUserById(userId);
        const keycardId = user.keycardId;

        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/rs_api/rooms/getRoomsWithKeycard/${keycardId}`,
            headers: { 'Authorization': 'Bearer ' + token },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
}

export const enterRoom = async (roomId, keycardId) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in session storage');
        }

        console.log(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        console.log(userId);

        const user = await getUserById(userId);
        const keycardId = user.keycardId;

        const response = await axios.post(`http://localhost:8080/rs_api/rooms/enterRoom/${roomId}/keycard/${keycardId}`, {
            entryType: "IN"
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error("Error entering room:", error);
        throw error;
    }
};

export const leaveRoom = async (roomId) => {
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in session storage');
        }

        console.log(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        console.log(userId);

        const user = await getUserById(userId);
        const keycardId = user.keycardId;

        const response = await axios.post(`http://localhost:8080/rs_api/rooms/enterRoom/${roomId}/keycard/${keycardId}`, {
            entryType: "OUT"
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error("Error leaving room:", error);
        throw error;
    }
};