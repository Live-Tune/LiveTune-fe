import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <>
      <YourCustomButton>Button</YourCustomButton>
    </>
  );
}

const YourCustomButton = styled.button`
  width: 200px;
  height: 200px;
  background-color: yellow;
  color: green;
`;

export default App;
