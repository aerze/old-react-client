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
import { useHistory } from "react-router";
import { createGame } from "../io";

export default function CreateGame(props) {
  const history = useHistory();
  const handleSubmit = async values => {
    const { game, player } = await createGame(values);
    props.mergeState({ game, player });
    history.push(`/lobby/${game.id}`);
  };

  return (
    <div className="create-game">
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Mobile Mayhem</h1>
            <h4>Create a new lobby!</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <FinalForm
              onSubmit={handleSubmit}
              initialValues={{ lobbyName: "", playerName: "" }}
            >
              {formProps => (
                <Form onSubmit={formProps.handleSubmit}>
                  <FormGroup>
                    <Label for="lobby-name">Lobby Name</Label>
                    <Field
                      id="lobby-name"
                      name="lobbyName"
                      component={FieldInput}
                      placeholder="lobby-name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="player-name">Your Name</Label>
                    <Field
                      name="playerName"
                      component={FieldInput}
                      placeholder="xXswag420gotemXx"
                    />
                  </FormGroup>
                  <Button
                    outline
                    color="primary"
                    disabled={formProps.submitting}
                  >
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
