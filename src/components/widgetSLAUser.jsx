import { useEffect, useState } from "react";
import {getServiceLevelAgreements, getServiceLevelAgreementsByUserId} from "../api/sla/slaAPI";

const WidgetSLA = () => {
    const [data, setData] = useState(null);
    const [averageGrade, setAverageGrade] = useState(0);
    const [numberOfPeople, setNumberOfPeople] = useState(0);
    const [changeRequestSummary, setChangeRequestSummary] = useState({ avg: 0, count: 0 });
    const [incidentManagementSummary, setIncidentManagementSummary] = useState({ avg: 0, count: 0 });
    const [serviceRequestSummary, setServiceRequestSummary] = useState({ avg: 0, count: 0 });

    useEffect(() => {
        getServiceLevelAgreementsByUserId({})
            .then(response => {
                const slaData = response.data.data;
                setData(slaData);

                const totalGrade = slaData.reduce((sum, item) => sum + item.ocjena, 0);
                const avgGrade = slaData.length > 0 ? totalGrade / slaData.length : 0;
                setAverageGrade(avgGrade.toFixed(2)); // Rounded to 2 decimal places
                setNumberOfPeople(slaData.length);

                // Calculate summary for "Change Request"
                const changeRequests = slaData.filter(item => item.tipUsluge === "Change Request");
                const totalChangeRequestGrade = changeRequests.reduce((sum, item) => sum + item.ocjena, 0);
                const avgChangeRequestGrade = changeRequests.length > 0 ? totalChangeRequestGrade / changeRequests.length : 0;
                setChangeRequestSummary({ avg: avgChangeRequestGrade.toFixed(2), count: changeRequests.length });

                // Calculate summary for "Incident Management"
                const incidentManagements = slaData.filter(item => item.tipUsluge === "Incident Management");
                const totalIncidentManagementGrade = incidentManagements.reduce((sum, item) => sum + item.ocjena, 0);
                const avgIncidentManagementGrade = incidentManagements.length > 0 ? totalIncidentManagementGrade / incidentManagements.length : 0;
                setIncidentManagementSummary({ avg: avgIncidentManagementGrade.toFixed(2), count: incidentManagements.length });

                // Calculate summary for "Service Request"
                const serviceRequests = slaData.filter(item => item.tipUsluge === "Service Request");
                const totalServiceRequestGrade = serviceRequests.reduce((sum, item) => sum + item.ocjena, 0);
                const avgServiceRequestGrade = serviceRequests.length > 0 ? totalServiceRequestGrade / serviceRequests.length : 0;
                setServiceRequestSummary({ avg: avgServiceRequestGrade.toFixed(2), count: serviceRequests.length });
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">Service Level Agreements</h3>
            <table className="table-fixed w-full text-center border-separate border-spacing-y-3">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Type of Service</th>
                    <th>Grade</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((item) => (
                    <tr key={item.id}>
                        <td>{new Date(item.datumSklapanja).toLocaleDateString()}</td>
                        <td>{item.tipUsluge}</td>
                        <td>{item.ocjena}</td>
                        <td>{item.komentar}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {data && data.length > 0 && (
                <div className="mt-4 p-4 bg-blue-100 rounded shadow-md border border-blue-300">
                    <h4 className="font-bold text-lg text-blue-700">Overall Summary</h4>
                    <p className="mt-2 text-blue-700">Average grade: <span className="font-bold">{averageGrade}</span></p>
                    <p className="text-blue-700">Number of submits: <span className="font-bold">{numberOfPeople}</span></p>
                </div>
            )}
        </div>
    );
};

export default WidgetSLA;
