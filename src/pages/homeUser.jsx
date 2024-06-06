import React from 'react';
import {jwtDecode} from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const HomeUser = ({ user }) => {
    // Retrieve the token from local storage
    const token = sessionStorage.getItem('token');
    console.log('Retrieved token:', token);

    let decodedToken;
    if (token) {
        try {
            // Decode the token
            decodedToken = jwtDecode(token);
            console.log('Decoded token:', decodedToken);
        } catch (e) {
            console.error('Invalid token:', e);
        }
    } else {
        console.warn('No token found in local storage.');
    }

    // Get user role from the decoded token
    const userRole = decodedToken ? decodedToken.role : null;
    console.log('User role:', userRole);

    // Redirect to login page if the user is not a standard user
    if (!userRole || userRole !== 'User') {
        console.warn('Unauthorized access attempt. Redirecting to login page.');
        return <Navigate to="/unauthorized" />;
    }

    console.log('User is authorized. Rendering HomeUser component.');

    return (
        <div className="user-profile">
            <img src={user.picture} alt={`${user.username}'s profile`} className="profile-picture" />
            <div className="user-details">
                <h2>{user.username}</h2>
                <p>Ime: {user.firstName}</p>
                <p>Prezime: {user.lastName}</p>
                <p>Datum rođenja: {user.birthDate}</p>
            </div>
        </div>
    );
};

export default HomeUser;
