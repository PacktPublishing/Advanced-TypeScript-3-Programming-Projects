import { IRouter } from "../../Common/Routing/Router";
import { PersonService } from "../api/Models/PersonService";
import { Request, Response } from "express";

export class GetPeopleRouting implements IRouter {
  AddRoute(route: any): void {
    route.get('/get/', async (request: Request, response: Response) => {
      const result = await new PersonService().GetAll();
      if (result) {
        response.json(result);
      }
      response.send('');
    });
  }
}
