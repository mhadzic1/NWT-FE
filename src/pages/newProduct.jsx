import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
const NewProduct = () => {
  const [active, setActive] = useState();

  const handleChange = (event) => {
    setActive(event.target.value);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">New Product</h2>
      <form action="" className="flex flex-col w-96 gap-6">
        <label className="font-bold text-gray-500 mb-2">Image</label>
        <input type="file" accept="image/*" />
        <TextField label="Name" variant="standard" defaultValue="" />
        <TextField label="Stock" variant="standard" defaultValue="" />
        <FormControl>
          <InputLabel>Active</InputLabel>
          <Select value={active} label="Active" onChange={handleChange}>
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default NewProduct;
