import { IAddress } from './Addresses';
import { FirestoreService } from '../../../Common/Model/FirestoreService';

export class AddressesService extends FirestoreService<IAddress> {
  constructor() {
    super('addresses');
  }
}
