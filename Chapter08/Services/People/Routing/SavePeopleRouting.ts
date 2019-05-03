import { IRouter } from "../../Common/Routing/Router";
import { Request, Response } from "express";
import { IPerson } from "../api/Models/People";
import { PersonService } from "../api/Models/PersonService";
export class SavePeopleRouting implements IRouter {
  AddRoute(route: any): void {
    route.post('/add/', (request: Request, response: Response) => {
      const person: IPerson = <IPerson>{...request.body};
      new PersonService().Save(person);
      response.json(person);
    });
  }
}
