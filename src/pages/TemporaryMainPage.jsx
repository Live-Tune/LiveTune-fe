import styled from "styled-components";
import logo from "../assets/LiveTuneLogo.png";
import LoginPanel from "../components/dev1/LoginPanel";

function TemporaryMainPage() {
  return (
    <PanelWrapper>
      <LiveTuneLogo src={logo} alt="LiveTune Logo" />
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

const LiveTuneLogo = styled.img`
  width: 150px;
  filter: hue-rotate(90deg) saturate(200%) brightness(30%);
`;

export default TemporaryMainPage;
