import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { optionsActions } from "../../../store/actions/optionsActions/OptionsActions";
import ImgixItem from "../imageFilter/ImageFilter";
import "./ImageFilters.css";

export default function ImageFilters() {
  const imageFilters = useSelector((s) => s.options);
  const dispatchOption = useDispatch();

  function setParam(op) {
    dispatchOption({ type: optionsActions.CHANGE_OPTION, option: op });
  }

  const flipList = ["none", "h", "v", "hv"];

  const getNext = (value) => {
    let next = "error";
    const nextIndex = flipList.findIndex((e) => e === value) + 1;
    const len = flipList.length;
    next = flipList[nextIndex % len];
    return next;
  };

  const getValue = (value, type) => {
    const types = {
      NEXT: getNext(value),
      NEW: value,
      OPOSITE: !value,
    };
    return types[type];
  };

  function changeImageFilters(p) {
    setParam({ ...p, value: getValue(p.value, p.changeType) });
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
