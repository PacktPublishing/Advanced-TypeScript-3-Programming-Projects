import { IRouter } from "../../Common/Routing/Router";
import { Request, Response } from "express";
import { ILead } from "../api/Models/Lead";
import { LeadsService } from "../api/Models/LeadService";
export class SaveLeadsRouting implements IRouter {
  AddRoute(route: any): void {
    route.post('/add/', (request: Request, response: Response) => {
      const person: ILead = <ILead>{...request.body};
      new LeadsService().Save(person);
      response.json(person);
    });
  }
}