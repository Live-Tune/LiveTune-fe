const isDev =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";
export const backendEndpoint = isDev
  ? "http://localhost:5000"
  : "https://sootation.synology.me:8001";
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

async function actionPOST(apiEntry, body) {
  try {
    const response = await fetch(`${backendEndpoint}${apiEntry}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
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
  hostUid,
  isPrivate
) {
  const apiEntry = "/api/room/createnew";
  const data = await actionPOST(apiEntry, {
    name: name,
    description: description,
    max_user: maxUser,
    host: hostUid,
    is_private: isPrivate,
  });
  if (data) {
    return data.id;
  } else {
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

// Users
export async function fetchCreateNewUser(name) {
  const apiEntry = `/api/user/create`;
  const data = await actionPOST(apiEntry, {
    username: name,
  });
  if (data) {
    return data.uid;
  } else {
    return null;
  }
}

export async function fetchUserInfo(uid) {
  const apiEntry = `/api/user/info?id=${uid}`;
  const data = await actionGET(apiEntry);
  return data;
}

export async function fetchVideoTitle(yid) {
  const apiEntry = `/api/video/title?youtubeid=${yid}`;
  const data = await actionGET(apiEntry);
  const title = data?.title;
  return title;
}

export async function fetchPlaylistById(playlistId) {
  const apiEntry = `/api/video/getplaylist?playlistid=${playlistId}`;
  const data = await actionGET(apiEntry);
  return data?.videos || [];
}
