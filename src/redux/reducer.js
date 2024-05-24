const initialState = {
  user: null,
  admin: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_ADMIN":
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;