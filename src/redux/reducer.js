const initialState = {
  user: null,
  admin: null,
  players: [],
  playerInfo: {},
  playerStats: {},
  userTeams: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        userTeams: action.payload.userTeams || [],
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

    case "CREATE_TEAM":
      return {
        ...state,
        userTeams: [...state.userTeams, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
