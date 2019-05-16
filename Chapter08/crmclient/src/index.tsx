import "bootstrap/dist/css/bootstrap.min.css";
import * as React from 'react';
import { Nav, Navbar } from "react-bootstrap";
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
import Addresses from "./components/addresses";
import Leads from './components/leads';
import People from "./components/people";
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <Navbar bg="light">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/contacts">Contacts</Nav.Link>
        <Nav.Link href="/leads">Leads</Nav.Link>
        <Nav.Link href="/addresses">Addresses</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
    <Route path="/" component={App} />
    <Route path="/addresses" component={Addresses} />
    <Route path="/contacts" component={People} />
    <Route path="/leads" component={Leads} />
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
