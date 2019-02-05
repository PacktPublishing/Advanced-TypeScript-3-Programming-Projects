"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../Database");
class FindByIdRouter {
    AddRoute(route) {
        route.get('/id/:id', (request, response) => {
            Database_1.Picture.findOne({ _id: request.params.id }, '-_id', (err, picture) => {
                if (err) {
                    response.send(err);
                }
                response.json(picture);
            });
        });
    }
}
exports.FindByIdRouter = FindByIdRouter;
