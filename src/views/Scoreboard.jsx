import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import get from "lodash/get";
import { Redirect } from "react-router";
import { startGame } from "../io";

function sortByName(a, b) {
  return b.name - a.name;
}

function sortByScore(a, b) {
  return b.score - a.score;
}

export default function Scoreboard(props) {
  const { state } = props;

  if (!get(state, "game.id")) {
    return <Redirect to="/" />;
  }

  if (state.game.state === "GAME") {
    switch (state.game.micro) {
      case "SPEED":
        return <Redirect to="/microgame/speed/" />;
      default:
        return;
    }
  }

  const handleStartGame = async () => {
    startGame({ gameId: state.game.id });
  };

  return (
    <div className="scoreboard">
      <Container>
        <Row>
          <Col>
            <h1>Mobile Mayhem</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              outline
              color="success"
              disabled={!state.lobbyIsReady}
              onClick={handleStartGame}
            >
              Start Game
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ol>
              {get(state, "game.players", [])
                .sort(sortByName)
                .sort(sortByScore)
                .map(p => (
                  <li>
                    {p.score} - {p.name}
                  </li>
                ))}
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
