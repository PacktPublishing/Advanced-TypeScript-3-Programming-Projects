import { ILead } from './Lead';
import { FirestoreService } from '../../../Common/Model/FirestoreService';

export class LeadsService extends FirestoreService<ILead> {
  constructor() {
    super('leads');
  }
}
