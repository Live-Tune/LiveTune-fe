import { useState } from "react";
import styled from "styled-components";
import { gradientColor1, gradientColor2, LiveTuneLogoBig } from "../../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";

const LoginPanelWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, ${gradientColor1}, ${gradientColor2});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.div`
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const Card = styled.div`
  background-color: #122f23;
  padding: 30px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 300px;
`;

const Label = styled.label`
  color: white;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: none;
  margin-bottom: 20px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: white;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Wave = styled.svg`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
`;

function LoginPanel() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("livetune-username", username);
      navigate("/main"); // or "/RoomPanel" — wherever you want to land
    } else {
      alert("Please enter a username");
    }
  };

  return (
    <LoginPanelWrapper>
      <LiveTuneLogoBig />
      <Title>Live Tune</Title>

      <Card>
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleLogin}>Next</Button>
      </Card>

      <Wave viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          d="M0,160 C120,240 240,80 360,160 C480,240 600,80 720,160 C840,240 960,80 1080,160 C1200,240 1320,80 1440,160"
        />
      </Wave>
    </LoginPanelWrapper>
  );
}

export default LoginPanel;
