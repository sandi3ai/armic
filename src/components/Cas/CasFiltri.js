import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { brown } from "@mui/material/colors";

const CasFiltri = ({ checkboxStates, onCheckboxChange }) => {
  return (
    <div>
      <FormGroup row={true}>
        <FormControlLabel
          control={
            <Checkbox
              color="success"
              checked={checkboxStates.approved}
              onChange={onCheckboxChange}
              name="approved"
            />
          }
          label="Odobreni"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="warning"
              checked={checkboxStates.review}
              onChange={onCheckboxChange}
              name="review"
            />
          }
          label="Pregled"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="error"
              checked={checkboxStates.denied}
              onChange={onCheckboxChange}
              name="denied"
            />
          }
          label="Zavrnjeni"
        />
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={checkboxStates.inProgress}
              onChange={onCheckboxChange}
              name="inProgress"
            />
          }
          label="V teku"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxStates.inLunch}
              onChange={onCheckboxChange}
              name="inLunch"
              icon={<LunchDiningOutlinedIcon />}
              checkedIcon={<LunchDiningIcon />}
              sx={{
                color: brown[400],
                "&.Mui-checked": {
                  color: brown[500],
                },
              }}
            />
          }
          label="Malice"
        />
      </FormGroup>
    </div>
  );
};

export default CasFiltri;
