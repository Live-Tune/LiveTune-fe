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

function YoutubePanel({ id }) {
  const { userName } = useContext(UserContext);
  const playerRef = useRef(null);
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
  const [duration, setDuration] = useState(0);
  const [currentTimeStamp, setCurrentTimeStamp] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying() && !isDragging) {
        const current = playerRef.current.getCurrentTime();
        setCurrentTimeStamp(current);
        setSliderValue(current);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [playState, isDragging]);

  useEffect(() => {
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
    <>
      <YouTube
        ref={playerRef}
        videoId={"XrHjKN2bjb0"}
        onReady={async (e) => {
          playerRef.current = e.target;
          setDuration(await e.target.getDuration());
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
      <div
        style={{
          color: "white",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {formatTime(isDragging ? sliderValue : currentTimeStamp)} /{" "}
        {formatTime(duration)}
      </div>
      <Slider
        value={isDragging ? sliderValue : currentTimeStamp}
        onChange={(e, newValue) => {
          setIsDragging(true);
          setSliderValue(newValue);
        }}
        onChangeCommitted={(e, newValue) => {
          playerRef.current.seekTo(newValue, true);
          setCurrentTimeStamp(newValue);
          setSliderValue(newValue);
          setIsDragging(false);
        }}
        max={duration}
        valueLabelDisplay="auto"
        valueLabelFormat={formatTime}
        sx={{
          color: "white",
          "& .MuiSlider-thumb": {
            color: "white",
          },
          "& .MuiSlider-rail": {
            color: "white",
          },
          "& .MuiSlider-track": {
            color: "white",
          },
          "& .MuiSlider-valueLabel": {
            color: "black",
            backgroundColor: "white",
          },
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
    </>
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

export default YoutubePanel;
