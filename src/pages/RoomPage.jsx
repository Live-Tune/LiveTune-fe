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

function RoomPage() {
  const id = useParams().id;
  const { userName } = useContext(UserContext);
  const playerRef = useRef(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  const pingTimeRef = useRef(0);
  const pingDelayRef = useRef(0);
  const pingSumRef = useRef(0);
  const pingCountRef = useRef(0);

  const YTState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3,
    CUED: 5,
  };

  const [playState, setPlayState] = useState(YTState.UNSTARTED);

  useEffect(() => {
    const update = async () => {
      setRoomInfo(await fetchRoomInfo(id));
    };
    update();

    const socket = io(backendEndpoint, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.emit("join_room", { room_id: id, user: userName });

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

    socket.on("broadcast_pause", () => {
      console.log("Brdcst pause");
      playerRef.current.pauseVideo();
    });

    socket.on("pong", () => {
      pingDelayRef.current = Date.now() - pingTimeRef.current;
      pingSumRef.current += pingDelayRef.current;
      pingCountRef.current += 1;
      console.log(
        "pong took ",
        pingDelayRef.current,
        "ms",
        " avg: ",
        pingSumRef.current / pingCountRef.current,
        "ms"
      );
    });

    socket.on("user_joined", (data) => {
      console.log(data);
    });

    socket.on("user_joined", (data) => {
      console.log(`${data.user} joined the room`);
    });

    socketRef.current = socket;

    return () => {
      socket.emit("leave_room", { room_id: id, user: userName });
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

  const sendPing = () => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "ping",
    });
    pingTimeRef.current = Date.now();
    console.log("ping");
  };

  const broadcastPlay = () => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "play",
    });
    //wait until request reaches server
    setTimeout(
      () => {
        playerRef.current.playVideo();
      },
      pingCountRef.current === 0 ? 0 : pingSumRef.current / pingCountRef.current
    );
  };

  const broadcastPause = () => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "pause",
    });
    //wait until request reaches server
    setTimeout(
      () => {
        playerRef.current.pauseVideo();
      },
      pingCountRef.current === 0 ? 0 : pingSumRef.current / pingCountRef.current
    );
  };

  const isPlaying = () =>
    playState === YTState.PLAYING || playState === YTState.BUFFERING;

  const handlePlayPauseToggle = () => {
    console.log(playState);
    if (isPlaying()) {
      broadcastPause();
      setPlayState(1);
    } else {
      broadcastPlay();
      setPlayState(2);
    }
  };

  const jumpTo = (second) => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + second);
  };

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
          <YouTube
            ref={playerRef}
            videoId={"XrHjKN2bjb0"}
            onReady={(e) => {
              playerRef.current = e.target;
              playerRef.current.playVideo();
              playerRef.current.pauseVideo();
              console.log("Ready to play");
            }}
            opts={{
              height: "200px",
              width: "100%",
              playerVars: {
                autoplay: 0,
                rel: 0,
                modestbranding: 1,
                disablekb: 1,
                controls: 0,
                showinfo: 0,
                mute: 1,
              },
            }}
            onStateChange={(e) => {
              setPlayState(e.data);
            }}
          />
          <SmallButton
            onClick={() => {
              jumpTo(-5);
            }}
          >
            <Replay5 />
          </SmallButton>
          <BigButton
            onClick={() => {
              handlePlayPauseToggle();
            }}
          >
            {isPlaying() ? <PauseCircleFilled /> : <PlayCircleFilled />}
          </BigButton>
          <SmallButton
            onClick={() => {
              jumpTo(+5);
            }}
          >
            <Forward5 />
          </SmallButton>
          <SmallButton
            onClick={() => {
              console.log("skip");
            }}
          >
            <SkipNext />
          </SmallButton>
          <button
            onClick={() => {
              playerRef.current.unMute();
            }}
          >
            Disable autoplay restriction
          </button>
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            Send Message
          </button>
          <button
            onClick={() => {
              sendPing();
            }}
          >
            Ping
          </button>
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
