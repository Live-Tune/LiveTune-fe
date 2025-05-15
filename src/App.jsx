import styled from "styled-components";
import "./App.css";
import Router from "./shared/Router";

function App() {
  return (
    <>
      <BackgroundGradient>
        <Router />
      </BackgroundGradient>
    </>
  );
}

const BackgroundGradient = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #0097b1, #7ed957);
`;

export default App;
