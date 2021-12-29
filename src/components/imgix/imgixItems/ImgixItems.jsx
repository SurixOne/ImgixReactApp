import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { optionsActions } from "../../../store/actions/optionsActions/OptionsActions";
import ImgixItem from "../imgixItem/ImgixItem";
import "./ImgixItems.css";

export default function ImgixItems() {
  var labels = {};

  const params = useSelector((s) => s.options);
  const dispatchOption = useDispatch();
  function setParam(op) {
    dispatchOption({ type: optionsActions.CHANGE_OPTION, option: op });
  }
  function changeParams(p) {
    let val;
    switch (p.name) {
      case "flip":
        switch (p.value) {
          case "none":
            val = "h";
            break;
          case "h":
            val = "v";
            break;
          case "v":
            val = "hv";
            break;
          case "hv":
            val = "none";
            break;
          default:
            break;
        }
        setParam({ ...p, value: val });
        break;
      case "orient":
      case "rot":
      case "bri":
      case "exp":
      case "con":
      case "high":
      case "gam":
      case "hue":
      case "sat":
      case "shad":
      case "sharp":
      case "usm":
      case "usmrad":
      case "vib":
        if (p.value !== params[p.name]) {
          setParam({ ...p, value: p.value });
        }
        break;
      case "invert":
        setParam({ ...p, value: !p.value });
        break;
      default:
        break;
    }
  }

  Object.keys(params).forEach((i) => {
    let text = "";
    switch (i) {
      case "flip":
        text = "Flip";
        break;
      case "orient":
        text = "Orientation";
        break;
      case "rot":
        text = "Rotation";
        break;
      case "bri":
        text = "Brightness";
        break;
      case "exp":
        text = "Exposure";
        break;
      case "con":
        text = "Contrast";
        break;
      case "high":
        text = "Highlight";
        break;
      case "gam":
        text = "Gamma";
        break;
      case "hue":
        text = "Hue Shift";
        break;
      case "invert":
        text = "Invert";
        break;
      case "sat":
        text = "Saturation";
        break;
      case "shad":
        text = "Shadows";
        break;
      case "sharp":
        text = "Sharpen";
        break;
      case "usm":
        text = "Unsharp";
        break;
      case "usmrad":
        text = "USM Rad";
        break;
      case "vib":
        text = "Vibrance";
        break;
      default:
        break;
    }
    labels[i] = text;
  });
  return (
    <div className='imgix-items'>
      <h1 className='items-title'>
        <img
          src='https://assets.imgix.net/presskit/imgix-presskit.pdf?page=4&fm=png&w=120'
          alt='imgix'
        />
        Items
      </h1>
      <div className='items'>
        {Object.keys(params).map((i) => {
          return (
            <ImgixItem
              className='imgix-item'
              changeParams={changeParams}
              item={{ name: i, value: params[i] }}
              labels={labels}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}
