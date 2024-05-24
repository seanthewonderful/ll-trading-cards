import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Navbar from "./Navbar"

function Dugout() {

  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  if (!user) {
    navigate("/")
  }

  return (
    <div className="dugout">
      <Navbar />
      
    </div>
  )
}

export default Dugout