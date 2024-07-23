import Home from "./components/pages/Home.jsx";
import Welcome from "./components/Welcome.jsx";
import Dugout from "./components/pages/Dugout.jsx";
import UserProfile from "./components/pages/UserProfile.jsx";
import UserTeams from "./components/pages/UserTeams.jsx";
import Checkout from "./components/pages/Checkout.jsx";
import NotFound from "./components/pages/errors/NotFound.jsx";
import UnknownError from "./components/pages/errors/UnknownError.jsx";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route 
        path="/" 
        element={<Home />}
        errorElement={<UnknownError />}
        >
        <Route 
          index 
          element={<Welcome />} 
          errorElement={<UnknownError />}
          />

        <Route 
          path="myteams" 
          element={<UserTeams />} 
          errorElement={<UnknownError />}
          />

        <Route 
          path="dugout" 
          element={<Dugout />} 
          errorElement={<UnknownError />}
          />

        <Route 
          path="profile" 
          element={<UserProfile />} 
          errorElement={<UnknownError />}
          />

        <Route 
          path="checkout" 
          element={<Checkout />} 
          errorElement={<UnknownError />}
          />

        <Route 
          path="*" 
          element={<NotFound />} 
          />
      </Route>
    </>
  )
);

function App() {
  return RouterProvider({ router });
}

export default App;
