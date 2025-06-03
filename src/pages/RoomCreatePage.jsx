import styled from "styled-components";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";
import RoomCreatePanel from "../components/RoomCreatePanel";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function RoomCreatePage() {
  const { uid } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!uid) {
      navigate("/");
      return;
    }
  }, []);

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
