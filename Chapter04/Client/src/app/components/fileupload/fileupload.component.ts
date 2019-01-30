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

  public onImageSelected(files: any): void {
    this.preview.Preview(files).then(r => {
      this.imageSource = r;
    }).catch(r => {
      this.message = r;
    });
  }

  protected updateTags(event: any): void {
    this.tags = event.target.value;
  }

  protected updateDescription(event: any): void {
    this.description = event.target.value;
  }

  public Save(): void {
    this.imageSource.Description = this.description;
    this.imageSource.Tags = this.tags.split(` `);
    this.dialog.close(this.imageSource);
  }
}
