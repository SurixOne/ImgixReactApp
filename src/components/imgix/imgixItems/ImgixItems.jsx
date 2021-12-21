import React from "react";
import ImgixItem from "../imgixItem/ImgixItem";

import "./ImgixItems.css";

export default function ImgixItems({ params, setParams, params2, setParams2 }) {
  function changeParams(p) {
    console.log("params to change", p);
    switch (p.name) {
      case "flip":
        switch (p.value) {
          case "none":
            let param = params[p.name];
            param.value = "h";
            params[p.name].value = "h";
            setParams({ ...params });
            params2.flip = "h";
            setParams2({ ...params2 });
            break;
          case "h":
            params[p.name].value = "v";
            setParams({ ...params });
            params2.flip = "v";
            setParams2({ ...params2 });
            break;
          case "v":
            params[p.name].value = "hv";
            setParams({ ...params });
            params2.flip = "hv";
            setParams2({ ...params2 });
            break;
          case "hv":
            params[p.name].value = "none";
            setParams({ ...params });
            params2.flip = "none";
            setParams2({ ...params2 });
            break;
          default:
            break;
        }
        break;

      case "orient":
        params[p.name].value = p.value;
        setParams({ ...params });
        params2.orient = p.value;
        setParams2({ ...params2 });
        break;

      case "rot":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.rot = p.value;
          setParams2({ ...params2 });
        }
        break;

      case "bri":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.bri = p.value;
          setParams2({ ...params2 });
        }
        break;

      case "exp":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.exp = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "con":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.con = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "high":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.high = p.value;
          setParams2({ ...params2 });
        }
        break;

      case "gam":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.gam = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "hue":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.hue = p.value;
          setParams2({ ...params2 });
        }
        break;

      case "invert":
        console.log(p.value);
        params[p.name].value = !params[p.name].value;
        setParams({ ...params });
        params2.invert = !params2.invert;
        setParams2({ ...params2 });
        break;

      case "sat":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.sat = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "shad":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.shad = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "sharp":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.sharp = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "usm":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.usm = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "usmrad":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.vib = p.value;
          setParams2({ ...params2 });
        }
        break;
      case "vib":
        if (p.value !== params[p.name].value) {
          params[p.name].value = p.value;
          setParams({ ...params });
          params2.vib = p.value;
          setParams2({ ...params2 });
        }
        break;

      default:
        break;
    }
  }

  return (
    <div className="imgix-items">
      <h1 className="items-title">
        <img src="https://assets.imgix.net/presskit/imgix-presskit.pdf?page=4&fm=png&w=120" />
        Items
      </h1>
      <div className="items">
        {Object.keys(params).map((i) => {
          return (
            <ImgixItem
              className="imgix-item"
              changeParams={changeParams}
              item={params[i]}
              params={params}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}
