//proxy used for avoiding cors error
const backendEndpoint = "/backend_proxy";

async function actionGET(apiEntry) {
  try {
    const response = await fetch(`${backendEndpoint}${apiEntry}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchAvailableRooms() {
  const apiEntry = "/api/room/availablepublicrooms";
  const data = await actionGET(apiEntry);
  return data;
}

export async function fetchCreateNewRoom(
  name,
  description,
  maxUser,
  hostName,
  isPrivate
) {
  const apiEntry = "/api/room/createnew";
  try {
    const response = await fetch(`${backendEndpoint}${apiEntry}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_name: name,
        room_description: description,
        room_maxUser: maxUser,
        room_host: hostName,
        is_room_private: isPrivate,
      }),
    });
    return response.status === 201;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function fetchRoomInfo(id) {
  const apiEntry = `/api/room/info?id=${id}`;
  const data = await actionGET(apiEntry);
  return data;
}

// https://github.com/Live-Tune/LiveTune-fe/tree/develop
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://docs.google.com/spreadsheets/d/1CB3e7uP1XW9euZK55dnhjcaGpV6QS_ECmaFs6Z4nfPA/edit?gid=0#gid=0
