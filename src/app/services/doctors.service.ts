import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './constants';
@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private apiUrl = this.appConfig.API_URL_PROD_BNEXT_IO;

  private headers = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'X-WEB-KEY': 'WebView' })};

  barerToekn = '';
  listUserHistory = [];

  constructor(public http: HttpClient, private appConfig: AppConfig) {

  }

  createHeader(token) {
    this.headers = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'X-WEB-KEY': 'WebView', 'Authorization': token })};
  }
  recoverToken(token) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'doctors/recover-token/'+token, this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }
  checkUser(token){
    this.createHeader(token)
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'doctors/check-user', this.headers).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }

}
