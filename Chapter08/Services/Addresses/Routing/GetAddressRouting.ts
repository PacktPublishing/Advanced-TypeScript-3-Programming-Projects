import { IRouter } from "../../Common/Routing/Router";
import { AddressesService } from "../api/Models/AddressesService";
import { Request, Response } from "express";

export class GetAddressRouting implements IRouter {
  AddRoute(route: any): void {
    route.get('/get/', async (request: Request, response: Response) => {
      const result = await new AddressesService().GetAll();
      if (result) {
        response.json(result);
      }
      response.send('');
    });
  }
}