import React, { useEffect, useState } from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./FiltersPage.css";
import ImgixSlicker from "../messageSlicker/MessageSlicker";
import { buildURL } from "react-imgix";
import { useSelector } from "react-redux";
import ImageFilters from "../ImageFilters/ImageFilters";
import FilteredImage from "../FilteredImage/FilteredImage";

export default function FiltersPage() {
  const [urls, setUrls] = useState([]);
  const [url, setUrl] = useState(
    "https://assets.imgix.net/unsplash/motorbike.jpg"
  );
  const params = useSelector((s) => s.options);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const copyUrlToClipboard = () => {
    const newUrl = generateUrl();
    navigator.clipboard.writeText(newUrl);
    setIsMessageVisible(true);
  };

  const generateUrl = () => {
    return buildURL(
      url,
      Object.fromEntries(
        Object.entries(params).map(([key, filterProperties]) => [
          key,
          filterProperties.value,
        ])
      )
    );
  };

  const getImages = async () => {
    try {
      const result = await fetch(
        `https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json`
      );
      const data = await result.json();
      return data;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    getImages().then((result) => {
      setUrls(result);
    });
  }, []);
  return (
    <div>
      <Snackbar
        open={isMessageVisible}
        autoHideDuration={6000}
        message='Copied URL to clipboard!'
        onClose={() => setIsMessageVisible(false)}
      >
        <Alert onClose={() => setIsMessageVisible(false)} severity='success'>
          copied URL to clipboard!
        </Alert>
      </Snackbar>
      <span className='copy-icon'>
        <div onClick={() => copyUrlToClipboard()}>
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
          <ImageFilters />
        </div>
        <div className='imgix-content'>
          <FilteredImage url={url} />
          <ImgixSlicker urls={urls} setUrl={setUrl} />
        </div>
      </div>
    </div>
  );
}
