import Axios from 'axios';
import * as React from 'react';
import { Button, Col, Container, Form } from "react-bootstrap";
import { IAddress } from '../../../Services/Addresses/api/Models/Addresses';
import { IPerson } from "../../../Services/People/api/Models/People";
import { AddressesChoice } from './addresses-choice';

export class AddPerson extends React.Component<any, IPerson> {
  private defaultAddress : IAddress;
  constructor(props:any) {
    super(props);
    this.defaultAddress = {
      Line1: '',
      Line2: '',
      Line3: '',
      Line4: '',
      PostalCode: '',
      ServerID: '',
    }
    const person : IPerson = {
      Address: this.defaultAddress,
      FirstName: '',
      LastName: '',
      ServerID: '',
    }
    this.state = person;
    this.Save = this.Save.bind(this);
    this.CurrentSelection = this.CurrentSelection.bind(this);
  }

  public render() {
    return(
      <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First name</Form.Label>
            <Form.Control id="firstName" value={this.state.FirstName} onChange={this.UpdateBinding} placeholder="Enter first name" />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last name</Form.Label>
            <Form.Control id="lastName" value={this.state.LastName} onChange={this.UpdateBinding} placeholder="Enter last name" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group>
            <Form.Label>Choose address</Form.Label>
            <AddressesChoice CurrentSelection={this.CurrentSelection} />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" onClick={this.Save}>
          Submit
        </Button>
      </Form>
    </Container>

    )
  }

  private UpdateBinding = (event:any) => {
    switch (event.target.id)
    {
      case "firstName":
        this.setState({FirstName : event.target.value});
        break;
      case "lastName":
        this.setState({LastName : event.target.value});
        break;
    }
  }

  private Save(): void {
    Axios.post("http://localhost:31313/add/", this.state);
  }

  private CurrentSelection(address: IAddress | null) {
    if (address) {
      this.setState({ Address: address });
    } else {
      this.setState({ Address: this.defaultAddress });
    }
  }
}