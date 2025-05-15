import styled, { keyframes } from "styled-components";
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

const gradientAnimation = keyframes`
  0% {
    background-position: 0%;
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 0%;
  }
`;

const BackgroundGradient = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #0097b1, #7ed957);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease-in-out infinite;
`;

export default App;
