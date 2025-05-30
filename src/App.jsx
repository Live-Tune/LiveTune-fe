import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Router from "./shared/Router";
import { BackgroundGradient } from "./styles/BackgroundGradient";
import Wave from "./styles/Wave";
import { useLocation } from "react-router-dom";

function App() {
  const [userName, setUserName] = useState("");
  const shouldHideWave = useLocation().pathname.includes("/RoomPage");

  return (
    <BackgroundGradient>
      <UserContext.Provider value={{ userName, setUserName }}>
        <Router />
      </UserContext.Provider>
      {!shouldHideWave && <Wave />}
    </BackgroundGradient>
  );
}

export default App;
