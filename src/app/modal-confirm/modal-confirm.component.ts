import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {
  type: any;
  billerName: any;
  amount: any;
  error: any;
  comments = false;
  isToken: any;
  msg: any;

  constructor(public dialogRef: MatDialogRef<ModalConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.type = this.data.type;
    this.billerName = this.data.billerName;
    this.amount = this.data.amount;
    this.error = this.data.error;
    this.isToken = this.data.isToken;
    this.msg = this.data.msg;

  }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.dialogRef.close({resp: true});
  }
  onCloseCancel() {
    this.dialogRef.close();
  }
}
