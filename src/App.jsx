import Router from "./shared/Router";
import { BackgroundGradient } from "./styles/BackgroundGradient";
import Wave from "./styles/Wave";
function App() {
  return (
    <>
      <BackgroundGradient>
        <Router />
        <Wave />
      </BackgroundGradient>
    </>
  );
}

export default App;
