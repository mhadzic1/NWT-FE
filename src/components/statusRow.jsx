import React, { useState } from 'react';
import { Avatar } from "@mui/material";
import { updateRequestStatus, updateRequestPriority, updateStatusDetails, raiseRequestToSuperAdmin } from '../api/requests/requestsAPI';
import CircularProgress from '@mui/material/CircularProgress';

const StatusRow = ({ id, avatarSrc, name, date, task, initialStatus, initialPriority, initialRaise, initialStatusDetails }) => {
    const [status, setStatus] = useState(initialStatus);
    const [priority, setPriority] = useState(initialPriority);
    const [raise, setRaise] = useState(initialRaise);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [loadingPriority, setLoadingPriority] = useState(false);
    const [loadingRaise, setLoadingRaise] = useState(false);
    const [loadingStatusDetails, setLoadingStatusDetails] = useState(false);
    const [showStatusChange, setShowStatusChange] = useState(false);
    const [statusDetails, setStatusDetails] = useState(initialStatusDetails);
    const [savedStatusDetails, setSavedStatusDetails] = useState(initialStatusDetails);

    const handleStatusChange = (newStatus) => {
        setLoadingStatus(true);

        updateRequestStatus(id, name, newStatus)
            .then(() => {
                setStatus(newStatus);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoadingStatus(false);
            });
        setShowStatusChange(false);
    };

    const handlePriorityChange = (event) => {
        const newPriority = event.target.value;
        setLoadingPriority(true);
        updateRequestPriority(id, newPriority)
            .then(() => {
                setPriority(newPriority);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoadingPriority(false);
            });
    };

    const handleRaiseChange = (event) => {
        let newRaise = event.target.value;
        console.log(newRaise);

        setLoadingRaise(true);
        raiseRequestToSuperAdmin(id, newRaise)
            .then(() => {
                setRaise(newRaise);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoadingRaise(false);
            });
        console.log(newRaise);
    };

    const handleStatusDetailsBlurAPI = () => {
        setStatusDetails(savedStatusDetails);
    };

    const handleStatusDetailsSubmitAPI = (newStatusDetails) => {
        setSavedStatusDetails(newStatusDetails);
        setStatusDetails(newStatusDetails);
        setLoadingStatusDetails(true);
        updateStatusDetails(id, newStatusDetails)
            .then(() => {
                setStatusDetails(newStatusDetails);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoadingStatusDetails(false);
            });
    };

    const handleStatusDetailsChange = (event) => {
        setStatusDetails(event.target.value);
    };

    //console.log(initialRaise);
    return (
        <tr>
            <td className="flex gap-2 items-center justify-center">
                <Avatar alt={ name } src={ avatarSrc } />
                <span>{ name }</span>
            </td>
            <td>{ date }</td>
            <td>{ task }</td>
            <td
                className={ `bg-${status === 'APPROVED' ? 'green' : status === 'REJECTED' ? 'red' : 'blue'}-200 text-${status === 'APPROVED' ? 'green' : status === 'REJECTED' ? 'red' : 'blue'}-600 rounded-md` }
                onClick={ () => setShowStatusChange(prev => !prev) }

            >
                { loadingStatus ? (
                    <CircularProgress size={ 24 } />
                ) : (
                    <React.Fragment>
                        { status }
                        { showStatusChange && (
                            <div className="status-change-screen" onClick={ (event) => event.stopPropagation() } style={ {
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1000,
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
                            } }>
                                <button className="text-green-600 rounded-md StatusButton" style={ { marginRight: '20px', backgroundColor: '#D3D3D3' } } onClick={ (event) => { event.stopPropagation(); handleStatusChange('APPROVED') } }>APPROVED</button>
                                <button className="text-red-600 rounded-md StatusButton " style={ { marginRight: '20px', marginTop: '20px', backgroundColor: '#D3D3D3' } } onClick={ (event) => { event.stopPropagation(); handleStatusChange('REJECTED') } }>REJECTED</button>
                                <button className="text-blue-600 rounded-md StatusButton " style={ { marginRight: '20px', marginTop: '20px', backgroundColor: '#D3D3D3' } } onClick={ (event) => { event.stopPropagation(); handleStatusChange('PENDING') } }>PENDING</button>
                            </div>
                        ) }
                    </React.Fragment>
                ) }
            </td>
            <td>
                { loadingStatusDetails ? (
                    <CircularProgress size={ 24 } />
                ) : (
                    <textarea
                        value={ statusDetails || '' }
                        onChange={ handleStatusDetailsChange }
                        onBlur={ handleStatusDetailsBlurAPI }
                        onKeyUp={ (event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                const currentStatusDetails = statusDetails;
                                handleStatusDetailsSubmitAPI(currentStatusDetails);
                            }
                        } }
                        onKeyDown={ (event) => {
                            if (event.key === 'Enter') {
                                event.preventDefault();
                            }
                        } }
                    />
                ) }
            </td>
            <td>
                { loadingRaise ? (
                    <CircularProgress size={ 24 } />
                ) : (
                    <select value={ raise } onChange={ handleRaiseChange }>
                        <option value={ false }>Regular</option>
                        <option value={ true }>Raised</option>
                    </select>
                ) }
            </td>
            <td>
                { loadingPriority ? (
                    <CircularProgress size={ 24 } />
                ) : (
                    <select value={ priority } onChange={ handlePriorityChange }>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                ) }
            </td>
        </tr>
    );
};

export default StatusRow;
