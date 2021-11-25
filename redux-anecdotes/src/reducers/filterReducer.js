const createChangeFilterAction = (filter) => ({
  type: "CHANGE",
  data: { filter },
});

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE":
      return action.data.filter;
    default:
      return state;
  }
};

export { createChangeFilterAction };
export default filterReducer;
