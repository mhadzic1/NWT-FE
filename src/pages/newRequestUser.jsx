import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Box, CardActionArea, CardActions, Button } from '@mui/material';
import { getRoomsWithNoAccess } from "../api/requests/requestsAPI"; // Adjust the import path as needed
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

const NewRequestUser = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingRequest, setProcessingRequest] = useState(false); // State for tracking request processing

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getRoomsWithNoAccess();
                console.log(response);
                setRooms(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user rooms:", error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handlePermissionRequest = async (roomId) => {
        try {
            setProcessingRequest(true); // Start processing request
            const token = sessionStorage.getItem('token');
            if (!token) {
                throw new Error('Token or userId not found in session storage');
            }

            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const userId = decodedToken.userId;

            const requestBody = {
                roomId: roomId,
                userId: userId
            };

            const response = await axios.post('http://localhost:8080/user/request', requestBody, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            console.log('Permission request successful:', response.data);

            // Optionally, update state or perform any other actions after successful request
        } catch (error) {
            console.error("Error requesting permission:", error);
            // Handle error (e.g., show error message to user)
        } finally {
            setProcessingRequest(false); // Stop processing request (whether success or error)
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <h3 className="font-bold text-xl mb-4">Request Permission</h3>
            <Grid container spacing={3}>
                {rooms.map((room) => (
                    <Grid item xs={12} sm={6} md={4} key={room.id}>
                        <Card sx={{
                            position: 'relative',
                            '&:hover .card-actions': {
                                display: 'flex',
                            }
                        }}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {room.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Floor: {room.floor}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Room ID: {room.id}
                                    </Typography>
                                    {/* Add more room details here as needed */}
                                </CardContent>
                            </CardActionArea>
                            <CardActions className="card-actions" sx={{
                                display: 'none',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                justifyContent: 'space-between',
                                padding: '16px',
                                backgroundColor: 'rgba(255, 255, 255, 1)'
                            }}>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => handlePermissionRequest(room.id)}
                                    disabled={processingRequest} // Disable button when request is processing
                                >
                                    {processingRequest ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Request Permission'
                                    )}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default NewRequestUser;
