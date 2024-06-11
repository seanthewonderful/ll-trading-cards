const initialState = {
  team: null,
}

const teamReducer = (state=initialState, action) => {
  switch (action.type) {
    case "SET_TEAM":
      return {
        ...state,
        team: action.payload
      }
    case "CLEAR_TEAM":
      return {
        ...state,
        team: null
      }
    default:
      return state
  }
}

export default teamReducer