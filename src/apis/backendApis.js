const isDev = window.location.hostname === "localhost";
export const backendEndpoint = isDev
  ? "https://livetune-testing.onrender.com"
  : "https://livetune-testing.onrender.com";
//"https://livetune-testing.onrender.com"

async function actionGET(apiEntry) {
  try {
    const response = await fetch(`${backendEndpoint}${apiEntry}`);
    const data = await response.json();
    return data;
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
        name: name,
        description: description,
        max_user: maxUser,
        host: hostName,
        is_private: isPrivate,
      }),
    });
    const id = (await response.json()).id;
    return id;
  } catch (error) {
    console.log(error);
    return -1;
  }
}

export async function fetchRoomInfo(id) {
  const apiEntry = `/api/room/info?id=${id}`;
  const data = await actionGET(apiEntry);
  return data;
}

export async function fetchRoomId(name) {
  const apiEntry = `/api/room/getid?name=${name}`;
  const data = await actionGET(apiEntry);
  return data;
}
