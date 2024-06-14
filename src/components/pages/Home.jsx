import Navbar from "../Navbar"
import Footer from "../Footer"

import { Outlet } from "react-router-dom"

function Home() {

  return (
    <div id="home-container">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home