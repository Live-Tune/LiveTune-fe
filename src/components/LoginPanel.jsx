import { useState } from "react";
import styled from "styled-components";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";

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

      <Card
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={handleLogin}>Next</Button>
      </Card>
    </LoginPanelWrapper>
  );
}

const LoginPanelWrapper = styled.div`
  min-height: 100vh;
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

const Card = styled.form`
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

export default LoginPanel;
