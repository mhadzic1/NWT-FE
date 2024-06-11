import React, { useState } from 'react';
import {Avatar, Button} from "@mui/material";
import { updateRequestStatus, updateRequestPriority, updateStatusDetails, raiseRequestToSuperAdmin } from '../api/requests/requestsAPI';
import CircularProgress from '@mui/material/CircularProgress';

const StatusRow = ({ avatarSrc, name, date, task, initialStatus, user, room, team }) => {
    const handleAccept = () => {
        // Handle accept logic
    };

    const handleReject = () => {
        // Handle reject logic
    };

    return (
        <tr>
            <td className="px-4 py-2">
                <div className="flex items-center">
                    <Avatar alt="User Avatar" src={avatarSrc} />
                    <span className="ml-2">{name}</span>
                </div>
            </td>
            <td className="px-4 py-2">{room}</td>
            <td className="px-4 py-2">{team}</td>
            <td className="px-4 py-2 flex gap-2">
                <Button variant="contained" color="primary" onClick={handleAccept}>
                    Accept
                </Button>
                <Button variant="contained" color="error" onClick={handleReject}>
                    Reject
                </Button>
            </td>
        </tr>
    );
};

export default StatusRow;
