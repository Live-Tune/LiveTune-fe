import styled from "styled-components";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";
import { useContext, useEffect } from "react";
import RoomControlPanel from "../components/RoomControlPanel";
import RoomSearchPanel from "../components/RoomSearchPanel";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const { userName, uid } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!uid) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <Wrapper>
      <Header>
        <LiveTuneLogoBig />
        <Title>LiveTune</Title>
        <Welcome>Welcome, {userName} 👋</Welcome>
      </Header>

      <Content>
        <RoomControlPanel />
        <RoomSearchPanel />
      </Content>
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  padding: 40px 20px 60px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin: 10px 0 5px;
`;

const Welcome = styled.h2`
  color: white;
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
`;
