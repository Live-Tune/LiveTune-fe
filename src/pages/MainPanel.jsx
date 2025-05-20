import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { LiveTuneLogoBig } from "../styles/GlobalStyle";
import logo from "../assets/LiveTuneLogo.png";
import RoomCreatePanel from "../components/dev2/RoomCreatePanel";
import { useNavigate } from "react-router-dom";

import { useState } from "react";





function MainPanel() {
  const username = localStorage.getItem("livetune-username") || "Guest";
  const [showDropdown, setShowDropdown] = useState(false);
  const genreTags = [
    "#kpop", "#rock", "#classical", "#jazz",
    "#lofi", "#r&b", "#pop", "#metal",
    "#disco", "#60s", "#ballads"
  ];
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <LiveTuneLogoBig />
        <Title>LiveTune</Title>
        <Welcome>Welcome, {username} 👋</Welcome>
      </Header>
      <Content>
        <LeftBox>
          <ActionButton>Join private room</ActionButton>
          <ActionButton onClick={() => navigate("/RoomCreatePanel")}>
          Create a room
        </ActionButton>

        </LeftBox>

        <RightBox>
              <SearchWrapper>
        <SearchHeader>
          <SearchIcon><FaSearch /></SearchIcon>
          <SearchInput placeholder="Search by name" />
          <Tag>#kpop</Tag>
          <Tag>#rock</Tag>
          <DropdownIcon onClick={() => setShowDropdown(prev => !prev)}>
            <MdArrowDropDown />
          </DropdownIcon>
        </SearchHeader>

        {showDropdown && (
          <DropdownMenu>
            {genreTags.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </DropdownMenu>
        )}
      </SearchWrapper>

          


          <RoomList>
            <RoomItem>
              <RoomText>
                <RoomName>Block B Lovers</RoomName>
                <RoomDesc>Join if you like Block B!</RoomDesc>
              </RoomText>
              <RoomJoin>
                <JoinButton>Join room</JoinButton>
                <Listeners>Currently 5 listeners</Listeners>
              </RoomJoin>
            </RoomItem>

            <RoomItem>
              <RoomText>
                <RoomName>Ballroom</RoomName>
                <RoomDesc>For fans of classic music</RoomDesc>
              </RoomText>
              <RoomJoin>
                <JoinButton>Join room</JoinButton>
                <Listeners>Currently 2 listeners</Listeners>
              </RoomJoin>
            </RoomItem>

            <RoomItem>
              <RoomText>
                <RoomName>Rock out</RoomName>
                <RoomDesc>ROCK AND ROOLL!!!!</RoomDesc>
              </RoomText>
              <RoomJoin>
                <JoinButton>Join room</JoinButton>
                <Listeners>Currently 1 listener</Listeners>
              </RoomJoin>
            </RoomItem>
          </RoomList>
        </RightBox>
      </Content>
    </Wrapper>
  );
}

export default MainPanel;

const DropdownIcon = styled.div`
  color: white;
  font-size: 22px;
  cursor: pointer;
`;


const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  background: linear-gradient(to right, #0097b1, #7ed957);
  min-height: 100vh;
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

const PanelBox = styled.div`
  background-color: #0f2b20;
  border-radius: 40px;
  width: 500px;
  height: 600px;
`;

const LeftBox = styled(PanelBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RightBox = styled(PanelBox)`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
`;

const ActionButton = styled.button`
  background: white;
  color: black;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 9999px;
  font-size: 16px;
  border: none;
  margin: 15px 0;
  cursor: pointer;
`;

const SearchHeader = styled.div`
  background-color: #000;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SearchIcon = styled.div`
  color: white;
  font-size: 18px;
`;

const SearchInput = styled.input`
  flex: 1;
  background-color: #1a1a1a;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: #aaa;
  }
`;

const Tag = styled.div`
  background: #1a1a1a;
  color: white;
  padding: 5px 12px;
  border-radius: 9999px;
  font-size: 13px;
`;

const DropdownMenu = styled.div`
  background-color: #0f0f0f;
  padding: 15px 20px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;


const RoomList = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RoomItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const RoomText = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const RoomDesc = styled.p`
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #ccc;
`;

const RoomJoin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const JoinButton = styled.button`
  background: white;
  color: black;
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Listeners = styled.span`
  font-size: 13px;
  color: #ccc;
`;
