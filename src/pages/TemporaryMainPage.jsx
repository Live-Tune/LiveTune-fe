import styled from "styled-components";
import logo from "../assets/LiveTuneLogo.png";
import LoginPanel from "../components/dev1/LoginPanel";

function TemporaryMainPage() {
  return (
    <PanelWrapper>
      <LiveTuneLogo src={logo} alt="LiveTune Logo" />
      <LoginPanel />
    </PanelWrapper>
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

export default TemporaryMainPage;
