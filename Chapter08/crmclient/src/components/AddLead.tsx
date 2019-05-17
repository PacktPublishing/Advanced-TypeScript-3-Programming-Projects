import Axios from 'axios';
import * as React from 'react';
import { Button, Col, Container, Form } from "react-bootstrap";
import { ILead } from "../../../Services/Leads/api/Models/Lead";
import { PeopleChoice } from './people-choice';
import { StatusChoice } from './StatusChoice';

export class AddLead extends React.Component<any, ILead> {
  constructor(props: any) {
    super(props);
    const lead: ILead = {
      Created: new Date(),
      Name: '',
      ServerID: '',
      Status: 'New',
      Topic: '',
    }
    this.state = lead;
    this.CurrentSelection = this.CurrentSelection.bind(this);
    this.CurrentStatus = this.CurrentStatus.bind(this);
    this.Save = this.Save.bind(this);
  }
  public render() {
    return (<Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Choose name</Form.Label>
            <PeopleChoice CurrentSelection={this.CurrentSelection} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Topic</Form.Label>
            <Form.Control id="topic" value={this.state.Topic} onChange={this.UpdateBinding} placeholder="Enter topic" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <StatusChoice CurrentSelection={this.CurrentStatus} />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" onClick={this.Save}>
          Submit
        </Button>
      </Form>
    </Container>)
  }

  private UpdateBinding = (event:any) => {
    switch (event.target.id)
    {
      case "topic":
        this.setState({Topic : event.target.value});
        break;
    }
  }

  private Save(): void {
    Axios.post("http://localhost:65432/add/", this.state);
  }

  private CurrentSelection(person: string) {
    this.setState({ Name: person });
  }

  private CurrentStatus(status: string) {
    this.setState({ Status: status });
  }
}