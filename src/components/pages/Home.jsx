import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ToastContainer, Zoom } from "react-toastify"

import Navbar from "../Navbar"
import Footer from "../Footer"
import sessionCheck from "../../functions/sessionCheck"

function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    sessionCheck(dispatch)
  }, [])

  return (
    <div id="home-container">
      {/* <img src="../assets/pxfield.png" alt="" id="background-image"/> */}
      <Navbar />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
      />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home