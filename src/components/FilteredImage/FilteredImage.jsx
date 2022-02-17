import React from "react";
import Imgix from "react-imgix";
import "./FilteredImage.css";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useDispatch, useSelector } from "react-redux";
import { optionsActions } from "../../../store/actions/optionsActions/OptionsActions";
import useImageFilters from "../../../hooks/useImageFilters";

export default function FilteredImage({ url }) {
  const selectedChanges = useSelector((s) => s.changes);
  const selectedFutureChanges = useSelector((s) => s.futureChanges);
  const dispatchOption = useDispatch();

  const mappedImageFilters = useImageFilters();

  const undo = () => {
    if (selectedChanges > 0)
      dispatchOption({ type: optionsActions.UNDO_CHANGE });
  };
  const redo = () => {
    if (selectedFutureChanges > 0)
      dispatchOption({ type: optionsActions.REDO_CHANGE });
  };
  return (
    <div className='image-layer'>
      <div className='image-container'>
        <span
          style={{
            position: "absolute",
            width: "calc(100vw * (2 / 3) - 40px)",
            margin: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          {
            <span>
              <UndoIcon
                onClick={() => undo()}
                sx={{
                  color: "rgb(167, 255, 236)",
                  background: "rgb(20, 32, 37)",
                  borderRadius: "3px",
                  fontSize: "calc(30px + 1vw)",
                  padding: ".75vw",
                  cursor: selectedChanges > 0 ? "pointer" : "initial",
                  opacity: selectedChanges > 0 ? "0.9" : "0.5",
                }}
              />
              {selectedChanges > 0 && (
                <span
                  className='counter'
                  style={{
                    right: "calc(20px + (30px + 2.5vw) )",
                  }}
                >
                  <p>{selectedChanges}</p>
                </span>
              )}
            </span>
          }
          {
            <span>
              <RedoIcon
                onClick={() => redo()}
                sx={{
                  color: "rgb(167, 255, 236)",
                  background: "rgb(20, 32, 37)",
                  borderRadius: "3px",
                  fontSize: "calc(30px + 1vw)",
                  padding: ".75vw",
                  marginLeft: "20px",
                  cursor: selectedFutureChanges > 0 ? "pointer" : "initial",
                  opacity: selectedFutureChanges > 0 ? "0.9" : "0.5",
                }}
              />
              {selectedFutureChanges > 0 && (
                <span className='counter' style={{ right: "0" }}>
                  <p>{selectedFutureChanges}</p>
                </span>
              )}
            </span>
          }
        </span>
        <Imgix
          src={url}
          sizes='calc(100vw * 2 / 3)'
          imgixParams={mappedImageFilters}
        />
      </div>
    </div>
  );
}
