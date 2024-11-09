import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Hompage from "./components/User/Hompage";
import FavouritePage from "./components/User/FavouritePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<Hompage />} />
      <Route path="/favourite" element={<FavouritePage />} />
    </Routes>
  );
}

export default App;
