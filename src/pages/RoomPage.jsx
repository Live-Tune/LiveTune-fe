import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LiveTuneLogoSmall } from "../styles/GlobalStyle";
import { fetchRoomInfo } from "../apis/backendApis";
import { useNavigate, useParams } from "react-router-dom";

function RoomPage() {
  const id = useParams().id;
  const playerRef = useRef(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const update = async () => {
      const info = await fetchRoomInfo(id);
      console.log(info);
      setRoomInfo(info);
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
          {roomInfo?.room_name}
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
          <YouTube
            ref={playerRef}
            videoId={"XrHjKN2bjb0"}
            onReady={(e) => {
              playerRef.current = e.target;
              console.log("Ready to play");
            }}
            opts={{
              height: 390 / 2,
              width: 640 / 2,
              playerVars: {
                autoplay: 0,
                rel: 0,
                modestbranding: 1,
                disablekb: 1,
                controls: 0,
                showinfo: 0,
              },
            }}
          />
          <button
            onClick={() => {
              playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
            }}
          >
            -5
          </button>
          <button
            onClick={() => {
              playerRef.current.playVideo();
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              playerRef.current.pauseVideo();
            }}
          >
            Pause
          </button>
          <button
            onClick={() => {
              playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
            }}
          >
            +5
          </button>
        </PlayPanel>
        <UserPanel>Current Users</UserPanel>
      </PanelWrapper>
    </PageWrapper>
  );
}

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
