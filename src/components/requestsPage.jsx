
import React, { useEffect, useState } from 'react';
import api from '../api/api'; // Import the Axios instance

const RequestsPage = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get('/user'); // Adjust endpoint as needed
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests', error);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div>
            <h1>Requests</h1>
            <ul>
                {requests.map(request => (
                    <li key={request.id}>{request.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RequestsPage;
