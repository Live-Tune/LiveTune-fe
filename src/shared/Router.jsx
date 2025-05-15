import { BrowserRouter, Route, Routes } from "react-router-dom";
import TemporaryMainPage from "../pages/TemporaryMainPage";
import RoomCreatePanel from "../components/dev2/RoomCreatePanel";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TemporaryMainPage />} />
        <Route path="/RoomCreatePanel" element={<RoomCreatePanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
