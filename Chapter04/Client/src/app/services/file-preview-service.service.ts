import { Injectable } from '@angular/core';

async function PreviewFile(files: any): Promise<string | ArrayBuffer> {
  return await new Promise((resolve, reject) => {
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    if (file.type.match(/image\/*/) === null) {
      reject(`The file is not an image file.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      resolve(reader.result);
    };
  });
}
@Injectable({
  providedIn: 'root'
})
export class FilePreviewService {

  public async Preview(files: any): Promise<string | ArrayBuffer> {
    const image = await PreviewFile(files);
    return image;
  }
}
