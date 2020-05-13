import { Component, OnInit } from '@angular/core';
import {DoctorsService} from "../../services/doctors.service";
import {ActivatedRoute} from "@angular/router";
import {ModalConfirmComponent} from "../../modal-confirm/modal-confirm.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-doctors-check-user',
  templateUrl: './doctors-check-user.component.html',
  styleUrls: ['./doctors-check-user.component.scss']
})
export class DoctorsCheckUserComponent implements OnInit {
  tokenIntern: any;
  load = true;
  token: any;
  suscriptor = false;
  checkTerm = false;
  div = 'init';

  constructor(private doctorsServices: DoctorsService, private route: ActivatedRoute, public dialog: MatDialog) {

    this.route.params.subscribe(params => {
      this.tokenIntern = params.id;
    });
    this.checkUser();
  }

  ngOnInit(): void {

  }
  checkUser(){
    this.doctorsServices.recoverToken(this.tokenIntern).then((resp: any) => {
     console.log(resp)
      this.token = resp.data.token;
     console.log(this.token)
      this.getStatus()
    }, (err) => {
      this.load = false;
      console.log(err.error.msg);
      console.log(err.error.code);
      this.showError(err.error.msg,true)
    });
  }
  getStatus(){
    this.doctorsServices.checkUser(this.token).then((resp: any) => {

      let id = resp.data.id
      let status = resp.data.status
      let exist = resp.data.exist
      console.log(id ,status , exist)

    }, (err) => {
      this.load = false;
      console.log(err.error.msg);
      console.log(err.error.code);
      this.showError(err.error.msg,true)
    });
  }
  showError(msg, errToken = false){
    this.dialog.open(ModalConfirmComponent, {
      minWidth: 'calc(100vw - 32px)',
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: { type: 'error', error: msg, isToken: errToken}
    });
  }
  prueba(){
    if (this.checkTerm){
      console.log("vamos a contratar!!")
      this.div = 'muestralos'
    }
  }

}
