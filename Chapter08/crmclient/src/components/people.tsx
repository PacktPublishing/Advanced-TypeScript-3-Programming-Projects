import axios from "axios";
import * as React from 'react';
import { Col, Row } from "react-bootstrap";

export default class People extends React.Component {

  public render() {
    return (
      <Row>
        <Col>People1</Col>
      </Row>
    )
  }

  public componentDidMount() {
    this.Load();
  }

  private Load(): void {
    axios.get("http://localhost:3001/get/").then(x =>
    {
      if (x === null) {
        return;
      }
    });
  }
}