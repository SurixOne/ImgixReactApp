import React, { useState } from "react";
import "./ImgixItem.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
export default function ImgixItem({ item, changeParams }) {
  const [val, setVal] = useState("none");
  function handleChange(e) {
    setVal(e.target.value);
    changeParams({ name: item.name, value: e.target.value });
  }
  function valuetext(e, v) {
    changeParams({ name: item.name, value: v });
  }
  return (
    <div onClick={() => changeParams(item)}>
      {item.name !== "rot" &&
      item.name !== "bri" &&
      item.name !== "exp" &&
      item.name !== "con" &&
      item.name !== "high" &&
      item.name !== "gam" &&
      item.name !== "sat" &&
      item.name !== "shad" &&
      item.name !== "sharp" &&
      item.name !== "hue" &&
      item.name !== "usm" &&
      item.name !== "usmrad" &&
      item.name !== "vib" ? (
        item.name !== "orient" ? (
          <h1 className="imgix-item">{item.name + ": " + item.value}</h1>
        ) : (
          <div className="selector-cont">
            <FormControl fullWidth variant="filled">
              <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
                {item.comp}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="orient-selector"
                value={val}
                label="Orient"
                onChange={(e) => handleChange(e)}
              >
                <MenuItem key={"none"} value={"none"}>
                  None
                </MenuItem>
                <MenuItem key={1} value={1}>
                  1
                </MenuItem>
                <MenuItem key={2} value={2}>
                  2
                </MenuItem>
                <MenuItem key={3} value={3}>
                  3
                </MenuItem>
                <MenuItem key={4} value={4}>
                  4
                </MenuItem>
                <MenuItem key={5} value={5}>
                  5
                </MenuItem>
                <MenuItem key={6} value={6}>
                  6
                </MenuItem>
                <MenuItem key={7} value={7}>
                  7
                </MenuItem>
                <MenuItem key={8} value={8}>
                  8
                </MenuItem>
                <MenuItem key={90} value={90}>
                  90
                </MenuItem>
                <MenuItem key={180} value={180}>
                  180
                </MenuItem>
                <MenuItem key={270} value={270}>
                  270
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        )
      ) : (
        <div className="slider-cont">
          <span className="slider-txt">
            {item.comp}
            :&nbsp;
          </span>
          <Slider
            id="rot-slider"
            aria-label="Temperature"
            defaultValue={item.name === "usmrad" ? 30 : 0}
            onChangeCommitted={valuetext}
            valueLabelDisplay="auto"
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
    </div>
  );
}
