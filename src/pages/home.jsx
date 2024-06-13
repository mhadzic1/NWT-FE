import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import FeaturedInfo from "../components/featuredInfo";
import WidgetLG from "../components/widgetLG";
import WidgetSM from "../components/widgetSM";

const Home = ({user}) => {
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

    // Redirect to login page if the user is not an admin
    if (!userRole || (userRole !== 'Admin' && userRole !== 'SuperAdmin')) {
        return <Navigate to="/unauthorized" />;
    }

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

export default Home;
