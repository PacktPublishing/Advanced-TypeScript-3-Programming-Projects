import mongoose from "mongoose";

export type Model = mongoose.Model<mongoose.Document>

export const SecuredDatabase = {
  'secret': 'Thi$I$453c73t',
  connection: 'mongodb://localhost:27017/packt_atp_chapter_06'
};