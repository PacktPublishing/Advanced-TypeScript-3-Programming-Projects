import * as React from 'react';
import { Form } from "react-bootstrap";
export interface IStatusProperty {
  CurrentSelection : (currentSelection:string) => void;
}
export class StatusChoice extends React.Component<IStatusProperty> {
  constructor(prop: any) {
    super(prop);
    this.Changed = this.Changed.bind(this);
  }
  public render() {
    return (<Form.Control as="select" onChange={this.Changed}>
      <option value="New">New</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </Form.Control>);
  }
  private Changed(optionSelected: any) {
    this.props.CurrentSelection(optionSelected.target.value);
  }
}
