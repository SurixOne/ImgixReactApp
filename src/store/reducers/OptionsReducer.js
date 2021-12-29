import { optionsActions } from "../actions/optionsActions/OptionsActions";

const initialState = {
  changes: 0,
  futureChanges: 0,
  pastOptions: [],
  options: {
    flip: "none",
    orient: "none",
    invert: false,
    rot: 0,
    bri: 0,
    exp: 0,
    con: 0,
    high: 0,
    gam: 0,
    hue: 0,
    sat: 0,
    shad: 0,
    sharp: 0,
    usm: 0,
    vib: 0,
    usmrad: 30,
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
        options: { ...state.options, [op.name]: op.value },
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
