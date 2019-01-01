import * as React from 'react';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { IPersonState } from './State';
import { AddressValidation } from './Validation/AddressValidation';
import { IValidation } from './Validation/IValidation';
import { PersonValidation } from './Validation/PersonValidation';
import { PhoneValidation } from './Validation/PhoneValidation';

interface IValidationProps {
  CurrentState : IPersonState;
  CanSave : (canSave : boolean) => void;
}
export default class FormValidation extends React.Component<IValidationProps> {
  private failures : string[];
  private validation : IValidation[];

  constructor(props : IValidationProps) {
    super(props);
    this.validation = new Array<IValidation>();
    this.validation.push(new PersonValidation());
    this.validation.push(new AddressValidation());
    this.validation.push(new PhoneValidation());
  }

  public render() {
    this.Validate();
    const errors = this.failures.map(function it(failure) {
      return (<Row key={failure}><Col><label>{failure}</label></Col></Row>);
    });
    return (<Col>{errors}</Col>)
  }

  private Validate() {
    this.failures = new Array<string>();
    this.validation.forEach(validation => {
      validation.Validate(this.props.CurrentState, this.failures);
    });

    this.props.CanSave(this.failures.length === 0);
  }
}