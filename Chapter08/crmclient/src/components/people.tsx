import axios from "axios";
import * as React from 'react';
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
// import { IPerson } from "../../../Services/People/api/Models/People";

export default class People extends React.Component<any, any> {

  constructor(props:any) {
    super(props);
    this.state = {
      data: []
    }
    this.EdtableCell = this.EdtableCell.bind(this);
  }
  public render() {
    const columns = [{
      Cell: this.EdtableCell,
      Header: 'First name',
      accessor: 'FirstName'
    },{
     Cell: this.EdtableCell,
      Header: 'Last name',
      accessor: 'LastName'
    }]
    return (
      <Tabs id="tabController" defaultActiveKey="show">
        <Tab eventKey="add" title="Add person">
          <div />
        </Tab>
        <Tab eventKey="show" title="People">
          <Row>
            <Col><ReactTable data={this.state.data} columns={columns} defaultPageSize={5} pageSizeOptions = {[3, 6]} className="-striped -highlight" /></Col>
          </Row>
        </Tab>
      </Tabs>
    )
  }

  public componentWillMount(): void {
    this.Load(); 
  };

  private Load(): void {
    axios.get("http://localhost:31313/get/").then(x =>
    {
      this.setState({data: x.data});
    });
  }

  private EdtableCell(cellInfo: any) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    )
  }
}