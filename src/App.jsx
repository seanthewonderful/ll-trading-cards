import Home from "./components/Home.jsx";
import Welcome from "./components/Welcome.jsx";
import Dugout from "./components/Dugout.jsx";
import UserProfile from "./components/auth/UserProfile.jsx";
import UserTeams from "./components/UserTeams.jsx";
import Checkout from "./components/Checkout.jsx";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}>
        <Route index element={<Welcome />} />

        <Route path="teams" element={<UserTeams />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="dugout" element={<Dugout />} />

        <Route path="checkout" element={<Checkout />} />

        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Route>
    </>
  )
);

function App() {
  return RouterProvider({ router });
}

export default App;
