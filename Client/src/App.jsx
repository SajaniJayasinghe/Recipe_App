import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Hompage from "./components/Recipe/Hompage";
import FavouritePage from "./components/Recipe/FavouritePage";
import Layout from "./components/Recipe/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/homepage" element={<Hompage />} />
        <Route path="/favourite" element={<FavouritePage />} />
      </Route>
    </Routes>
  );
}

export default App;