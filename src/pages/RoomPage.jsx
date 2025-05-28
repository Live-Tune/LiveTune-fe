import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LiveTuneLogoSmall } from "../styles/GlobalStyle";
import { fetchRoomInfo } from "../apis/backendApis";
import { useNavigate, useParams } from "react-router-dom";
import { backendEndpoint } from "../apis/backendApis";
import { io } from "socket.io-client";

function RoomPage() {
  const id = useParams().id;
  const user = localStorage.getItem("livetune-username");
  const playerRef = useRef(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    const update = async () => {
      setRoomInfo(await fetchRoomInfo(id));
    };
    update();

    const socket = io(backendEndpoint);

    socket.emit("join_room", { room_id: id, user });

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("receive_message", (data) => {
      console.log(data);
    });

    socket.on("broadcast_play", () => {
      console.log("Brdcst play");
      playerRef.current.playVideo();
    });

    socket.on("broadcast_stop", () => {
      console.log("Brdcst stop");
      playerRef.current.stopVideo();
    });

    socket.on("user_joined", (data) => {
      console.log(data);
    });

    socket.on("user_joined", (data) => {
      console.log(`${data.user} joined the room`);
    });

    socketRef.current = socket;

    return () => {
      socket.emit("leave_room", { room_id: id, user });
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "msg",
      message: "hello",
    });
  };

  return (
    <PageWrapper>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        AAA
      </button>
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
              socketRef.current.emit("send_message", {
                room_id: id,
                message_type: "play",
              });
              playerRef.current.playVideo();
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              socketRef.current.emit("send_message", {
                room_id: id,
                message_type: "stop",
              });
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
