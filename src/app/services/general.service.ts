import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './constants';
import {Observable, Subject} from 'rxjs';



@Injectable()
export class GeneralService {
  token: any;
  userId: any;
  headers: any;
  options: any;

  myBool$: Observable<boolean>;
  private boolSubject: Subject<boolean>;


  constructor(public http: HttpClient, private appConfig: AppConfig) {
    this.boolSubject = new Subject<boolean>();
    this.myBool$ = this.boolSubject.asObservable();
  }

  showloading(ev){
    this.boolSubject.next(ev);
  }



}
