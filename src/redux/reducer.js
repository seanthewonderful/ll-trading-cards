const initialState = {
  user: null,
  admin: null,
  team: null,
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
    case "LOGOUT":
      return {
        ...state,
        user: null,
        admin: null,
        team: null,
      };
    
    case "SET_TEAM":
      return {
        ...state,
        team: action.payload,
      }
    case "CLEAR_TEAM":
      return {
        ...state,
        team: null
      }
      
    default:
      return state;
  }
};

export default reducer;
