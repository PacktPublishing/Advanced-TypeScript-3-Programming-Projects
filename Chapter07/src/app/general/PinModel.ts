export class PinModel {
  id: string;
  lat: number;
  long: number;
  name: string;
}

export interface PinModelData extends PinModel {
  storageId: string;
}