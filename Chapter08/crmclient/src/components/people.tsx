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
    this.Load = this.Load.bind(this);
  }

  public render() {
    const columns = [{
      Header: 'First name',
      accessor: 'FirstName'
    },{
      Header: 'Last name',
      accessor: 'LastName'
    }, {
      Header: 'Address line 1',
      accessor: 'Address.Line1'
    }, {
      Header: 'Address line 2',
      accessor: 'Address.Line2'
    }, {
      Header: 'Address line 3',
      accessor: 'Address.Line4'
    }, {
      Header: 'Address line 4',
      accessor: 'Address.Line4'
    }, {
      Header: 'Postal code',
      accessor: 'Address.PostalCode'
    }]
    return (
      <Tabs id="tabController" defaultActiveKey="show" onSelect={this.TabSelected}>
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

  private TabSelected(): void {
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