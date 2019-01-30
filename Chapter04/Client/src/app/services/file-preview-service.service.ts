import { Injectable } from '@angular/core';
import { ImageType, IPictureModel, PictureModel } from '../types';

async function PreviewFile(files: any): Promise<IPictureModel> {
  return await new Promise((resolve, reject) => {
    const imageModel: IPictureModel = new PictureModel();
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    if (file.type.match(/image\/*/) === null) {
      reject(`The file is not an image file.`);
      return;
    }
    imageModel.Name = file.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      imageModel.Image = reader.result;
      resolve(imageModel);
    };
    reader.readAsDataURL(file);
  });
}
@Injectable({
  providedIn: 'root'
})
export class FilePreviewService {

  public async Preview(files: any): Promise<IPictureModel> {
    const imageModel = await PreviewFile(files);
    return imageModel;
  }
}
