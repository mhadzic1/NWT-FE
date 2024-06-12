import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import { getAllUsers } from "../api/user/userAPI";
import { Button } from "@mui/material";
import AddUser from "../components/AddUser";

const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setData(users);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => (
          <div className="flex gap-2 items-center">
            <Avatar alt="User Avatar" src={params.row.avatar} />
            {params.row.username}
          </div>
      ),
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
          <div className="flex gap-2">
            <Link to={`/user/${params.row.id}`}>
              <button className="bg-green-500 font-bold text-white px-3 py-1 rounded-md">
                Edit <Edit fontSize="small" />
              </button>
            </Link>
            <button
                onClick={() => deleteUser(params.row.id)}
                className="bg-red-500 font-bold text-white px-3 py-1 rounded-md"
            >
              Delete <Delete fontSize="small" />
            </button>
          </div>
      ),
    },
  ];

  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
      <>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Users</h1>
          <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300"
              onClick={handleOpenAddUserModal}
          >
            Add New User
          </button>
        </div>
        <div className="h-[700px] shadow-lg p-6 m-2">
          <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
          />
        </div>
        <AddUser open={openAddUserModal} onClose={handleCloseAddUserModal}/>
      </>
  );
};

export default Users;
