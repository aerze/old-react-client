import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button
} from "reactstrap";
import { Form as FinalForm, Field } from "react-final-form";
import FieldInput from "../field-components/FieldInput";
import { Link } from "react-router-dom";
import { joinGame } from "../io";
import { useHistory, useParams } from "react-router";

export default function JoinGame(props) {
  const { gameId } = useParams();
  const history = useHistory();

  const handleSubmit = async values => {
    console.log("something happend");
    const { game, player } = await joinGame(values);
    props.mergeState({ game, player });
    history.push(`/lobby/${game.id}`);
    console.log("join", game, player);
  };

  return (
    <div className="join-game">
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Mobile Mayhem</h1>
            <h4>So you wanna play?</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <FinalForm
              onSubmit={handleSubmit}
              initialValues={{ gameId, playerName: "" }}
            >
              {formProps => (
                <Form onSubmit={formProps.handleSubmit}>
                  {/* <FormGroup>
                    <Label for="lobby-name">Lobby Name</Label>
                    <Field
                      name="lobbyName"
                      component={FieldInput}
                      placeholder="lobby-name"
                    />
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="player-name">Your Name</Label>
                    <Field
                      name="playerName"
                      component={FieldInput}
                      placeholder="xXswag420gotemXx"
                    />
                  </FormGroup>
                  <Button outline color="primary">
                    Submit
                  </Button>
                  <Link to="/">
                    <Button outline color="danger" type="button">
                      Cancel
                    </Button>
                  </Link>
                </Form>
              )}
            </FinalForm>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
