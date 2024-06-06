import { Link } from "react-router-dom";
import {
  Avatar,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Upload } from "@mui/icons-material";
import { useState } from "react";
const Product = () => {
  const [active, setActive] = useState();
  const [stock, setStock] = useState();
  const handleChangeActive = (event) => {
    setActive(event.target.value);
  };
  const handleChangeStock = (event) => {
    setStock(event.target.value);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-2xl ">Product</h2>
        <Link to="/newProduct">
          <button className="py-2 px-4 bg-purple-600 rounded-md text-white font-bold">
            Create
          </button>
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="shadow-xl flex-1 p-4">
          <div className="flex gap-2 items-center">
            <Avatar
              sx={{ width: 60, height: 60 }}
              src="https://images.unsplash.com/photo-1658581087930-effb5cceb6c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            ></Avatar>
            <h3 className="font-bold text-xl">Air pods</h3>
          </div>
          <ul className="mt-5">
            <li className="font-bold mb-3 capitalize flex">
              id:{" "}
              <span className="font-light text-gray-500 ml-auto text-xl">
                126
              </span>
            </li>
            <li className="font-bold mb-3 capitalize flex">
              sales:
              <span className="font-light text-gray-500 ml-auto text-xl">
                4503
              </span>
            </li>
            <li className="font-bold mb-3 capitalize flex">
              active:
              <span className="font-light text-gray-500 ml-auto text-xl">
                yes
              </span>
            </li>
            <li className="font-bold mb-3 capitalize flex">
              in stock
              <span className="font-light text-gray-500 ml-auto text-xl">
                no
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex shadow-xl p-6 mt-8 justify-between">
        <form action="" className="flex flex-col gap-4">
          <TextField
            id="standard-basic"
            label="Product name"
            variant="standard"
            defaultValue="Air pods"
          />
          <FormControl>
            <InputLabel>Active</InputLabel>
            <Select value={active} label="Active" onChange={handleChangeActive}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>In Stock</InputLabel>
            <Select value={stock} label="Stock" onChange={handleChangeStock}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </form>

        <div className="flex flex-col gap-4 justify-between">
          <div className="flex gap-2">
            <img
              src="https://images.unsplash.com/photo-1658581087930-effb5cceb6c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="product"
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
  );
};

export default Product;
