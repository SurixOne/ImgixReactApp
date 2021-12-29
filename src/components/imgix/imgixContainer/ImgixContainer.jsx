import React, { useState } from "react";
import ImgixImage from "../imgixImage/ImgixImage";
import ImgixItems from "../imgixItems/ImgixItems";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./ImgixContainer.css";
import ImgixSlicker from "../imgixSlicker/ImgixSlicker";
import { buildURL } from "react-imgix";
import { useSelector } from "react-redux";

export default function ImgixContainer() {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState(
    "https://assets.imgix.net/unsplash/motorbike.jpg"
  );
  const params = useSelector((s) => s.options);
  const [open, setOpen] = React.useState(false);

  function handleUrlRequest() {
    let newUrl = buildURL(url, { ...params });
    navigator.clipboard.writeText(newUrl);
    setOpen(true);
  }
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message='Copied URL to clipboard!'
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity='success'>
          copied URL to clipboard!
        </Alert>
      </Snackbar>
      <span className='copy-icon'>
        <div onClick={() => handleUrlRequest()}>
          <FileCopyIcon
            style={{
              height: "100px",
            }}
            sx={{
              fontSize: 64,
              color: "rgb(167, 255, 236)",
            }}
          />
        </div>
      </span>
      <div className='imgix-container'>
        <div className='imgix-content'>
          <ImgixItems />
        </div>
        <div className='imgix-content'>
          <ImgixImage url={url} />
          <ImgixSlicker urls={urls} setUrl={setUrl} />
        </div>
      </div>
    </div>
  );
}
