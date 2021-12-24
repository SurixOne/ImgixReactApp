import React from "react";
import { useState } from "react";
import Imgix from "react-imgix";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./ImgixImage.css";

export default function ImgixImage({ url, params2 }) {
  return (
    <div className="image-layer">
      <h1 style={{ position: "absolute", zIndex: 100 }}></h1>
      <div className="image-container">
        <Imgix src={url} sizes="calc(100vw * 2 / 3)" imgixParams={params2} />
      </div>
    </div>
  );
}
