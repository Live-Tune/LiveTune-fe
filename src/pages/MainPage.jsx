import styled from "styled-components";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";
import { useEffect, useState } from "react";
import RoomControlPanel from "../components/RoomControlPanel";
import RoomSearchPanel from "../components/RoomSearchPanel";

function MainPage() {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedName = localStorage.getItem("livetune-username");
    if (storedName) setUsername(storedName);
  }, []);

  return (
    <Wrapper>
      <Header>
        <LiveTuneLogoBig />
        <Title>LiveTune</Title>
        <Welcome>Welcome, {username} 👋</Welcome>
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
