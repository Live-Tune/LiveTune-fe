import { BrowserRouter, Route, Routes } from "react-router-dom";
import TemporaryMainPage from "../pages/TemporaryMainPage";
import RoomCreatePanel from "../components/dev2/RoomCreatePanel";
import RoomPanel from "../components/dev2/RoomPanel";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemporaryMainPage />} />
        <Route path="/RoomCreatePanel" element={<RoomCreatePanel />} />
        <Route path="/RoomPanel" element={<RoomPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
