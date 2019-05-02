import { Person } from './People';
import { FirestoreService } from '../../../Common/Model/FirestoreService';

export class PersonService extends FirestoreService<Person> {
  constructor() {
    super('people');
  }
}
