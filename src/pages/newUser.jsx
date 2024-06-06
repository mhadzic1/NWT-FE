import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
const NewUser = () => {
  const [active, setActive] = useState();

  const handleChange = (event) => {
    setActive(event.target.value);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl">New User</h2>
      <form action="" className="flex flex-wrap gap-2 mx-auto my-5">
        <TextField
          className="flex-[0_0_49%]"
          label="User Name"
          variant="outlined"
        />
        <TextField
          className="flex-[0_0_49%]"
          label="Full Name"
          variant="outlined"
        />
        <TextField
          className="flex-[0_0_49%]"
          label="Email"
          variant="outlined"
        />
        <TextField
          className="flex-[0_0_49%]"
          label="Password"
          variant="outlined"
        />
        <TextField
          className="flex-[0_0_49%]"
          label="Phone"
          variant="outlined"
        />
        <TextField
          className="flex-[0_0_49%]"
          label="Address"
          variant="outlined"
        />
        <FormControl className="flex-[0_0_49%]">
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl className="flex-[0_0_49%]">
          <InputLabel id="demo-simple-select-label">Active</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={active}
            label="Active"
            onChange={handleChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </form>
      <button className="py-2 px-4 bg-purple-600 rounded-md text-white font-bold">
        Create
      </button>
    </div>
  );
};

export default NewUser;
