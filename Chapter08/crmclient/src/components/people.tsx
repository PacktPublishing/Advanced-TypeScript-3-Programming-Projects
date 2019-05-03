import axios from "axios";
import * as React from 'react';
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { AddPerson } from "./addperson"
// import { IPerson } from "../../../Services/People/api/Models/People";

export default class People extends React.Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      data: []
    }
  }

  public render() {
    const columns = [{
      Header: 'First name',
      accessor: 'FirstName'
    },{
      Header: 'Last name',
      accessor: 'LastName'
    }]
    return (
      <Tabs id="tabController" defaultActiveKey="show" onSelect={this.ContactTabSelected}>
        <Tab eventKey="add" title="Add contact">
          <AddPerson />
        </Tab>
        <Tab eventKey="show" title="Contacts">
          <Row>
            <Col><ReactTable data={this.state.data} columns={columns} defaultPageSize={15} pageSizeOptions = {[10, 30]} className="-striped -highlight" /></Col>
          </Row>
        </Tab>
      </Tabs>
    )
  }

  public componentWillMount(): void {
    this.Load(); 
  };

  private ContactTabSelected(): void {
    axios.get("http://localhost:31313/get/").then(x =>
    {
      this.setState({data: x.data});
    });
  }

  private Load(): void {
    axios.get("http://localhost:31313/get/").then(x =>
    {
      this.setState({data: x.data});
    });
  }
}