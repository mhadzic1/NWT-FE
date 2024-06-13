import React, { useEffect, useState } from "react";
import { getRequestByUserId } from "../api/requests/requestsAPI";
import { jwtDecode } from 'jwt-decode';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from "@mui/material";

const RequestsUser = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = sessionStorage.getItem('token');
                const decodedToken = jwtDecode(token);
                const id = decodedToken.userId;

                const response = await getRequestByUserId(id);
                console.log(response);
                const requests = response.data.data.map((item) => ({
                    id: item.requestId, // Assuming requestId is unique for each request
                    status: item.status,
                    room: item.room.name,
                    date: item.kreirano, // Assuming this is the date field
                }));
                setData(requests);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "room", headerName: "Room", width: 300 },
        { field: "date", headerName: "Date", width: 150 },
    ];

    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">Requests by User</h3>
            <TableContainer component={Paper}>
                <Table aria-label="requests table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>{item.room}</TableCell>
                                <TableCell>{item.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default RequestsUser;
