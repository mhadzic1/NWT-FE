import React, { useEffect, useState } from 'react';
import { getRequests, getSuperAdminRequests } from '../api/requests/requestsAPI';
import { jwtDecode } from 'jwt-decode';
import StatusRow from '../components/statusRow';

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

    useEffect(() => {
        if (userRole === 'Admin') {
            getRequests({})
                .then(response => {
                    console.log(response);
                    setData(response.data.data);
                })
                .catch(error => console.error(error));
        } else if (userRole === 'SuperAdmin') {
            getSuperAdminRequests({})
                .then(response => {
                    setData(response.data.data);
                })
                .catch(error => console.error(error));
        }
    }, []);

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

    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">Change Requests</h3>
            <table className="table-fixed w-full text-center border-separate border-spacing-y-3">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Room</th>
                    <th>Team</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data &&
                    data.map(item => (
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
                </tbody>
            </table>
        </div>
    );
};

export default WidgetReq;
