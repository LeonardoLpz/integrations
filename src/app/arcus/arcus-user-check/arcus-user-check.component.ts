import { Component, OnInit } from '@angular/core';
import {ArcusService} from '../../services/arcus.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {GeneralService} from '../../services/general.service';
import {ModalConfirmComponent} from '../../modal-confirm/modal-confirm.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-arcus-user-check',
  templateUrl: './arcus-user-check.component.html',
  styleUrls: ['./arcus-user-check.component.scss']
})
export class ArcusUserCheckComponent implements OnInit {
  tokenIntern: any;
  userToken: any;
  listHistory: any;
  listServices: any;
  load = true;
  infoDetail: any;
  viewType: any;
  balance: any;
  userId: any;
  showBackServ = false;
  infoServices: any;
  infoServiceDetail: any;
  data: any = {};
  categorySelect: any;
  txtButtonServPay = 'Realizar Pago';
  showErrorNumber = false;
  showErrorAlias = false;
  showErrorAmount = false;
  showTxtAmount = false;
  paidBill = false;

  constructor(private arcusServ: ArcusService, private gralService: GeneralService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.tokenIntern = params.id;
    });
    this.checkUser();
  }

  ngOnInit(): void {
  }
  //this.router.navigate(['arcus/history']);
  //this.router.navigate(['arcus/history', id]);

  checkUser(){
    //this.gralService.showloading(true);
    this.arcusServ.recoverToken(this.tokenIntern).then((resp: any) => {
      this.arcusServ.setBarerToekn(resp.data.token);
      this.userToken = resp.data.token;
      this.getHistory();
    }, (err) => {
      this.load = false;
      this.showError(err.error.msg, true);
      console.log(err.error.msg);
      console.log(err.error.code);
    });
  }

  getHistory(){
    this.arcusServ.userHistory(this.userToken).then((resp: any) => {
      this.load = false;
      if(resp.data.success){
        this.listHistory = resp.data.list;
        this.listServices = null;
        this.arcusServ.setListUserHistory(resp.data.list);
        this.viewType = 'history';
      }else{
        this.viewType = 'services';
        this.listHistory = null;
        this.listServices = resp.data.list;
      }
    }, (err) => {
      this.load = false;
      if(err.status){
        this.showError('Token inválido');
      }else{
        this.showError(err.error.msg);
      }
    });
  }

  detail(id){
    this.load = true;
    this.arcusServ.userHistoryDetail(id, this.userToken).then((resp: any) => {
      this.load = false;
      this.infoDetail = resp.data;
      this.viewType = 'historyDetail';
    }, (err) => {
      this.load = false;
      if(err.status){
        this.showError('Token inválido');
      }else{
        this.showError(err.error.msg);
      }
    });
  }

  historyBack(){
    this.infoDetail = null;
    this.viewType = 'history';
  }

  newPayment(){
    this.load = true;
    this.arcusServ.getServices(this.userToken).then((resp: any) => {
      this.load = false;
      this.showBackServ = true;
      this.viewType = 'services';
      this.listServices = resp.data.services;
      this.balance = resp.data.balance;
      this.userId = resp.data.userId;
    }, (err) => {
      this.load = false;
      if(err.status){
        this.showError('Token inválido');
      }else{
        this.showError(err.error.msg);
      }
    });
  }

  detailService(id){
    this.categorySelect = id;
    this.infoServices = this.listServices.find(x => x.id === id);
    this.viewType = 'serviceDetail';
  }

  detailBiller(id, isgift = null){
    console.log(id, isgift);
    if(isgift){
      this.infoServiceDetail = this.infoServiceDetail.items.find(x => x.id === id);
      this.viewType = 'servicePayment';
      if(this.infoServiceDetail.items){
        this.data.amount = this.infoServiceDetail.items[0];
      }
    }else{
      this.infoServiceDetail = this.infoServices.items.find(x => x.id === id);
      if(this.categorySelect === 7){
        this.viewType = 'itemsGift';
      }else{
        this.viewType = 'servicePayment';

        if(this.infoServiceDetail.items){
          this.data.amount = this.infoServiceDetail.items[0];
        }

        if(this.infoServiceDetail.check_balance){
          this.txtButtonServPay = 'Continuar';
        }else{
          if(this.categorySelect != 1 && this.categorySelect != 5 && this.categorySelect != 7){
            this.showTxtAmount = true;
          }
        }
        console.log(this.infoServiceDetail);
      }
    }
  }

  gotoServices(){
    this.viewType = 'services';
    this.infoServices = null;
  }

  backPayment(){
    this.viewType = 'serviceDetail';
    this.showErrorNumber = false;
    this.showErrorAlias = false;
    this.data = {};
    this.paidBill = false;
    this.showTxtAmount = false;
  }

  bqckToGift(){
    this.viewType = 'serviceDetail';
    this.infoServiceDetail = null;
  }

  sendPaid(){

    if(!this.data.account_number){
      this.showErrorNumber = true;
      return;
    }else{
      this.showErrorNumber = false;
    }

    if(!this.data.alias){
      this.showErrorAlias = true;
      return;
    }else{
      this.showErrorAlias = false;
    }

    console.log(this.categorySelect);
    console.log(this.infoServiceDetail);

    if(this.categorySelect === 1 || this.categorySelect === 5 || this.categorySelect === 7 || !this.infoServiceDetail.check_balance) {
      const dialogRef = this.dialog.open(ModalConfirmComponent, {
        minWidth: '90%',
        disableClose: true,
        backdropClass: 'backdropBackground',
        data: { type: 'confirm', button: 'null', billerName: this.infoServiceDetail.title, amount: this.data.amount }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.paymentSinglePay();
        }
      });
    }else{
      if(this.paidBill){
        this.paymentBill();
      }else{
        this.consultBill();
      }
    }
  }

  paymentSinglePay(){
    this.load = true;
    this.data.biller_id = this.infoServiceDetail.biller_id;
    this.arcusServ.singlePay(this.data, this.userToken).then((resp: any) => {
      this.load = false;
      this.showSuccess('Recarga realizada correctamente.<br>En los próximos minutos verás el movimiento en tu cuenta Bnext');
    }, (err) => {
      this.load = false;
      this.showError(err.error.msg);
    });
  }

  consultBill(){
    this.load = true;
    this.data.biller_id = this.infoServiceDetail.biller_id;
    this.arcusServ.checkBill(this.data, this.userToken).then((resp: any) => {
      this.load = false;
      this.data.amount = resp.data.amount;
      this.data.id = resp.data.id;
      this.showTxtAmount = true;
      this.txtButtonServPay = 'Realizar pago';
      this.paidBill = true;
    }, (err) => {
      this.load = false;
      this.showError(err.error.msg);
    });
  }

  paymentBill(){
    this.load = true;
    this.arcusServ.payBill(this.data, this.userToken).then((resp: any) => {
      this.load = false;
      this.showSuccess('Pago realizado correctamente.<br>En los próximos minutos verás el movimiento en tu cuenta Bnext');
    }, (err) => {
      this.load = false;
      this.showError(err.error.msg);
    });
  }

  checkVal(type){
    switch (type) {
      case 1:
        if(!this.data.account_number){
          this.showErrorNumber = true;
        }else{
          this.showErrorNumber = false;
        }
        break;
      case 2:
        if(!this.data.amount){
          this.showErrorAmount = true;
        }else{
          this.showErrorAmount = false;
        }
        break;
      case 3:
        if(!this.data.alias){
          this.showErrorAlias = true;
        }else{
          this.showErrorAlias = false;
        }
        break;
    }
  }

  showSuccess(txt){
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      minWidth: '90%',
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: { type: 'success', msg: txt }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.load = true;
      this.getHistory();
    });
  }

  showError(msg, errToken = false){
    this.dialog.open(ModalConfirmComponent, {
      minWidth: '90%',
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: { type: 'error', error: msg, isToken: errToken}
    });
  }

  showConfirm(biller, amount){
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      minWidth: '90%',
      disableClose: true,
      backdropClass: 'backdropBackground',
      data: { type: 'confirm', button: 'null', billerName: biller, amount: amount }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        return true;
      }
      return false;
    });
  }



}
