import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"

function UserTeams() {

  const dispatch = useDispatch()
  const userTeams = useSelector(state => state.userTeams)

  const createNewTeam = () => {
    const newTeam = {
      name: "New Team",
      year: "2024",
      players: [],
    }
    dispatch({ 
      type: "CREATE_TEAM", 
      payload: newTeam 
    })  
    
  }

  return (
    <div id="user-teams-div">
      {/* <Navbar /> */}

      <div id="user-teams-body">
        <button
          onClick={() => createNewTeam()}
          >
            Create New Team
        </button>

        <section>
          {userTeams.map(team => (
            <div>
              <p>{team.year}</p>
              <p>{team.name}</p>
            </div>
          ))}
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default UserTeams