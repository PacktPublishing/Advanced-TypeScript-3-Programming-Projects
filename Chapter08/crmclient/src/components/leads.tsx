import axios from "axios";
import * as React from 'react';
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { AddLead } from './AddLead';

export default class Leads extends React.Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      data: []
    }
  }
  
  public render() {
    const columns = [{
      Header: 'Name',
      accessor: 'Name'
    }, {
      Header: 'Topic',
      accessor: 'Topic'
    }, {
      Header: 'Created',
      accessor: 'Created'
    }, {
      Header: 'Status',
      accessor: 'Status'
    }]
    return (
      <Tabs id="tabController" defaultActiveKey="show" onSelect={this.TabSelected}>
        <Tab eventKey="add" title="Add lead">
          <AddLead />
        </Tab>
        <Tab eventKey="show" title="Leads">
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
    axios.get("http://localhost:65432/get/").then(x =>
    {
      this.setState({data: x.data});
    });
  }

  private Load(): void {
    axios.get("http://localhost:65432/get/").then(x =>
    {
      this.setState({data: x.data});
    });
  }
}