import mongoose, { Schema } from "mongoose";

export class Mongo {
  constructor(private url : string = "mongodb://localhost:27017/packt_atp_chapter_04") {
  }

  public Connect(): void {
    mongoose.connect(this.url, (e:any) => {
      if (e) {
        console.log(`Unable to connect ` + e);
      } else {
        console.log(`Connected to the database`);
      }
    });
  } 
}

export const PictureSchema = new Schema({
  Image: String,
  Name: String,
  Description: String,
  Tags: String,
});

export const Picture = mongoose.model('picture', PictureSchema);
