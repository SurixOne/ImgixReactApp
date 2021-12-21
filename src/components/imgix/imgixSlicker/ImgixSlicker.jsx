import React from "react";
import Imgix from "react-imgix";
import Slider from "react-slick";
import "./ImgixSlicker.css";

export default function ImgixSlicker({ urls, setUrl }) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
  };
  return (
    <div className="slicker-container">
      <Slider className="img" {...settings}>
        {urls.map((u) => (
          <div key={u.url} className="img" onClick={() => setUrl(u.url)}>
            <Imgix
              src={u.url}
              sizes="calc(100vw / 15 * 2)"
              style={{ maxHeight: "calc((100vw / 15 * 2))" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
