import { useContext, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { LiveTuneLogoSmall } from "../styles/GlobalStyle";
import { fetchRoomInfo } from "../apis/backendApis";
import { useNavigate, useParams } from "react-router-dom";
import { backendEndpoint } from "../apis/backendApis";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Forward5 from "@mui/icons-material/Forward5";
import Replay5 from "@mui/icons-material/Replay5";
import PlayCircleFilled from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilled from "@mui/icons-material/PauseCircleFilled";
import SkipNext from "@mui/icons-material/SkipNext";
import Slider from "@mui/material/Slider";
import YoutubePanel from "../components/YoutubePanel";

function RoomPage() {
  const id = useParams().id;
  const [roomInfo, setRoomInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const update = async () => {
      setRoomInfo(await fetchRoomInfo(id));
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
          <YoutubePanel id={id} />
        </PlayPanel>
        <UserPanel>Current Users</UserPanel>
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
