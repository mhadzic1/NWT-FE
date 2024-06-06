import { Avatar } from "@mui/material";
const WidgetLG = () => {
    return (
        <div className="shadow-lg p-6">
            <h3 className="font-bold text-xl mb-4">Upcoming Consultations</h3>
            <table className="table-fixed w-full text-center border-separate border-spacing-y-3 ">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="flex gap-2 items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            />
                            <span>Susan Carol</span>
                        </td>
                        <td>2 jun 2022</td>
                        <td>Prihvatiti zahtjev</td>
                        <td className="bg-green-200 text-green-600 rounded-md">Approved</td>
                    </tr>
                    <tr>
                        <td className="flex gap-2 items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            />
                            <span>Susan Carol</span>
                        </td>
                        <td>2 jun 2022</td>
                        <td>Dodati customer support</td>
                        <td className="bg-blue-200 text-blue-600 rounded-md">Pending</td>
                    </tr>
                    <tr>
                        <td className="flex gap-2 items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            />
                            <span>Susan Carol</span>
                        </td>
                        <td>2 jun 2022</td>
                        <td>Izmisliti beskorisni zahtjev</td>
                        <td className="bg-green-200 text-green-600 rounded-md">Approved</td>
                    </tr>
                    <tr>
                        <td className="flex gap-2 items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            />
                            <span>Susan Carol</span>
                        </td>
                        <td>2 jun 2022</td>
                        <td>Napraviti aplikaciju kako treba</td>
                        <td className="bg-red-200 text-red-600 rounded-md">Declined</td>
                    </tr>
                    <tr>
                        <td className="flex gap-2 items-center justify-center">
                            <Avatar
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            />
                            <span>Susan Carol</span>
                        </td>
                        <td>2 jun 2022</td>
                        <td>Popraviti backend</td>
                        <td className="bg-blue-200 text-blue-600 rounded-md">Pending</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default WidgetLG;
