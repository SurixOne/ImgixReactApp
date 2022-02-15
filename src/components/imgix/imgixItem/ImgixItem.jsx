import React, { useState } from "react";
import "./ImgixItem.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
export default function ImgixItem({ item, changeImageFilters }) {
  const [numVal, setNumVal] = useState(0);
  const orientOptions = ["none", 1, 2, 3, 4, 5, 6, 7, 8, 90, 180, 270];

  function handleChange(e, v = undefined) {
    changeImageFilters({ ...item, value: v ? v : e.target.value });
  }
  function handleItemClick() {
    if (item.name === "flip" || item.name === "invert")
      changeImageFilters(item);
  }
  return (
    <>
      {item.name === "flip" ||
      item.name === "orient" ||
      item.name === "invert" ? (
        item.name !== "orient" ? (
          <div
            className='orient-cont imgix-item'
            onClick={() => handleItemClick()}
          >
            <span className='slider-txt'>
              <span>{item.label}</span>
            </span>
            <h1>{item.value.toString()}</h1>
          </div>
        ) : (
          <div className='selector-cont'>
            <span className='slider-txt'>
              <span>{item.label}</span>
            </span>
            <FormControl fullWidth variant='filled'>
              <InputLabel
                id='demo-simple-select-label'
                sx={{ color: "white" }}
              ></InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='orient-selector'
                value={item.value}
                onChange={(e) => handleChange(e)}
              >
                {orientOptions.map((op) => (
                  <MenuItem key={op} value={op}>
                    {op}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )
      ) : (
        <div className='slider-cont'>
          <span className='slider-txt'>
            <span>{item.label}</span>
          </span>
          <Slider
            id='rot-slider'
            aria-label='Temperature'
            defaultValue={item.name === "usmrad" ? 30 : 0}
            onChangeCommitted={handleChange}
            onChange={(e, v) => setNumVal(v)}
            valueLabelDisplay='auto'
            value={numVal}
            step={1}
            min={
              item.name === "bri" ||
              item.name === "exp" ||
              item.name === "con" ||
              item.name === "high" ||
              item.name === "gam" ||
              item.name === "sat" ||
              item.name === "usm" ||
              item.name === "vib"
                ? -100
                : 0
            }
            max={
              item.name === "bri" ||
              item.name === "exp" ||
              item.name === "con" ||
              item.name === "gam" ||
              item.name === "sat" ||
              item.name === "shad" ||
              item.name === "sharp" ||
              item.name === "usm" ||
              item.name === "vib"
                ? 100
                : item.name === "hue"
                ? 360
                : item.name === "high"
                ? 0
                : item.name === "usmrad"
                ? 500
                : 359
            }
          />
        </div>
      )}
    </>
  );
}
