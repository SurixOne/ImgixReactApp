const flipList = ["none", "h", "v", "hv"];

const getNext = (value) => {
  let next = "error";
  const nextIndex = flipList.findIndex((e) => e === value) + 1;
  const len = flipList.length;
  next = flipList[nextIndex % len];
  return next;
};

export const getFilterValue = (value, type) => {
  const types = {
    NEXT: getNext(value),
    NEW: value,
    OPOSITE: !value,
  };
  return types[type];
};
