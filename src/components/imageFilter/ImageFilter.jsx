import React, { useState } from "react";
import "./ImageFilter.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { FILTER_TYPES } from "../../constants/constants";
export default function ImageFilter({ item, changeImageFilters }) {
  const [numVal, setNumVal] = useState(0);
  const orientOptions = ["none", 1, 2, 3, 4, 5, 6, 7, 8, 90, 180, 270];
  const filtersRangedFromMinus100 = [
    FILTER_TYPES.BRIGHTNESS,
    FILTER_TYPES.EXPOSURE,
    FILTER_TYPES.CONTRAST,
    FILTER_TYPES.GAMMA,
    FILTER_TYPES.SATURATION,
    FILTER_TYPES.UNSHARP_MASK,
    FILTER_TYPES.VIBRANCE,
    FILTER_TYPES.HIGHLIGHT,
  ];

  const clickableFilters = [
    FILTER_TYPES.FLIP,
    FILTER_TYPES.ORIENTATION,
    FILTER_TYPES.INVERT,
  ];

  const getMaxValue = (filter) => {
    const rangedFilters = {
      hue: 360,
      high: 0,
      usmrad: 500,
      rot: 359,
      default: 100,
    };
    const max = rangedFilters[filter];
    return isNaN(max) ? rangedFilters["default"] : max;
  };
  const maxValue = getMaxValue(item.name);

  function handleChange(e, v = undefined) {
    changeImageFilters({ ...item, value: v ? v : e.target.value });
  }
  function handleItemClick() {
    if (item.name === FILTER_TYPES.FLIP || item.name === FILTER_TYPES.INVERT)
      changeImageFilters(item);
  }
  return (
    <>
      {clickableFilters.includes(item.name) ? (
        item.name !== FILTER_TYPES.ORIENT ? (
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
            defaultValue={
              item.name === FILTER_TYPES.UNSHARP_MASK_RADIUS ? 30 : 0
            }
            onChangeCommitted={handleChange}
            onChange={(e, v) => setNumVal(v)}
            valueLabelDisplay='auto'
            value={numVal}
            step={1}
            min={filtersRangedFromMinus100.includes(item.name) ? -100 : 0}
            max={maxValue}
          />
        </div>
      )}
    </>
  );
}
