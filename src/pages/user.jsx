import { Avatar, TextField } from "@mui/material";
import {
  Person,
  CalendarMonth,
  PhoneAndroid,
  MailOutline,
  LocationSearching,
  Upload,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const User = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-2xl ">Edit User</h2>
        <Link to="/newUser">
          <button className="py-2 px-4 bg-purple-600 rounded-md text-white font-bold">
            Create
          </button>
        </Link>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 shadow-xl p-5">
          <div className="flex gap-5 items-center">
            <Avatar
              sx={{ width: 60, height: 60 }}
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            />
            <div>
              <h4 className="font-bold">anna Keller</h4>
              <h4 className="font-light">Patient</h4>
            </div>
          </div>
          <h3 className="text-gray-500 text-lg my-4">Account details</h3>
          <div className="my-4 text-gray-700 flex gap-2">
            <Person />
            <span>anna_Keller99</span>
          </div>
          <div className="my-4 text-gray-700 flex gap-2">
            <CalendarMonth />
            <span>12.12.1990</span>
          </div>
          <h3 className="text-gray-500 text-lg my-4">Contact details</h3>
          <div className="my-4 text-gray-700 flex gap-2">
            <PhoneAndroid />
            <span>+01005060897</span>
          </div>
          <div className="my-4 text-gray-700 flex gap-2">
            <MailOutline />
            <span>annaKeller@gmail.com</span>
          </div>
          <div className="my-4 text-gray-700 flex gap-2">
            <LocationSearching />
            <span>New york|USA</span>
          </div>
        </div>
        <div className="flex-[2_2_0%] shadow-xl p-5">
          <h2 className="font-bold text-2xl mb-5">Edit</h2>
          <div className="flex justify-between">
            <form action="" className="flex flex-col gap-4">
              <TextField
                id="standard-basic"
                label="Username"
                variant="standard"
                defaultValue="anna_Keller99"
              />
              <TextField
                id="standard-basic"
                label="Fullname"
                variant="standard"
                defaultValue="anna Keller"
              />
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                defaultValue="annaKeller@gmail.com"
              />
              <TextField
                id="standard-basic"
                label="Phone"
                variant="standard"
                defaultValue="+01005060897"
              />
              <TextField
                id="standard-basic"
                label="Address"
                variant="standard"
                defaultValue="New york|USA"
              />
            </form>

            <div className="flex flex-col justify-between">
              <div className="flex gap-2">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="user"
                  className="w-24 h-24 rounded-md"
                />
                <button>
                  <Upload />
                </button>
              </div>
              <button className="py-2 px-4 bg-purple-600 rounded-md text-white font-bold">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
