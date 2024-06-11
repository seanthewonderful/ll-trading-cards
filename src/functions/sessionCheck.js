import axios from 'axios'

const sessionCheck = async (dispatch) => {
  
  const res = await axios.get(`/api/sessionCheck`)

  if (res.data.user) {
    dispatch({
      type: 'SET_USER',
      payload: res.data.user
    })
  }  
}

export default sessionCheck