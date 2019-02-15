import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddImageService } from './add-image.service';
import { IPictureModel } from '../types';
import { LoadImageService } from './load-image.service';

@Injectable({
  providedIn: 'root'
})
export class TransferDataService {

  constructor(private client: HttpClient, private addImage: AddImageService, private loadImage: LoadImageService) {
  }

  public Initialize(): void {
    this.SubscribeToAddImageContextChanges();
    this.LoadImagesWithSubscription();
  }

  private LoadImagesWithSubscription() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/text',
      })
    };
    this.client.get<string[]>('http://localhost:3000/get/', httpOptions).subscribe(pic => {
      pic.forEach(img => {
        this.client.get<IPictureModel>('http://localhost:3000/id/' + img).subscribe(pic1 => {
          if (pic1 !== null) {
            this.loadImage.add(pic1);
          }
        });
      });
    });
  }

  private SubscribeToAddImageContextChanges() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.addImage.context.subscribe(message => {
      if (message === null) {
        return;
      }
      this.client.post<IPictureModel>('http://localhost:3000/add/', message, httpOptions).subscribe(callback => {
      });
    });
  }
}
