"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./Router");
const Database_1 = require("../Database");
class AddPictureRouter extends Router_1.Router {
    AddRoute(route) {
        route.post('/add/', (request, response) => {
            const picture = new Database_1.Picture(request.body);
            picture.save((err, picture) => {
                if (err) {
                    response.send(err);
                }
                response.json(picture);
            });
        });
    }
}
exports.AddPictureRouter = AddPictureRouter;
