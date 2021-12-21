import React, { useState } from "react";
import ImgixAddItem from "../imgixAddItem/ImgixAddItem";
import ImgixImage from "../imgixImage/ImgixImage";
import ImgixItems from "../imgixItems/ImgixItems";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import "./ImgixContainer.css";
import ImgixSlicker from "../imgixSlicker/ImgixSlicker";
export default function ImgixContainer() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState("https://assets.imgix.net/unsplash/bear.jpg");
  const [params, setParams] = useState({
    flip: { name: "flip", comp: "Flip", value: "none" },
    orient: { name: "orient", comp: "Orientation", value: "none" },
    rot: { name: "rot", comp: "Rotation", value: 0 },
    bri: { name: "bri", comp: "Brightness", value: 0 },
    exp: { name: "exp", comp: "Exposure", value: 0 },
    con: { name: "con", comp: "Contrast", value: 0 },
    high: { name: "high", comp: "Highlight", value: 0 },
    gam: { name: "gam", comp: "Gamma", value: 0 },
    hue: { name: "hue", comp: "Hue Shift", value: 0 },
    invert: { name: "invert", comp: "Invert", value: false },
    sat: { name: "sat", comp: "Saturation", value: 0 },
    shad: { name: "shad", comp: "Shadows", value: 0 },
    sharp: { name: "sharp", comp: "Sharpen", value: 0 },
    usm: { name: "usm", comp: "Unsharp", value: 0 },
    usmrad: { name: "usmrad", comp: "USM Radius", value: 30 },
    vib: { name: "vib", comp: "Vibrance", value: 0 },
  });
  const [params2, setParams2] = useState({
    flip: "none",
    orient: "none",
    rot: 0,
    bri: 0,
    exp: 0,
    con: 0,
    high: 0,
    gam: 0,
    hue: 0,
    invert: false,
    sat: 0,
    shad: 0,
    sharp: 0,
    usm: 0,
    vib: 0,
    usmrad: 30,
  });
  React.useEffect(() => {
    fetch(
      `https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json`
    )
      .then((res) => res.json())
      .then((result) => {
        setUrls(result);
      });
  }, []);
  return (
    <div>
      <span className="add-close-icon">
        {showAddForm ? (
          <DisabledByDefaultIcon sx={{ fontSize: 100 }} />
        ) : (
          <AddBoxIcon sx={{ fontSize: 100, color: "rgb(3, 252, 182)" }} />
        )}
      </span>
      <div className="imgix-container">
        <div className="imgix-content">
          {showAddForm ? (
            <ImgixAddItem />
          ) : (
            <ImgixItems
              params={params}
              setParams={setParams}
              params2={params2}
              setParams2={setParams2}
            />
          )}
        </div>
        <div className="imgix-content">
          <ImgixImage url={url} params2={params2} />
          <ImgixSlicker urls={urls} setUrl={setUrl} />
        </div>
      </div>
    </div>
  );
}
