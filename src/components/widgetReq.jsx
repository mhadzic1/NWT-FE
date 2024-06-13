import React, { useEffect, useState } from 'react';
import { getRequests, getSuperAdminRequests } from '../api/requests/requestsAPI';
import { jwtDecode } from 'jwt-decode';
import StatusRow from '../components/statusRow';
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const WidgetReq = () => {
    const token = sessionStorage.getItem('token');
    let decodedToken;
    if (token) {
        try {
            decodedToken = jwtDecode(token);
        } catch (e) {
            console.error('Invalid token:', e);
        }
    }

    const userRole = decodedToken ? decodedToken.role : null;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (userRole === 'Admin') {
                    response = await getRequests({});
                } else if (userRole === 'SuperAdmin') {
                    response = await getSuperAdminRequests({});
                }
                setData(response.data.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error(error);
                setLoading(false); // Set loading to false even if there is an error
            }
        };

        fetchData();
    }, [userRole]);

    const handleStatusChange = (id, newStatus) => {
        // Update the data with the new status
        const updatedData = data.map(item => {
            if (item.requestId === id) {
                return { ...item, status: newStatus };
            }
            return item;
        });
        // Set the updated data
        setData(updatedData);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">User Requests</h3>
            <TableContainer component={Paper}>
            <Table className="w-full" aria-label="change requests table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map(item => (
                            <StatusRow
                                key={item.requestId}
                                id={item.requestId}
                                user={item.user}
                                room={item.room.name}
                                team={item.team}
                                status={item.status}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default WidgetReq;
