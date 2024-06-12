import { useEffect, useState } from "react";
import { getLogs } from "../api/logs/logsAPI";

const WidgetLogs = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        getLogs({})
            .then(response => {
                console.log(response);
                const slaData = response.data.data;
                setData(slaData);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">Logs</h3>
            <table className="table-fixed w-full text-center border-separate border-spacing-y-3">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Description</th>
                    <th>Entry Type</th>
                    <th>Room Id</th>
                    <th>Timestamp</th>
                    <th>User Id</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.description}</td>
                        <td>{item.entryType}</td>
                        <td>{item.roomId}</td>
                        <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                        <td>{item.user.username}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WidgetLogs;
