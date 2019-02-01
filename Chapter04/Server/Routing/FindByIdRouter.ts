import { Router } from "./Router";
import { Picture } from "../Database";
export class FindByIdRouter extends Router {
  public AddRoute(route: any): void {
    route.get('/id/:id', (request: any, response: any) => {
      Picture.findOne({ _id: request.params.id }, '-_id', (err, picture) => {
        if (err) {
          response.send(err);
        }
        response.json(picture);
      });
    });
  }
}
