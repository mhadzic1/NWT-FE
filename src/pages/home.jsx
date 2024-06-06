import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import FeaturedInfo from "../components/featuredInfo";
import WidgetLG from "../components/widgetLG";
import WidgetSM from "../components/widgetSM";

const Home = () => {
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
        <section className="p-3">
            <div className="flex gap-5 mb-6">
                <FeaturedInfo type="Patients" value="1,200" />
                <FeaturedInfo type="Doctors" value="3,200" />
                <FeaturedInfo type="Consultations" value="5,000" />
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <WidgetSM />
                </div>
                <div className="flex-[2_2_0%]">
                    <WidgetLG />
                </div>
            </div>
        </section>
    );
};

export default Home;
