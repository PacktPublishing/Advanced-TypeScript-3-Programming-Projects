import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FileuploadComponent } from './components/fileupload/fileupload.component';

@Component({
  selector: 'atp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private dialogRef: MatDialogRef<FileuploadComponent>;
  constructor(private dialog: MatDialog) {

  }

  public ImportImage(): void {
    this.dialogRef = this.dialog.open(FileuploadComponent);
  }
}
