import axios from "axios";
import * as React from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { IAddress } from '../../../Services/Addresses/api/Models/Addresses';

export class AddAddress extends React.Component<any, IAddress> {
  private defaultState: Readonly<IAddress>;
  constructor(props:any) {
    super(props);
    this.defaultState = {
      Line1: '',
      Line2: '',
      Line3: '',
      Line4: '',
      PostalCode: '',
      ServerID: '',
    };
    const address: IAddress = this.defaultState;
    this.state = address;
    this.Save = this.Save.bind(this);
  }

  public render() {
    return (
      <Container>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="First line of address" id="address1" value={this.state.Line1} onChange={this.UpdateBinding} />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control  id="address2" value={this.state.Line2} onChange={this.UpdateBinding} />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 3</Form.Label>
          <Form.Control  id="address3" value={this.state.Line3} onChange={this.UpdateBinding} />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 4</Form.Label>
          <Form.Control  id="address4" value={this.state.Line4} onChange={this.UpdateBinding} />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control  id="zipcode" value={this.state.PostalCode} onChange={this.UpdateBinding}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.Save}>
          Submit
        </Button>
      </Container>
    )
  }
  
  private Save(): void {
    const address: IAddress = {
      Line1: this.state.Line1,
      Line2: this.state.Line2,
      Line3: this.state.Line3,
      Line4: this.state.Line4,
      PostalCode: this.state.PostalCode,
      ServerID: ''
    }
    axios.post("http://localhost:17171/add/", address);
    this.setState(this.defaultState);
  }

  private UpdateBinding = (event: any) => {
    switch (event.target.id) {
      case `address1`:
        this.setState({ Line1: event.target.value});
        break;
      case `address2`:
        this.setState({ Line2: event.target.value});
        break;
      case `address3`:
        this.setState({ Line3: event.target.value});
        break;
      case `address4`:
        this.setState({ Line4: event.target.value});
        break;
      case `zipcode`:
        this.setState({ PostalCode: event.target.value});
        break;
    }
  }
}