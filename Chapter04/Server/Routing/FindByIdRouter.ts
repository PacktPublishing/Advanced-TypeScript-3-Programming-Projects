import { IRouter } from "./Router";
import { Picture } from "../Database";
import { Request, Response } from "express";

export class FindByIdRouter implements IRouter {
  public AddRoute(route: any): void {
    route.get('/id/:id', (request: Request, response: Response) => {
      Picture.findOne({ _id: request.params.id }, '-_id', (err, picture) => {
        if (err) {
          response.send(err);
        }
        response.json(picture);
      });
    });
  }
}
