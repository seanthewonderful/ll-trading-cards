const initialState = {
  basicInfo: {
    firstName: "",
    lastName: "",
    birthMonth: "",
    homeTown: "",
    homeCountry: "US",
    homeState: "",
    recoveryEmail: "",
    bio: "",
    jerseyNumber: "9",
    throws: "R",
    bats: "R",
    position1: "1",
    position2: "2",
  },
  stats: {
    batting: {
      AB: 0,
      PA: 0,
      AVG: 0,
      HR: 0,
      RBI: 0,
      SB: 0,
      R: 0,
      OBP: 0,
      SLG: 0,
      OPS: 0,
      H: 0,
      '2B': 0,
      '3B': 0,
      BB: 0,
      HBP: 0,
      SO: 0,
    },
    pitching: {
      ERA: 0,
      W: 0,
      L: 0,
      SO: 0,
      SV: 0,
      WHIP: 0,
      BAA: 0,
      IP: 0,
      H: 0,
      R: 0,
      BB: 0,
      HBP: 0,
    }
  },
  imgUrl: "",
}

const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_INFO":
      return {
        ...state,
        basicInfo: action.payload
      }
    case "SET_STATS":
      return {
        ...state,
        stats: action.payload
      }
    case "SET_IMG_URL":
      return {
        ...state,
        imgUrl: action.payload
      }
    case "CLEAR_INFO":
      return {
        ...state,
        team: null
      }
    default:
      return state;
  }
}

export default playerReducer