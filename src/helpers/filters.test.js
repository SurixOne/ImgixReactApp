import { CHANGE_TYPES } from "../constants/constants";
import { getFilterValue } from "./filters";

it("Should return filter value", () => {
  const value = getFilterValue("h", CHANGE_TYPES.NEXT);
  expect(value).toEqual("v");
});
