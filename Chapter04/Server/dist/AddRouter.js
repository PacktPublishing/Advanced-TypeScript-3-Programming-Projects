"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./Router");
const Database_1 = require("./Database");
class AddPictureRouter extends Router_1.Router {
    constructor() {
        super();
        console.log("Adding AddPictureBox");
    }
    AddRoute(route) {
        console.log("Adding AddPictureBox");
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
class GetPicturesRouter extends Router_1.Router {
    AddRoute(route) {
        route.get('/get/', (request, response) => {
            Database_1.Picture.distinct("Name", (err, picture) => {
                if (err) {
                    response.send(err);
                }
                const results = new Array();
                picture.forEach(pic => {
                    results.push(pic);
                });
                response.send(results);
            });
        });
    }
}
exports.GetPicturesRouter = GetPicturesRouter;
class FindByIdRouter extends Router_1.Router {
    AddRoute(route) {
        route.get('/id/:id', (request, response) => {
            Database_1.Picture.findOne({ Name: request.params.id }, '-_id', (err, picture) => {
                if (err) {
                    response.send(err);
                }
                response.json(picture);
            });
        });
    }
}
exports.FindByIdRouter = FindByIdRouter;
