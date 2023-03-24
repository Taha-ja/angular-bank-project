import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListingRouteComponent } from './listing-route/listing-route.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { DetailsRouteComponent } from './details-route/details-route.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { UpdateRouteComponent } from './update-route/update-route.component';
import { DashboardRouteComponent } from './dashboard-route/dashboard-route.component';


@NgModule({
  declarations: [
    AppComponent,
    ListingRouteComponent,
    CustomerCardComponent,
    DetailsRouteComponent,
    NavbarComponent,
    CreateRouteComponent,
    UpdateRouteComponent,
    DashboardRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
