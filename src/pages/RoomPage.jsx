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
  const [queueList, setQueueList] = useState([]);
  const [currentYoutubeId, setCurrentYoutubeId] = useState("");

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
      setQueueList(roomInfo.queue);
      setCurrentYoutubeId(
        roomInfo.current_song ? roomInfo.current_song.youtubeId : ""
      );
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
        <QueuePanel>
          <QueueHeader>Queue</QueueHeader>
          {queueList.map((song, i) => (
            <QueueItem key={`${song.youtubeId}-${i}`}>
              <span role="img" aria-label="music">🎵</span> {song.title}
            </QueueItem>
          ))}
        </QueuePanel>

        <PlayPanel>
          Currently Playing
          <YoutubePanel
            setCurrentUsers={setCurrentUsers}
            id={id}
            queueList={queueList}
            setQueueList={setQueueList}
            currentYoutubeId={currentYoutubeId}
            setCurrentYoutubeId={setCurrentYoutubeId}
          />
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
const QueueHeader = styled.h3`
  font-size: 20px;
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid #333;
  text-align: center;
`;

const QueueList = styled.div`
  padding: 10px 20px;
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const QueueItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #2a2a2a;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BigButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;

  svg {
    font-size: 50px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const SmallButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;

  svg {
    font-size: 40px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const TitleDiv = styled.div`
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const TopBar = styled.div`
  flex: 1;
  background-color: #070707;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserPanel = styled.div`
  flex: 1;
  background-color: #131313;
  color: white;
  padding: 20px;

  h3 {
    font-size: 20px;
    margin-bottom: 15px;
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
    text-align: center;
  }

  p {
    font-size: 15px;
    padding: 10px 0;
    border-bottom: 1px solid #2a2a2a;
    text-align: center;
  }
`;

export default RoomPage;
