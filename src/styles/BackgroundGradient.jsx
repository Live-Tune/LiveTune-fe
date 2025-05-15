import styled, { keyframes } from "styled-components";
import { gradientColor1, gradientColor2 } from "./GlobalStyle";

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

export const BackgroundGradient = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, ${gradientColor1}, ${gradientColor2});
  background-size: 200% 200%;
  animation: ${gradientAnimation} 15s ease-in-out infinite;
`;
