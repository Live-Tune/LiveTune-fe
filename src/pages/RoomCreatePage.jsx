import styled from "styled-components";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";
import RoomCreatePanel from "../components/RoomCreatePanel";

function RoomCreatePage() {
  return (
    <Wrapper>
      <RoomCreatePanel />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default RoomCreatePage;
