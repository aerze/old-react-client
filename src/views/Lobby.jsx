import React from "react";
import { useParams, Redirect } from "react-router";
import { Container, Row, Col, FormGroup, Label, Button } from "reactstrap";
import CopyInput from "../components/CopyInput/CopyInput";
import get from "lodash/get";
import { setPlayerReady, startGame } from "../io";

export default function Lobby(props) {
  const { state, mergeState } = props;
  const { gameId } = useParams();
  const link = `https://0fify.csb.app/join-game/${gameId}`;

  const handleReady = async () => {
    const { game, player } = await setPlayerReady(
      state.game.id,
      state.player.id
    );
    mergeState({ game, player });
  };

  const handleStartGame = async () => {
    startGame({ gameId, playerId: state.player.id });
  };

  if (!state.game) {
    return <Redirect to="/" />;
  }

  if (get(state, "game.state", "") === "SCORE") {
    return <Redirect to={`/scoreboard/${gameId}`} />;
  }

  return (
    <div className="lobby">
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Mobile Mayhem</h1>
            <h4>Welcome to the "{state.game.name}" lobby</h4>
            <FormGroup>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Label>Share this link!</Label>
              </a>
              <CopyInput text={link} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button outline color="success" onClick={handleReady}>
              Ready
            </Button>
            <Button
              outline
              color="success"
              disabled={state.game.hostId !== state.player.id}
              onClick={handleStartGame}
            >
              Start Game
            </Button>
          </Col>
        </Row>
        {get(state, "game.players", []).map(player => (
          <Row key={player.id}>
            <Col>
              <p>
                {player.name} is {player.ready ? "ready" : "not ready"}
              </p>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}
