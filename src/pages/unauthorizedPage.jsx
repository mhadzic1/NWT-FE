import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../UnauthorizedPage.css';

const UnauthorizedPage = () => {
    return (
        <div className="unauthorized-page">
            <FaExclamationTriangle className="warning-icon" />
            <h1 className="unauthorized-title">Unauthorized Access</h1>
            <p className="unauthorized-message">You do not have permission to view this page.</p>
            <Link to="/login" className="unauthorized-link">Go to Login</Link>
        </div>
    );
};

export default UnauthorizedPage;
