import { BrowserRouter, Route, Routes } from "react-router-dom";

import RoomCreatePanel from "../components/dev2/RoomCreatePanel";
import RoomPanel from "../components/dev2/RoomPanel";
import LoginPanel from "../components/LoginPanel";
import MainPanel from "../pages/MainPanel";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPanel />} />{" "}
        {/* ✅ use LoginPanel as homepage */}
        <Route path="/RoomCreatePanel" element={<RoomCreatePanel />} />
        <Route path="/RoomPanel" element={<RoomPanel />} />
        <Route path="/main" element={<MainPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
