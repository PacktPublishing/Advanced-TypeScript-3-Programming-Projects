"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = require("./Router");
const Database_1 = require("../Database");
class GetPicturesRouter extends Router_1.Router {
    AddRoute(route) {
        console.log(`Route added`);
        route.get('/get/', (request, response) => {
            console.log(`Got an incoming request`);
            Database_1.Picture.distinct("_id", (err, picture) => {
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
