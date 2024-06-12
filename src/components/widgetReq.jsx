import { Avatar } from "@mui/material";
import StatusRow from "./statusRow";
import { useEffect, useState } from "react";
import { getRequests, getSuperAdminRequests } from "../api/requests/requestsAPI";
import { jwtDecode } from "jwt-decode";
const WidgetLG = () => {

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

    const [data, setData] = useState(null); // create state variable

    useEffect(() => {
        if (userRole === 'Admin') {
            getRequests({}) // pass your options here
                .then(response => {
                    console.log(response)
                    setData(response.data.data); // store data in state variable
                })
                .catch(error => console.error(error));
        }
        else if (userRole === 'SuperAdmin') {
            getSuperAdminRequests({}) // pass your options here
                .then(response => {
                    console.log(response)
                    setData(response.data.data); // store data in state variable
                })
                .catch(error => console.error(error));
        }

    }, []); // empty dependency array to run only once on mount


    console.log(data)


    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">Change Requests</h3>
            <table className="table-fixed w-full text-center border-separate border-spacing-y-3 ">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Room</th>
                        <th>Team</th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map((item) => (
                        <StatusRow
                            key={item.id}
                            name={item.user.username}
                            room={item.room.name}
                            team={item.team}
                        />
                    )) }
                    {/* <StatusRow
                        avatarSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        name="Susan Carol"
                        date="2 jun 2022"
                        task="Prihvatiti zahtjev"
                        initialStatus="Accepted"
                    />
                    <StatusRow
                        avatarSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        name="Susan Carol"
                        date="2 jun 2022"
                        task="Dodati customer support"
                        initialStatus="Pending"
                    />
                    <StatusRow
                        avatarSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        name="Susan Carol"
                        date="2 jun 2022"
                        task="Izmisliti beskorisni zahtjev"
                        initialStatus="Accepted"
                    />
                    <StatusRow
                        avatarSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        name="Susan Carol"
                        date="2 jun 2022"
                        task="Napraviti aplikaciju kako treba"
                        initialStatus="Declined"
                    />
                    <StatusRow
                        avatarSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        name="Susan Carol"
                        date="2 jun 2022"
                        task="Popraviti backend"
                        initialStatus="Pending"
                    /> */}
                </tbody>
            </table>
        </div>
    );
};

export default WidgetLG;
