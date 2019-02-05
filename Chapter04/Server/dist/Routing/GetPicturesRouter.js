"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../Database");
class GetPicturesRouter {
    AddRoute(route) {
        route.get('/get/', (request, response) => {
            Database_1.Picture.distinct("_id", (err, picture) => {
                if (err) {
                    response.send(err);
                }
                response.send(picture);
            });
        });
    }
}
exports.GetPicturesRouter = GetPicturesRouter;
