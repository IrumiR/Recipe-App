import { Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="flex">
      <SideBar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;
