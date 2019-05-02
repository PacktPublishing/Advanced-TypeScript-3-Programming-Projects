// import axios from "axios";
import * as React from 'react';
import { Container } from "react-bootstrap";
import './App.css';

export class App extends React.Component {
  public render() {
    // if (!this.rendered) {
    //   // axios.get("http://localhost:3001/get/?ServerID=Rwww5nMvcYwgierlbZ4q");
    //   // axios.post("http://localhost:3001/add/", {
    //   //   FirstName: 'John',
    //   //   LastName: 'Smith'
    //   // })
    //   this.rendered = true;
    // }
    return (
      <Container fluid={true}>
        <div />
      </Container>
    );
  }

  private ReadData(): void {
    axios
  }
}

export default App;
