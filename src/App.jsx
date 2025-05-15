import Router from "./shared/Router";
import { BackgroundGradient } from "./styles/BackgroundGradient";

function App() {
  return (
    <>
      <BackgroundGradient>
        <Router />
      </BackgroundGradient>
    </>
  );
}

export default App;
