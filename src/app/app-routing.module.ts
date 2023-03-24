import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRouteComponent } from './create-route/create-route.component';
import { DashboardRouteComponent } from './dashboard-route/dashboard-route.component';
import { DetailsRouteComponent } from './details-route/details-route.component';
import { ListingRouteComponent } from './listing-route/listing-route.component';
import { UpdateRouteComponent } from './update-route/update-route.component';

const routes: Routes = [
  {
    path:'',
    component:ListingRouteComponent,
  },
  {
    path:'details/:id',
    component:DetailsRouteComponent,
  },
  {
    path:'update/:id',
    component:UpdateRouteComponent,
  }
  ,
  {
    path:'create',
    component:CreateRouteComponent,
  }
  ,
  {
    path:'dashboard',
    component:DashboardRouteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
