import mongoose from "mongoose";

export class Mongo {
  constructor(private url : string = "mongodb://localhost:27017/packt_atp_chapter_05") {
  }

  public Connect(): void {
    mongoose.connect(this.url, { useNewUrlParser: true}, (e:unknown) => {
      if (e) {
        console.log(`Unable to connect ` + e);
      } else {
        console.log(`Connected to the database`);
      }
    });
  } 
}

export type Model = mongoose.Model<mongoose.Document>