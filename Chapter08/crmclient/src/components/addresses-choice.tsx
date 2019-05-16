import axios, { AxiosResponse } from "axios";
import * as React from 'react';
import { Form } from "react-bootstrap";
import { IAddress } from '../../../Services/Addresses/api/Models/Addresses';

interface IAddressProperty {
  CurrentSelection : (currentSelection:IAddress | null) => void;
}
export class AddressesChoice extends React.Component<IAddressProperty, Map<string, string>> {
  private options: Map<string, string>;
  private addresses: IAddress[] = [];
  constructor(prop: IAddressProperty) {
    super(prop);
    this.options = new Map<string, string>();
    this.Changed = this.Changed.bind(this);
    this.state = this.options;
  }

  public render() {
    return (<Form.Control as="select" onChange={this.Changed}>
      <option>Select...</option>
      {this.RenderList()}
    </Form.Control>)
  }

  public componentDidMount() {
    this.LoadAddreses();
  }

  private RenderList(): any[] {
    const optionsTemplate: any[] = [];
    this.options.forEach((value, key) => (
      optionsTemplate.push(<option key={key} value={key}>{value}</option>)
    ));
    return optionsTemplate;
  }

  private Changed(optionSelected: any) {
    // Because this.addresses is an array of objects, we use Object.values to get the values that
    // we can then search using find.
    const address = Object.values(this.addresses).find(x => x.ServerID === optionSelected.target.value);
    if (address) {
      this.props.CurrentSelection(address);
    } else {
      this.props.CurrentSelection(null);
    }
  }
  private LoadAddreses(): void {
    axios.get("http://localhost:17171/get/").then((result:AxiosResponse<any>) =>
    {
      result.data.forEach((person: any) => {
        this.options.set(person.ServerID, `${person.Line1} ${person.Line2} ${person.Line3} ${person.Line4} ${person.PostalCode}`);
      });
      this.addresses = { ...result.data };
      this.setState(this.options);
    });
  }
}