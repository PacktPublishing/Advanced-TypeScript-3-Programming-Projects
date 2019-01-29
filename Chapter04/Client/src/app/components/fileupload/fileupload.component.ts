import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilePreviewService } from 'src/app/services/file-preview-service.service';

@Component({
  selector: 'atp-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  private selectedFile: File = null;
  protected imageSource: any;
  protected message: any;

  constructor(private client: HttpClient, private preview: FilePreviewService) { }

  ngOnInit() {
  }

  public onImageSelected(files: any): void {
    this.preview.Preview(files).then(r => {
      this.imageSource = r;
    }).catch(r => {
      this.message = r;
    });
  }

  public onLoad(): void {
    const formData = new FormData();
    formData.append('img', this.selectedFile, this.selectedFile.name);
    // this.client.post('http://localhost:3000/', formData).subscribe(res => {
    //   console.log(res);
    // });
  }
}
