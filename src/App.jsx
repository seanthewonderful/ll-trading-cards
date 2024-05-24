import Turnstyle from "./components/auth/Turnstyle.jsx"
import Dugout from "./components/Dugout.jsx"
import Welcome from "./components/Welcome.jsx"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/" 
      element={<Welcome />}
      >
      {/* <Route 
        path="turnstyle" 
        element={<Turnstyle />} 
        /> */}
      <Route 
        path="dugout" 
        element={<Dugout />} 
        />
    </Route>
  )
)

function App() {
  

  return RouterProvider({router})
}

export default App
