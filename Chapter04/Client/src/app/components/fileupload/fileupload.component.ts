import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilePreviewService } from 'src/app/services/file-preview-service.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'atp-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  private selectedFile: File = null;
  protected imageSource: string | ArrayBuffer;
  protected message: any;
  protected form: FormGroup;

  constructor(
    private dialog: MatDialogRef<FileuploadComponent>,
    private preview: FilePreviewService) { }

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
    // this.client.post('http://localhost:3000/', formData).subscribe(res => {
    //   console.log(res);
    // });
  }

  public Save(): void {
    this.dialog.close(this.imageSource);
  }
}
