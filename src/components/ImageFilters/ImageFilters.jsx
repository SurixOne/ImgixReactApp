import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterValue } from "../../helpers/filters";
import { optionsActions } from "../../store/actions/optionsActions/OptionsActions";
import ImgixItem from "../imageFilter/ImageFilter";
import "./ImageFilters.css";

export default function ImageFilters() {
  const imageFilters = useSelector((s) => s.options);
  const dispatchOption = useDispatch();

  function setParam(op) {
    dispatchOption({ type: optionsActions.CHANGE_OPTION, option: op });
  }

  function changeImageFilters(p) {
    setParam({ ...p, value: getFilterValue(p.value, p.changeType) });
  }
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
        {Object.keys(imageFilters).map((i) => {
          return (
            <ImgixItem
              className='imgix-item'
              changeImageFilters={changeImageFilters}
              item={{ ...imageFilters[i], name: i }}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
}
