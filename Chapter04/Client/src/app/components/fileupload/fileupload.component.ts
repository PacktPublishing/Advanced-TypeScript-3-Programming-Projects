import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilePreviewService } from 'src/app/services/file-preview-service.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { IPictureModel, PictureModel } from 'src/app/types';

@Component({
  selector: 'atp-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  protected imageSource: IPictureModel | null;
  protected message: any;
  protected description: string;
  protected tags: string;

  constructor(
    private dialog: MatDialogRef<FileuploadComponent>,
    private preview: FilePreviewService) { }

  ngOnInit() {
  }

  public OnImageSelected(files: any): void {
    this.preview.Preview(files).then(r => {
      this.imageSource = r;
    }).catch(r => {
      this.message = r;
    });
  }

  public Save(): void {
    this.imageSource.Description = this.description;
    this.imageSource.Tags = this.tags;
    this.dialog.close(this.imageSource);
  }
}
