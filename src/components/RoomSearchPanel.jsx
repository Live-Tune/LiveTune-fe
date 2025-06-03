import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  fetchAvailableRooms,
  fetchRoomId,
  fetchRoomInfo,
} from "../apis/backendApis";
import { useNavigate } from "react-router-dom";
import Refresh from "@mui/icons-material/Refresh";

function RoomSearchPanel() {
  const [showDropdown, setShowDropdown] = useState(false);
  const genreTags = [
    "#kpop",
    "#rock",
    "#classical",
    "#jazz",
    "#lofi",
    "#r&b",
    "#pop",
    "#metal",
    "#disco",
    "#60s",
    "#ballads",
  ];

  const navigate = useNavigate();
  const [roomList, setRoomList] = useState([]);
  const [searchRoomName, setSearchRoomName] = useState("");

  useEffect(() => {
    getAvailableRooms();
  }, []);

  const getAvailableRooms = async () => {
    const fetchedRoomList = await fetchAvailableRooms();
    setRoomList(fetchedRoomList);
  };

  const handleSearch = async () => {
    const room = await fetchRoomId(searchRoomName);
    if (room && room.id) {
      const roomInfo = await fetchRoomInfo(room.id);
      console.log(roomInfo);
      setRoomList([
        {
          id: room.id,
          name: roomInfo.name,
          description: roomInfo.description,
          max_user: roomInfo.max_user,
          currentUsers: roomInfo.currentUsers,
        },
      ]);
    } else {
      getAvailableRooms();
      alert("Room not found!");
    }
  };

  return (
    <PanelBox>
      <SearchWrapper>
        <SearchHeader
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <SearchIcon onClick={handleSearch}>
            <FaSearch />
          </SearchIcon>
          <SearchInput
            placeholder="Search by name"
            onChange={(e) => setSearchRoomName(e.target.value)}
            value={searchRoomName}
          />
          <Refresh onClick={getAvailableRooms} />
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
        {roomList && roomList.length > 0 ? (
          roomList.map((room) => {
            const current =
              room.current_users_number ?? room.current_users?.length ?? 0;
            const max = room.max_user ?? 0;
            const isFull = current >= max;

            return (
              <RoomItem key={room.id}>
                <RoomText>
                  <RoomName>{room.name}</RoomName>
                  <RoomDesc>{room.description}</RoomDesc>
                </RoomText>
                <RoomJoin>
                  {isFull ? (
                    <FullButton disabled>Full room</FullButton>
                  ) : (
                    <JoinButton
                      onClick={() => navigate(`/RoomPage/${room.id}`)}
                    >
                      Join room
                    </JoinButton>
                  )}
                  <Listeners>
                    Currently {current}/{max} listeners
                  </Listeners>
                </RoomJoin>
              </RoomItem>
            );
          })
        ) : (
          <NoRoomsMessage>No rooms available.</NoRoomsMessage>
        )}
      </RoomList>
    </PanelBox>
  );
}

export default RoomSearchPanel;

const FullButton = styled.button`
  background: #888;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px 25px;
  font-weight: bold;
  margin-bottom: 5px;
  cursor: not-allowed;
`;

const NoRoomsMessage = styled.p`
  color: #aaa;
  font-size: 16px;
  text-align: center;
`;

const PanelBox = styled.div`
  background-color: #0f2b20;
  border-radius: 40px;
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchHeader = styled.form`
  background-color: #000;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    color: white;
  }
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

const DropdownIcon = styled.div`
  color: white;
  font-size: 22px;
  cursor: pointer;
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
