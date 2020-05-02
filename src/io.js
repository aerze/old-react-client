import io from "socket.io-client";

// const SERVER_ADDRESS = 'https://f8re4-8080.sse.codesandbox.io'
const SERVER_ADDRESS = "localhost:8080";

const socket = io(SERVER_ADDRESS, {
  autoConnect: false
});

export function connect(mergeState) {
  socket.on("connect", () => mergeState({ connected: true }));
  socket.on("disconnect", () => mergeState({ connected: false }));
  socket.on("update", state => mergeState(state));

  // host only event listeners
  socket.on("LOBBY_READY", handleLobbyIsReady);
  socket.on("LOBBY_UNREADY", handleLobbyIsUnready);

  function handleLobbyIsReady() {
    console.log("lobbyIsReady", true);
    mergeState({ lobbyIsReady: true });
  }

  function handleLobbyIsUnready() {
    console.log("lobbyIsReady", false);
    mergeState({ lobbyIsReady: false });
  }

  socket.open();
}

export function createGame({ lobbyName, playerName }) {
  return new Promise((resolve, reject) => {
    socket.emit("CREATE_GAME", { lobbyName, playerName }, data => {
      resolve(data);
    });
  });
}

export function joinGame({ gameId, playerName }) {
  return new Promise((resolve, reject) => {
    socket.emit("JOIN_GAME", { gameId, playerName }, resolve);
  });
}

export function startGame({ gameId, playerId }) {
  socket.emit("START_GAME", { gameId, playerId });
}

export function setPlayerReady(gameId, playerId) {
  return new Promise((resolve, reject) => {
    socket.emit("PLAYER_READY", { gameId, playerId }, resolve);
  });
}

export function playerReportStore(gameId, playerId, score) {
  return new Promise((resolve, reject) => {
    socket.emit("PLAYER_SCORE", { gameId, playerId, score }, resolve);
  });
}
