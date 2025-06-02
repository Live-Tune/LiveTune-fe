import styled from "styled-components";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";
import LoginPanel from "../components/LoginPanel";

function LoginPage() {
  return (
    <LoginPanelWrapper>
      <LiveTuneLogoBig />
      <Title>Live Tune</Title>
      <LoginPanel />
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

export default LoginPage;
