import React, { useState } from 'react';
import { saveNewRequest } from '../api/requests/requestsAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../newRequestUser.css';
import GradeModal from '../components/GradeModal';
import { getLogsForUser } from '../api/logs/logsAPI';
import SuccessModal from '../components/SuccessModal';

const NewRequestUser = () => {
    const [priority, setPriority] = useState('Low');
    const [requestDescription, setRequestDescription] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const saveRequest = async () => {
        const newRequest = {
            opis: requestDescription,
            status: 'PENDING',
            kreirano: new Date().toISOString(),
            prioritet: priority
        };

        const success = await saveNewRequest(newRequest);
        if (success) {
            setShowSuccessModal(true);
        }
    };

    return (
        <div className="newRequest_container">
            <div className="newRequest_h1">
                <h1>New Request</h1>
            </div>

            <div className="newRequest_input">
                <input
                    type="text"
                    id="request"
                    name="newRequest"
                    placeholder="Enter your request here..."
                    value={ requestDescription }
                    onChange={ (e) => setRequestDescription(e.target.value) }
                />
            </div>

            <div className="newRequest_dropdown">
                <label htmlFor="priority">Priority: </label>
                <select
                    id="priority"
                    name="priority"
                    value={ priority }
                    onChange={ (e) => setPriority(e.target.value) }
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </div>

            <div className="newRequest_saveButton">
                <button onClick={ saveRequest }>Save</button>
            </div>
            { showSuccessModal }
        </div>
    );
};

export default NewRequestUser;
