// ✅ RoomSearchPanel.jsx
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchAvailableRooms } from "../apis/backendApis";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const update = async () => {
      const fetchedRoomList = await fetchAvailableRooms();
      setRoomList(fetchedRoomList);
    };
    update();
  }, []);

  return (
    <PanelBox>
      <SearchWrapper>
        <SearchHeader>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput placeholder="Search by name" />
          {/* Tag not implemented in current stage */}
          {/* <Tag>#kpop</Tag>
          <Tag>#rock</Tag>
          <DropdownIcon onClick={() => setShowDropdown((prev) => !prev)}>
            <MdArrowDropDown />
          </DropdownIcon> */}
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
        {roomList?.map((room) => {
          return (
            <RoomItem key={room.id}>
              <RoomText>
                <RoomName>{room.name}</RoomName>
                <RoomDesc>{room.description}</RoomDesc>
              </RoomText>
              <RoomJoin>
                {room.currentUsers.length != room.max_user && (
                  <JoinButton
                    onClick={() => {
                      navigate(`/RoomPage/${room.id}`);
                    }}
                  >
                    Join room
                  </JoinButton>
                )}
                <Listeners>
                  Currently {room.currentUsers.length}/{room.max_user} listeners
                </Listeners>
              </RoomJoin>
            </RoomItem>
          );
        })}
      </RoomList>
    </PanelBox>
  );
}

export default RoomSearchPanel;

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
