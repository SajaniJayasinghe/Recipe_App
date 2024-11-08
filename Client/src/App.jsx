import { Routes, Route } from "react-router-dom";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
