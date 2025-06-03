import { useContext, useEffect, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { LiveTuneLogoSmall } from "../styles/GlobalStyle";
import { fetchRoomInfo, fetchUserInfo } from "../apis/backendApis";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import YoutubePanel from "../components/YoutubePanel";

function RoomPage() {
  const id = useParams().id;
  const [roomInfo, setRoomInfo] = useState(null);
  const navigate = useNavigate();
  const { uid } = useContext(UserContext);

  const [currentUsers, setCurrentUsers] = useState([uid]);
  const [currentUsersNameDisplay, setCurrentUsersNameDisplay] = useState([]);

  useEffect(() => {
    setCurrentUsersNameDisplay(
      currentUsers.map(async (uid) => {
        const userInfo = await fetchUserInfo(uid);
        return userInfo.username;
      })
    );
  }, [currentUsers]);

  useEffect(() => {
    if (!uid) {
      navigate("/");
      return;
    }
    const update = async () => {
      const roomInfo = await fetchRoomInfo(id);
      setRoomInfo(roomInfo);
      setCurrentUsers(roomInfo.current_users);
    };
    update();
  }, []);

  return (
    <PageWrapper>
      <TopBar>
        <TitleDiv>
          <ArrowBackIcon
            onClick={() => {
              navigate("/main");
            }}
          />
          {roomInfo?.name}
        </TitleDiv>
        {roomInfo?.description}
        <TitleDiv>
          LiveTune Player <LiveTuneLogoSmall />
        </TitleDiv>
      </TopBar>
      <PanelWrapper>
        <QueuePanel>Queue</QueuePanel>
        <PlayPanel>
          Currently Playing
          <YoutubePanel setCurrentUsers={setCurrentUsers} id={id} />
        </PlayPanel>
        <UserPanel>
          Current Users
          {currentUsersNameDisplay.map((name, i) => {
            return <p key={i}>{name}</p>;
          })}
        </UserPanel>
      </PanelWrapper>
    </PageWrapper>
  );
}

const BigButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  svg {
    font-size: 50px;
  }
`;

const SmallButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  svg {
    font-size: 40px;
  }
`;

const TitleDiv = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  flex: 1;
  background-color: #070707;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 20px;
`;

const PanelWrapper = styled.div`
  width: 100vw;
  flex: 9;
  display: flex;
`;

const QueuePanel = styled.div`
  flex: 1;
  background-color: #131313;
  color: white;
`;
const PlayPanel = styled.div`
  flex: 2;
  background-color: #222222;
  color: white;
`;
const UserPanel = styled.div`
  flex: 1;
  background-color: #131313;
  color: white;
`;

export default RoomPage;
