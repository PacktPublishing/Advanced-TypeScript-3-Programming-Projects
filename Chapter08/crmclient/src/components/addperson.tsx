import * as React from 'react';
import { Button, Col, Container, Form } from "react-bootstrap";
import { IPerson } from "../../../Services/People/api/Models/People";

export class AddPerson extends React.Component<any, IPerson> {

  constructor(props:any) {
    super(props);
    const person: IPerson = {
      FirstName: '',
      LastName: '',
      ServerID: ''
    }
    this.state = person;
  }

  public render() {
    return(
      <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First name</Form.Label>
            <Form.Control placeholder="Enter first name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control  placeholder="Enter last name" />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="First line of address" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>

    )
  }

}