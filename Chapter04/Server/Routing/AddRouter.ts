import { Router } from "./Router";
import { Picture } from "../Database";

export class AddPictureRouter extends Router {
    public AddRoute(route: any): void {
        route.post('/add/', (request: Request, response: any) => {
          const picture = new Picture(request.body);
          picture.save((err, picture) => {
            if (err) {
              response.send(err);
            }
            response.json(picture);
          });
        });
    }
}


