import { IRouter } from "../../Common/Routing/Router";
import { Request, Response } from "express";
import { IAddress } from "../api/Models/Addresses";
import { AddressesService } from "../api/Models/AddressesService";
export class SaveAddressRouting implements IRouter {
  AddRoute(route: any): void {
    route.post('/add/', (request: Request, response: Response) => {
      const person: IAddress = <IAddress>{...request.body};
      new AddressesService().Save(person);
      response.json(person);
    });
  }
}