import { optionsActions } from "../actions/optionsActions/OptionsActions";

export const CHANGE_TYPES = {
  NEXT: "NEXT",
  NEW: "NEW",
  OPOSITE: "OPOSITE",
};

const initialState = {
  changes: 0,
  futureChanges: 0,
  pastOptions: [],
  options: {
    flip: { value: "none", changeType: CHANGE_TYPES.NEXT, label: "Flip" },
    orient: {
      value: "none",
      changeType: CHANGE_TYPES.NEW,
      label: "Orientation",
    },
    invert: {
      value: false,
      changeType: CHANGE_TYPES.OPOSITE,
      label: "Invert",
    },
    rot: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Rotation" },
    bri: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Brightness" },
    exp: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Exposure" },
    con: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Contrast" },
    high: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Highlight" },
    gam: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Gamma" },
    hue: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Hue Shift" },
    sat: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Saturation" },
    shad: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Shadows" },
    sharp: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Sharpen" },
    usm: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Unsharp" },
    vib: { value: 0, changeType: CHANGE_TYPES.NEW, label: "Vibrance" },
    usmrad: { value: 30, changeType: CHANGE_TYPES.NEW, label: "USM Rad" },
  },
  futureOptions: [],
};

export default function optionsReducer(state = initialState, action) {
  switch (action.type) {
    case optionsActions.CHANGE_OPTION:
      if (state.changes > 9) state.pastOptions.shift();
      const op = action.option;
      return Object.assign({}, state, {
        changes: state.pastOptions.length + 1,
        futureChanges: 0,
        pastOptions: [...state.pastOptions, state.options],
        options: {
          ...state.options,
          [op.name]: { ...state.options[op.name], value: op.value },
        },
        futureOptions: [],
      });
    case optionsActions.UNDO_CHANGE:
      const pastOption = state.pastOptions[state.pastOptions.length - 1];
      state.pastOptions.pop();
      if (state.futureChanges > 9) state.futureOptions.shift();
      return Object.assign({}, state, {
        changes: state.pastOptions.length,
        futureChanges: state.futureOptions.length + 1,
        options: pastOption,
        futureOptions: [...state.futureOptions, state.options],
      });
    case optionsActions.REDO_CHANGE:
      if (state.changes > 9) state.pastOptions.shift();
      const futureOption = state.futureOptions[state.futureOptions.length - 1];
      state.futureOptions.pop();
      return Object.assign({}, state, {
        changes: state.pastOptions.length + 1,
        futureChanges: state.futureOptions.length,
        pastOptions: [...state.pastOptions, state.options],
        options: futureOption,
      });
    default:
      return state;
  }
}
