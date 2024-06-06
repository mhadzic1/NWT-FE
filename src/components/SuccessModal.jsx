import React from 'react';

const SuccessModal = ({ onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Success</h2>
                <p>Request submitted successfully!</p>
            </div>
        </div>
    );
};

export default SuccessModal;