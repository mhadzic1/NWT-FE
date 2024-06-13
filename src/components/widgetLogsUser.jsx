import React, { useEffect, useState } from "react";
import { getLogsForUser } from "../api/logs/logsAPI";
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography
} from "@mui/material";

const WidgetLogsUser = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLogsForUser({});
                console.log(response);
                const logsData = response.data.data;
                setData(logsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user logs:", error);
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
        return (
            <div className="shadow-lg p-6">
                <Typography variant="h6" gutterBottom>
                    Error: {error.message}
                </Typography>
            </div>
        );
    }

    // Calculate number of logs in the past 7 and 30 days for the user
    const currentDate = new Date();
    const past7Days = new Date(currentDate);
    past7Days.setDate(currentDate.getDate() - 7);
    const past30Days = new Date(currentDate);
    past30Days.setDate(currentDate.getDate() - 30);

    const logsInPast7Days = data.filter(item => new Date(item.timestamp) > past7Days).length;
    const logsInPast30Days = data.filter(item => new Date(item.timestamp) > past30Days).length;

    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">User Logs</h3>
            <TableContainer component={Paper}>
                <Table className="w-full" aria-label="user logs table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Entry Type</TableCell>
                            <TableCell>Room Id</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.entryType}</TableCell>
                                <TableCell>{item.roomId}</TableCell>
                                <TableCell>{new Date(item.timestamp).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={3} p={2} bgcolor="#d1c4e9" borderRadius={4} color="#333">
                <Typography variant="h6" gutterBottom>
                    User Logs Summary
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Logs in the past 7 days: {logsInPast7Days}
                </Typography>
                <Typography variant="body1">
                    Logs in the past 30 days: {logsInPast30Days}
                </Typography>
            </Box>
        </div>
    );
};

export default WidgetLogsUser;
