import axios from 'axios';

export const getUserRooms = async (keycard) => {
    const token = sessionStorage.getItem('token');

    try {
        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/rs_api/rooms/getRoomsWithKeycard/${keycard}`,
            headers: { 'Authorization': 'Bearer ' + token },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
