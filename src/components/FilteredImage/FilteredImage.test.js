import { render, screen } from "@testing-library/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { compose, createStore } from "redux";
import useImageFilters from "../../hooks/useImageFilters";
import optionsReducer from "../../store/reducers/optionsReducer";
import FilteredImage from "./FilteredImage";
import Imgix from "react-imgix";

const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const url = "https://assets.imgix.net/unsplash/motorbike.jpg";
const store = createStore(optionsReducer, enhancers);
test("renders filtered image", () => {
  render(
    <Provider
      store={store}
      useDispatch={useDispatch}
      useSelector={useSelector}
      useImageFilters={useImageFilters}
    >
      <FilteredImage url={url} />
    </Provider>
  );
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
});
