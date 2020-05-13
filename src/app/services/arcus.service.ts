import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './constants';

@Injectable({
  providedIn: 'root'
})
export class ArcusService {
  private apiUrl = this.appConfig.API_URL_PROD_BNEXT_IO;

  private headers = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'X-WEB-KEY': 'WebView' })};

  barerToekn = '';
  listUserHistory = [];

  constructor(public http: HttpClient, private appConfig: AppConfig) {

  }

  createHeader(token) {
    this.headers = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'X-WEB-KEY': 'WebView', 'Authorization': token })};
  }

  setBarerToekn(token){
    this.barerToekn = token;
  }

  getBarerToekn(){
    return this.barerToekn;
  }

  setListUserHistory(history){
    this.listUserHistory = history;
  }

  getListUserHistory(){
    return this.listUserHistory;
  }

  recoverToken(token) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'arcus/recover-token/'+token, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  userHistory(token) {
    this.createHeader(token);
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'arcus/user-history', this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  userHistoryDetail(id, token) {
    this.createHeader(token);
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'arcus/user-history/'+id, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  getServices(token) {
    this.createHeader(token);
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'arcus/list-services', this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  singlePay(params, token) {
    this.createHeader(token);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'arcus/recharge', params, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  checkBill(params, token) {
    this.createHeader(token);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'arcus/checkBill', params, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

  payBill(params, token) {
    this.createHeader(token);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'arcus/payBill', params, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }




}
