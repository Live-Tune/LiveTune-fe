// ✅ RoomControlPanel.jsx
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function RoomControlPanel() {
  const navigate = useNavigate();
  return (
    <PanelBox>
      <ActionButton>Join private room</ActionButton>
      <ActionButton onClick={() => navigate("/RoomCreatePanel")}>
        Create a room
      </ActionButton>
    </PanelBox>
  );
}

export default RoomControlPanel;

const PanelBox = styled.div`
  background-color: #0f2b20;
  border-radius: 40px;
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ActionButton = styled.button`
  background: white;
  color: black;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 9999px;
  font-size: 16px;
  border: none;
  margin: 15px 0;
  cursor: pointer;
`;

