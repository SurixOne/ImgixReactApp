export const optionsActions = {
  CHANGE_OPTION: "CHANGE_OPTION",
  UNDO_CHANGE: "UNDO_CHANGE",
  REDO_CHANGE: "REDO_CHANGE",
};

const undoChange = () => {
  return {
    type: optionsActions.UNDO_CHANGE,
  };
};
const redoChange = () => {
  return {
    type: optionsActions.REDO_CHANGE,
  };
};
const changeOption = (option) => {
  return {
    type: optionsActions.CHANGE_OPTION,
    option: option,
  };
};

export { changeOption, undoChange, redoChange };
