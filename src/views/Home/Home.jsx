import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

import "./Home.scss";

export default function Home(props) {
  const { connected } = props.state;

  return (
    <div className="home">
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Mobile Mayhem</h1>
            <h4>Share it with your friends!</h4>
            {!connected && <p>Establishing connection</p>}
            {connected && <p>Connected!</p>}
          </Col>
        </Row>
        {connected && (
          <>
            <Row>
              <Col>
                <Link to="/create-game">
                  <Button outline color="success" size="lg">
                    Create Game
                  </Button>
                </Link>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <Link to="/join-game">
                  <Button outline color="primary" size="lg">
                    Join Game
                  </Button>
                </Link>
              </Col>
            </Row> */}
          </>
        )}
      </Container>
    </div>
  );
}
