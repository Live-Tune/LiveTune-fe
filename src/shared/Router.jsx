import { BrowserRouter, Route, Routes } from "react-router-dom";
import TemporaryMainPage from "../pages/TemporaryMainPage";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TemporaryMainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
