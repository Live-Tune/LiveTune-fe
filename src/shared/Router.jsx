import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoomPage from "../pages/RoomPage";
import LoginPage from "../pages/LoginPage";
import MainPanel from "../pages/MainPage";
import RoomCreatePage from "../pages/RoomCreatePage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />{" "}
        <Route path="/RoomCreatePanel" element={<RoomCreatePage />} />
        <Route path="/RoomPage/:id" element={<RoomPage />} />
        <Route path="/main" element={<MainPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
