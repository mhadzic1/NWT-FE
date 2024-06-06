import React, { useState } from 'react';
import { saveNewRequest } from '../api/requests/requestsAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../newRequestUser.css';
import GradeModal from '../components/GradeModal';
import { createSLA } from '../api/sla/slaAPI';
import SuccessModal from '../components/SuccessModal';

const NewRequestUser = () => {
    const [priority, setPriority] = useState('Low');
    const [requestDescription, setRequestDescription] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showGradeModal, setShowGradeModal] = useState(false);
    const navigate = useNavigate();

    const saveRequest = async () => {
        const newRequest = {
            opis: requestDescription,
            status: 'PENDING',  // Assuming a default status
            kreirano: new Date().toISOString(),
            prioritet: priority
        };

        const success = await saveNewRequest(newRequest);
        if (success) {
            setShowSuccessModal(true); // Show success modal
            setShowGradeModal(true);
        }
    };

    const handleSaveSLA = async (rating, comment) => {
        const newSLA = {
            datumSklapanja: new Date().toISOString(),
            datumIsteka: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
            tipUsluge: "Change Request",
            vrijednostNivoaUsluge: "10",
            ocjena: rating,
            komentar: comment
        };
        console.log("SLA Object to be saved:", newSLA);

        const success = await createSLA(newSLA);

        if (success) {
            setShowGradeModal(true);
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
            { showSuccessModal && (
                <SuccessModal onClose={ () => setShowSuccessModal(false) }
                              onSave={handleSaveSLA}
                />
            ) }
            {showGradeModal && (
                <GradeModal onClose={() => setShowGradeModal(false)}
                            onSave={handleSaveSLA}
                />
            )}
        </div>
    );
};

export default NewRequestUser;
