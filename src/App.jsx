import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Router from "./shared/Router";
import { BackgroundGradient } from "./styles/BackgroundGradient";
import Wave from "./styles/Wave";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <>
      <BackgroundGradient>
        <UserContext.Provider value={{ userName, setUserName }}>
          <Router />
        </UserContext.Provider>
        <Wave />
      </BackgroundGradient>
    </>
  );
}

export default App;
