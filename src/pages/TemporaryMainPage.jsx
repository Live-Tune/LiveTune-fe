import styled from "styled-components";
import logo from "../assets/LiveTuneLogo.png";
import LoginPanel from "../components/dev1/LoginPanel";

function TemporaryMainPage() {
  return (
    <BackgroundGradient>
      <PanelWrapper>
        <LiveTuneLogo src={logo} alt="LiveTune Logo" />
        <LoginPanel />
      </PanelWrapper>
    </BackgroundGradient>
  );
}

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LiveTuneLogo = styled.img`
  filter: hue-rotate(140deg) saturate(200%) brightness(30%);
`;

const BackgroundGradient = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #0097b1, #7ed957);
`;

export default TemporaryMainPage;
