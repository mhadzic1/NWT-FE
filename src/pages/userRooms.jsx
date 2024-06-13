import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Box, CardActionArea, CardActions, Button } from '@mui/material';
import { getUserRooms, enterRoom, leaveRoom } from '../api/rooms/roomsAPI'; // Adjust the import path as needed

const UserRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await getUserRooms();
                console.log(response);
                setRooms(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user rooms:", error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const handleEnterRoom = async (roomId) => {
        try {
            const response = await enterRoom(roomId);
            console.log("Entered room:", response);
            // Refresh the rooms list after entering room (if needed)
        } catch (error) {
            console.error("Error entering room:", error);
        }
    };

    const handleLeaveRoom = async (roomId) => {
        try {
            const response = await leaveRoom(roomId);
            console.log("Left room:", response);
            // Refresh the rooms list after leaving room (if needed)
        } catch (error) {
            console.error("Error leaving room:", error);
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
            <Typography variant="h4" component="h1" gutterBottom>
                Accessible Rooms
            </Typography>
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
                                <Button size="small" color="primary" onClick={() => handleEnterRoom(room.id)}>
                                    Enter Room
                                </Button>
                                <Button size="small" color="secondary" onClick={() => handleLeaveRoom(room.id)}>
                                    Leave Room
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserRooms;
