import { IRouter } from "../../Common/Routing/Router";
import { LeadsService } from "../api/Models/LeadService";
import { Request, Response } from "express";

export class GetLeadsRouting implements IRouter {
  AddRoute(route: any): void {
    route.get('/get/', async (request: Request, response: Response) => {
      const result = await new LeadsService().GetAll();
      if (result) {
        response.json(result);
      }
      response.send('');
    });
  }
}