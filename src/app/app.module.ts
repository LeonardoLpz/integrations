import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ArcusPaymentServiceComponent } from './arcus/arcus-payment-service/arcus-payment-service.component';
import { ArcusDEtailserviceComponent } from './arcus/arcus-detailservice/arcus-detailservice.component';
import { ArcusListServicesComponent } from './arcus/arcus-list-services/arcus-list-services.component';
import { DinnUserCheckComponent } from './dinn/dinn-user-check/dinn-user-check.component';
import { ArcusUserCheckComponent } from './arcus/arcus-user-check/arcus-user-check.component';
import {ArcusService} from './services/arcus.service';
import {DinnService} from './services/dinn.service';
import {AppConfig} from './services/constants';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import {GeneralService} from './services/general.service';
import {ModalConfirmComponent} from './modal-confirm/modal-confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { DoctorsCheckUserComponent } from './doctors/doctors-check-user/doctors-check-user.component';
import {DoctorsService} from "./services/doctors.service";

@NgModule({
  declarations: [
    AppComponent,
    ArcusPaymentServiceComponent,
    ArcusDEtailserviceComponent,
    ArcusListServicesComponent,
    DinnUserCheckComponent,
    ArcusUserCheckComponent,
    ModalConfirmComponent,
    DoctorsCheckUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,// threeBounce chasingDots
      backdropBackgroundColour: 'rgba(255,255,255,0.3)',
      backdropBorderRadius: '4px',
      primaryColour: '#ff0068',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  providers: [
    ArcusService,
    DoctorsService,
    DinnService,
    GeneralService,
    AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
