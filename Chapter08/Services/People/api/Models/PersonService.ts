import { IPerson } from './People';
import { FirestoreService } from '../../../Common/Model/FirestoreService';

export class PersonService extends FirestoreService<IPerson> {
  constructor() {
    super('people');
  }
}
