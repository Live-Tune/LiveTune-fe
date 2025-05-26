import { BrowserRouter, Route, Routes } from "react-router-dom";

import RoomCreatePanel from "../components/RoomCreatePanel";
import RoomPanel from "../components/RoomPanel";
import LoginPanel from "../components/LoginPanel";
import MainPanel from "../pages/MainPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPanel />} />{" "}
        <Route path="/RoomCreatePanel" element={<RoomCreatePanel />} />
        <Route path="/RoomPanel" element={<RoomPanel />} />
        <Route path="/main" element={<MainPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
