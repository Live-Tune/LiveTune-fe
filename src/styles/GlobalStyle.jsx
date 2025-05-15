import styled from "styled-components";
import logo from "../assets/LiveTuneLogo.png";

export const gradientColor1 = "#0097b1";
export const gradientColor2 = "#7ed957";

export function LiveTuneLogoBig() {
  return <LiveTuneLogo src={logo} alt="LiveTune Logo" />;
}

export function LiveTuneLogoSmall() {
  return (
    <LiveTuneLogo src={logo} alt="LiveTune Logo" style={{ width: "75px" }} />
  );
}

const LiveTuneLogo = styled.img`
  width: 150px;
  filter: hue-rotate(140deg) saturate(200%) brightness(40%);
`;
