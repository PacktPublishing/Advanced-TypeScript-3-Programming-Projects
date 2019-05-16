import axios from "axios";
import * as React from 'react';
import { Form } from "react-bootstrap";

interface IPeopleProperty {
  CurrentSelection : (currentSelection:string) => void;
}
// tslint:disable-next-line: max-classes-per-file
export class PeopleChoice extends React.Component<IPeopleProperty, Map<string,string>> {
  private options: Map<string, string>;
  constructor(prop: IPeopleProperty) {
    super(prop);
    this.options = new Map<string, string>();
    this.Changed = this.Changed.bind(this);
    this.state = this.options;
  }
  public componentWillMount(): void {
    this.LoadPeople(); 
  };

  public render() {
    return (<Form.Control as="select" onChange={this.Changed}>
      {this.RenderList()}
    </Form.Control>)
  }

  private RenderList(): any[] {
    const optionsTemplate: any[] = [];
    this.options.forEach((value, key) => (
      optionsTemplate.push(<option key={key} value={value}>{value}</option>)
    ));
    return optionsTemplate;
  }

  private Changed(optionSelected: any) {
    this.props.CurrentSelection(optionSelected.target.value);
  }

  private LoadPeople(): void {
    axios.get("http://localhost:31313/get/").then(result =>
    {
      result.data.forEach((person: any) => {
        this.options.set(person.ServerID, `${person.FirstName} ${person.LastName}`);
      });
      this.setState(this.options);
    });
  }
}