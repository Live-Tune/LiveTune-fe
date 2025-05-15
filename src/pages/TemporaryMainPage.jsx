import styled from "styled-components";
import LoginPanel from "../components/dev1/LoginPanel";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";

function TemporaryMainPage() {
  return (
    <PanelWrapper>
      <LiveTuneLogoBig />
      <LiveTuneTitle>Live Tune</LiveTuneTitle>
      <LoginPanel />
    </PanelWrapper>
  );
}

const PanelWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LiveTuneTitle = styled.div`
  font-size: 75px;
  font-weight: bold;
  color: white;
`;

export default TemporaryMainPage;
