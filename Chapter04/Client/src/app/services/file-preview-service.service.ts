import { Injectable } from '@angular/core';
import { IPictureModel, PictureModel } from '../types';

@Injectable({
  providedIn: 'root'
})
export class FilePreviewService {
  public Preview(files: any): Promise<IPictureModel> {
    return new Promise((resolve, reject) => {
      if (files.length === 0) {
        return;
      }
      const file = files[0];
      if (file.type.match(/image\/*/) === null) {
        reject(`The file is not an image file.`);
        return;
      }
      const imageModel: IPictureModel = new PictureModel();
      imageModel.Name = file.name;
      const reader = new FileReader();
      reader.onload = (evt) => {
        imageModel.Image = reader.result;
        resolve(imageModel);
      };
      reader.readAsDataURL(file);
    });
  }
}
