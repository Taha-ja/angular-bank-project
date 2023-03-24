import { Component } from '@angular/core';
import { CustomersService } from '../customers.service.';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-dashboard-route',
  templateUrl: './dashboard-route.component.html',
  styleUrls: ['./dashboard-route.component.css']
})
export class DashboardRouteComponent {
  NumberOfCustmers=0;
  TotaleBalance=0;
  cusromers:Customer[]=[];

  constructor(private customersService: CustomersService) { }

  ngOnInit():void{
    this.customersService.getCustomers().subscribe(item=>{
      this.cusromers=item;
      this.NumberOfCustmers=item.length;
      this.TotaleBalance=this.cusromers.reduce((sum,item)=>(sum+Number.parseFloat(item.balance.toString())),0)
    })
  }
}
