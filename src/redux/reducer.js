const initialState = {
  user: null,
  admin: null,
  playerInfo: {},
  playerStats: {}
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
        playerInfo: {},
        playerStats: {},
      };

    case "UPDATE_PLAYER_INFO":
      return {
        ...state,
        playerInfo: action.payload,
      };
    case "UPDATE_PLAYER_STATS":
      return {
        ...state,
        playerStats: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;