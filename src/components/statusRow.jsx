import React, { useState } from 'react';
import { Avatar, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { changeStatus } from '../api/requests/requestsAPI';

const StatusRow = ({ id, user, room, team, status, onStatusChange }) => {
    const [loading, setLoading] = useState(false);

    const handleAccept = async () => {
        setLoading(true);
        try {
            // Call the API to update the request status
            await changeStatus(id, 'ACCEPTED');
            setLoading(false);
            // Notify parent component about status change
            onStatusChange(id, 'ACCEPTED');
        } catch (error) {
            console.error('Error accepting request:', error);
            setLoading(false);
        }
    };

    const handleReject = async () => {
        setLoading(true);
        try {
            // Call the API to update the request status
            await changeStatus(id, 'DENIED');
            setLoading(false);
            // Notify parent component about status change
            onStatusChange(id, 'DENIED');
        } catch (error) {
            console.error('Error rejecting request:', error);
            setLoading(false);
        }
    };

    return (
        <tr>
            <td className="px-4 py-2">{id}</td>
            <td className="px-4 py-2">
                <div className="flex items-center">
                    <Avatar alt="User Avatar" src={user.avatarSrc} />
                    <span className="ml-2">{user.username}</span>
                </div>
            </td>
            <td className="px-4 py-2">{room}</td>
            <td className="px-4 py-2">{team}</td>
            <td className="px-4 py-2">{status}</td>
            <td className="px-4 py-2 flex gap-2">
                {status !== 'ACCEPTED' && status !== 'DENIED' && (
                    <>
                        <Button variant="contained" color="primary" onClick={handleAccept} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Accept'}
                        </Button>
                        <Button variant="contained" color="error" onClick={handleReject} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Reject'}
                        </Button>
                    </>
                )}
            </td>
        </tr>
    );
};

export default StatusRow;
