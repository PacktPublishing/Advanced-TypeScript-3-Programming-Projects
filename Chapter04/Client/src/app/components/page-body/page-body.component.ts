import { Component, OnInit, Input } from '@angular/core';
import { AddImageService } from 'src/app/services/add-image.service';

@Component({
  selector: 'atp-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.scss']
})
export class PageBodyComponent implements OnInit {

  Pictures: Array<string|ArrayBuffer>;
  constructor(private addImage: AddImageService) {
    this.Pictures = new Array<string|ArrayBuffer>();
  }

  ngOnInit() {
    this.addImage.context.subscribe(message => {
      if (!message) {
        return;
      }
      this.Pictures.push(message);
    });
  }
}
