"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
class Mongo {
    constructor(url = "mongodb://localhost:27017/packt_atp_chapter_04") {
        this.url = url;
    }
    Connect() {
        mongoose_1.default.connect(this.url, (e) => {
            if (e) {
                console.log(`Unable to connect ` + e);
            }
            else {
                console.log(`Connected to the database`);
            }
        });
    }
}
exports.Mongo = Mongo;
exports.PictureSchema = new mongoose_1.Schema({
    Image: String,
    Name: String,
    Description: String,
    Tags: String,
});
exports.Picture = mongoose_1.default.model('picture', exports.PictureSchema);
