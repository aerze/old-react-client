import axios from "axios";

const api = axios.create({
  baseURL: "https://f8re4-8080.sse.codesandbox.io"
});

export async function createGame({ lobbyName, playerName }) {
  const result = await api.post("/create-game", { lobbyName, playerName });
  return result.data;
}

export async function joinGame({ lobbyName, playerName }) {
  const result = await api.post("/join-game", { lobbyName, playerName });
  return result.data;
}
