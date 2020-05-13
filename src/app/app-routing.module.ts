import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ArcusListServicesComponent} from './arcus/arcus-list-services/arcus-list-services.component';
import {DinnUserCheckComponent} from './dinn/dinn-user-check/dinn-user-check.component';
import {ArcusUserCheckComponent} from './arcus/arcus-user-check/arcus-user-check.component';
import {DoctorsCheckUserComponent} from "./doctors/doctors-check-user/doctors-check-user.component";


const routes: Routes = [
  { path: 'dinn', component: DinnUserCheckComponent },
  {
    path: 'arcus',
    children: [
      {
        path: 'check/:id',
        component: ArcusUserCheckComponent
      },{
        path: 'services/:category',
        component: ArcusListServicesComponent
      }
    ]
  },
  {
    path: 'doctors',
    children: [
      {
        path: 'check/:id',
        component: DoctorsCheckUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
