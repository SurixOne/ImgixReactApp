import { CHANGE_TYPES, FILTER_TYPES } from "../../constants/constants";
import { optionsActions } from "../actions/optionsActions/OptionsActions";

const initialState = {
  changes: 0,
  futureChanges: 0,
  pastOptions: [],
  options: {
    [FILTER_TYPES.FLIP]: {
      value: "none",
      changeType: CHANGE_TYPES.NEXT,
      label: "Flip",
    },
    [FILTER_TYPES.ORIENTATION]: {
      value: "none",
      changeType: CHANGE_TYPES.NEW,
      label: "Orientation",
    },
    [FILTER_TYPES.INVERT]: {
      value: false,
      changeType: CHANGE_TYPES.OPOSITE,
      label: "Invert",
    },
    [FILTER_TYPES.ROTATION]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Rotation",
    },
    [FILTER_TYPES.BRIGHTNESS]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Brightness",
    },
    [FILTER_TYPES.EXPOSURE]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Exposure",
    },
    [FILTER_TYPES.CONTRAST]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Contrast",
    },
    [FILTER_TYPES.HIGHLIGHT]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Highlight",
    },
    [FILTER_TYPES.GAMMA]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Gamma",
    },
    [FILTER_TYPES.HUE_SHIFT]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Hue Shift",
    },
    [FILTER_TYPES.SATURATION]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Saturation",
    },
    [FILTER_TYPES.SHADOWS]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Shadows",
    },
    [FILTER_TYPES.SHARPEN]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Sharpen",
    },
    [FILTER_TYPES.UNSHARP_MASK]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Unsharp",
    },
    [FILTER_TYPES.VIBRANCE]: {
      value: 0,
      changeType: CHANGE_TYPES.NEW,
      label: "Vibrance",
    },
    [FILTER_TYPES.UNSHARP_MASK_RADIUS]: {
      value: 30,
      changeType: CHANGE_TYPES.NEW,
      label: "USM Rad",
    },
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
