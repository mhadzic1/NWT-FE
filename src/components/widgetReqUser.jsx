import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRequestByUserId } from "../api/requests/requestsAPI";
import { jwtDecode } from 'jwt-decode';
import { deleteUserRequest } from "../api/requests/requestsAPI";

const Requests = () => {
  const [data, setData] = useState([]);

  const deleteRequest = (id) => {
    console.log("Deleting request with id: ", id);
    deleteUserRequest(id);
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    let token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const id = decodedToken.userId;

    getRequestByUserId(id)
      .then(response => {
        console.log(response);
        setData(response.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          { params.row.status }
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          <b>{ params.row.opis }</b>
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          { params.row.kreirano }
        </div>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2 items-center">
          { params.row.prioritet }
        </div>
      ),
    },
    {
      field: "statusDetails",
      headerName: "Status Details",
      width: 300,
      renderCell: (params) => (
        <div className="flex gap-2 items-center" style={ { overflow: 'auto' } }>
          { params.row.detaljnijiStatus }
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="flex gap-2">
          {/* <Link to={ "/singleRequestUser/" + params.row.id }>
            <button className="bg-green-500 font-bold text-white px-3 py-1 rounded-md">
              Edit <Edit fontSize="small" />
            </button>
          </Link> */}
          <button
            onClick={ () => deleteRequest(params.row.id) }
            className="bg-red-500 font-bold text-white px-3 py-1 rounded-md"
          >
            Delete <Delete fontSize="small" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="reqByUser">
        { data && data.length > 0 ? (
          <>
            <h1 className="naslovReqUser">Requests by User: </h1>
            <button className="LoginButton buttonNewRequest" onClick={ () => window.open("./newRequestUser") }>
              New Request
            </button>
          </>
        ) : (
          <p>No user data available.</p>
        ) }
      </div>

      <div className="h-[700px] shadow-lg p-6 m-2">
        <DataGrid
          rows={ data }
          columns={ columns }
          pageSize={ 10 }
          rowsPerPageOptions={ [10] }
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default Requests;
