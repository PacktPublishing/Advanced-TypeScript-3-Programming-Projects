import axios from "axios";
import * as React from 'react';
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { AddAddress } from './AddAddress';

export default class Addresses extends React.Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      data: []
    }
  }

  public render() {
    const columns = [{
      Header: 'Address line 1',
      accessor: 'Line1'
    }, {
      Header: 'Address line 2',
      accessor: 'Line2'
    }, {
      Header: 'Address line 3',
      accessor: 'Line4'
    }, {
      Header: 'Address line 4',
      accessor: 'Line4'
    }, {
      Header: 'Postal code',
      accessor: 'PostalCode'
    }]
    return (
      <Tabs id="tabController" defaultActiveKey="show" onSelect={this.ContactTabSelected}>
        <Tab eventKey="add" title="Add address">
          <AddAddress />
        </Tab>
        <Tab eventKey="show" title="Addresses">
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
    axios.get("http://localhost:17171/get/").then(x =>
    {
      this.setState({data: x.data});
    });
  }

  private Load(): void {
    axios.get("http://localhost:17171/get/").then(x =>
    {
      this.setState({data: x.data});
    });
  }
}