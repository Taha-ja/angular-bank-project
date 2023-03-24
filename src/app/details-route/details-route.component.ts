import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CustomersService } from '../customers.service.';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-details-route',
  templateUrl: './details-route.component.html',
  styleUrls: ['./details-route.component.css']
})
export class DetailsRouteComponent {
  customer?: Customer;
  firstCharFirstName :string | undefined="";
  firstCharLastName:string | undefined="";
  constructor(
    private customerService: CustomersService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(switchMap((params) => this.customerService.getCustomerById(params['id'])))
      .subscribe({
        next: (customer) => {this.customer = customer;    this.firstCharFirstName = this.customer?.firstName[0];
          this.firstCharLastName=this.customer?.lastName[0]!;},
        error: () => {
          this.router.navigate(['/not-found']);
        },
      });
  }
}
