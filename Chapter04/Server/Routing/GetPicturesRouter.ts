import { Router } from "./Router";
import { Picture } from "../Database";
export class GetPicturesRouter extends Router {
  public AddRoute(route: any): void {
    route.get('/get/', (request: Request, response: any) => {
      Picture.distinct("_id", (err, picture) => {
        if (err) {
          response.send(err);
        }
        const results: string[] = new Array<string>();
        picture.forEach(pic => {
          results.push(pic);
        });
        response.send(results);
      });
    });
  }
}
