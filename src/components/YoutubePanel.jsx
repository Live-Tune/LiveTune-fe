import { useContext, useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import {
  backendEndpoint,
  fetchRoomInfo,
  fetchUserInfo,
  fetchVideoTitle,
  fetchPlaylistById,
} from "../apis/backendApis";
import { io } from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Forward5 from "@mui/icons-material/Forward5";
import Replay5 from "@mui/icons-material/Replay5";
import PlayCircleFilled from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilled from "@mui/icons-material/PauseCircleFilled";
import SkipNext from "@mui/icons-material/SkipNext";
import Slider from "@mui/material/Slider";

function YoutubePanel({
  setCurrentUsers,
  id,
  queueList,
  setQueueList,
  currentYoutubeId,
  setCurrentYoutubeId,
  roomInfo,
}) {
  const { userName, uid } = useContext(UserContext);
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

  const [youtubeId, setYoutubeId] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const syncBufferRef = useRef(null);

  const [volume, setVolume] = useState(100);

  useEffect(() => {
    const socket = io(backendEndpoint, {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.emit("join_room", { room_id: id, uid });

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

    socket.on("broadcast_sync", (data) => {
      console.log("Brdcst sync");
      playerRef.current.seekTo(data.timestamp, true);
      setCurrentTimeStamp(data.timestamp);
      setSliderValue(data.timestamp);
    });

    socket.on("req_sync", () => {
      console.log("Req sync");
      broadcastSync(playerRef.current.getCurrentTime());
    });

    socket.on("broadcast_add", (data) => {
      console.log("Brdcst add");
      setQueueList((prev) => [...prev, data.video]);
    });

    socket.on("broadcast_skip", () => {
      console.log("Brdcst skip");
      setQueueList((prev) => {
        const [nextVideoId, ...rest] = prev;
        setCurrentYoutubeId(nextVideoId.youtubeId);
        return rest;
      });
    });
    socket.on("broadcast_add_playlist", (data) => {
      console.log("Broadcast playlist received");
      setQueueList((prev) => [
        ...prev,
        ...data.videos.map((v) => ({
          youtubeId: v.youtubeId,
          title: v.title,
        })),
      ]);
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

    socket.on("user_joined", async (data) => {
      console.log(`${data.uid} joined the room`);
      setCurrentUsers((prev) => [...prev, data.uid]);
      if (uid !== data.uid) {
        broadcastSync(playerRef.current.getCurrentTime());
      }
    });

    socket.on("user_left", async (data) => {
      console.log(`${data.uid} left the room`);
      setCurrentUsers((prev) => prev.filter((uid) => uid !== data.uid));
    });

    socket.on("host_changed", async (data) => {
      console.log("host changed", data.new_host_uid);
      if (data.new_host_uid == uid) {
        alert(`Host left the room, you are the host now`);
      } else {
        alert(
          `Host left the room, new host: ${
            (await fetchUserInfo(data.new_host_uid)).username
          }`
        );
      }
    });

    socketRef.current = socket;

    return () => {
      socket.emit("leave_room", { room_id: id, uid });
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

  const broadcastSync = (timestamp) => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "sync",
      timestamp,
    });
  };

  const broadcastAdd = (youtubeId, title) => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "add",
      video: { youtubeId, title },
    });
  };

  const broadcastSkip = () => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "skip",
    });
  };

  const requestSync = () => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "req_sync",
    });
  };

  const broadcastAddPlaylist = (videos) => {
    socketRef.current.emit("send_message", {
      room_id: id,
      message_type: "add_playlist",
      videos: videos.map((v) => ({
        title: v.title,
        youtubeId: v.youtube_id,
        added_by: uid,
      })),
    });
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
    const timestamp = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(timestamp + second);
    setCurrentTimeStamp(timestamp + second);
    setSliderValue(timestamp + second);
  };

  return (
    <>
      <YouTube
        ref={playerRef}
        videoId={currentYoutubeId}
        onReady={async (e) => {
          playerRef.current = e.target;
          setDuration(await e.target.getDuration());
          playerRef.current.playVideo();
          playerRef.current.pauseVideo();
          playerRef.current.setVolume(volume);
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
            //showinfo: 0,
            //mute: 0,
          },
        }}
        onStateChange={(e) => {
          setPlayState(e.data);
        }}
        onEnd={() => {
          if (roomInfo.host === uid) {
            setTimeout(() => {
              broadcastSkip();
              setCurrentYoutubeId(queueList[0].youtubeId);
              setQueueList(queueList.filter((yid, i) => i !== 0));
              setTimeout(() => {
                broadcastPlay();
                playerRef.current.playVideo();
                setTimeout(() => {
                  const timestamp = playerRef.current.getCurrentTime();
                  broadcastSync(timestamp);
                }, 3000);
              }, 3000);
            }, 3000);
          }
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
          broadcastSync(newValue);
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
      <ButtonRow>
        <SmallButton
          onClick={() => {
            const timestamp = playerRef.current.getCurrentTime() - 5;
            broadcastSync(timestamp);
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
            const timestamp = playerRef.current.getCurrentTime() + 5;
            broadcastSync(timestamp);
            jumpTo(+5);
          }}
        >
          <Forward5 />
        </SmallButton>
        <SmallButton
          onClick={() => {
            broadcastSkip();
            setCurrentYoutubeId(queueList[0].youtubeId);
            setQueueList(queueList.filter((yid, i) => i !== 0));
          }}
        >
          <SkipNext />
        </SmallButton>
      </ButtonRow>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <p>Volume</p>
        <Slider
          value={volume}
          onChange={(e, newValue) => {
            setVolume(newValue);
            playerRef.current.setVolume(newValue);
          }}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
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
      </div>
      <ButtonGroup>
        <StyledControlButton onClick={sendMessage}>
          Send Message
        </StyledControlButton>
        <StyledControlButton onClick={sendPing}>Ping</StyledControlButton>
        <StyledControlButton
          onClick={() => {
            const timestamp = playerRef.current.getCurrentTime();
            broadcastSync(timestamp);
          }}
        >
          Sync
        </StyledControlButton>
        <StyledControlButton onClick={requestSync}>
          Request Sync
        </StyledControlButton>
      </ButtonGroup>

      <div>
        {/* YouTube ID input */}
        <InputGroup>
          <StyledInput
            type="text"
            placeholder="Enter YouTube ID"
            value={youtubeId}
            onChange={(e) => setYoutubeId(e.target.value)}
          />
          <StyledControlButton
            onClick={async () => {
              const title = await fetchVideoTitle(youtubeId);
              if (title) {
                broadcastAdd(youtubeId, title);
                setQueueList((prev) => [...prev, { youtubeId, title }]);
              } else {
                alert("Video not found");
              }
            }}
          >
            Add
          </StyledControlButton>
        </InputGroup>

        <InputGroup>
          <StyledInput
            type="text"
            placeholder="Enter YouTube Playlist ID"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
          />
          <StyledControlButton
            onClick={async () => {
              const videos = await fetchPlaylistById(playlistUrl);
              if (!videos.length) {
                alert("Failed to load the playlist.");
                return;
              }
              broadcastAddPlaylist(videos);
              setQueueList((prev) => [
                ...prev,
                ...videos.map((v) => ({
                  title: v.title,
                  youtubeId: v.youtube_id,
                })),
              ]);
            }}
          >
            Add Playlist by ID
          </StyledControlButton>
        </InputGroup>

        {/* preset loding */}
        <InputGroup>
          <StyledControlButton
            onClick={async () => {
              const coolList = [
                "T3eEZ-_2m9w",
                "4z7oi-QxE8s",
                "0KlnDwNqIp8",
                "v1CP04sTG0A",
              ];
              for (let i = 0; i < coolList.length; i++) {
                const video = {
                  youtubeId: coolList[i],
                  title: await fetchVideoTitle(coolList[i]),
                };
                broadcastAdd(video.youtubeId, video.title);
                setQueueList((prev) => [...prev, video]);
              }
            }}
          >
            Load it up 🎵
          </StyledControlButton>
        </InputGroup>
      </div>
    </>
  );
}
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
`;

const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #222;
  color: white;
  font-size: 14px;
  width: 200px;

  &::placeholder {
    color: #aaa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  justify-content: center;
`;

const StyledControlButton = styled.button`
  padding: 6px 14px;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #666;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

const ControlGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 16px 0;
`;

const ControlButton = styled.button`
  background-color: #ffffff10;
  color: white;
  border: 1px solid #555;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: #ffffff20;
    transform: scale(1.05);
  }
`;

const ControlInput = styled.input`
  background-color: #1f1f1f;
  color: white;
  border: 1px solid #555;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
  width: 200px;

  &::placeholder {
    color: #aaa;
  }
`;

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
