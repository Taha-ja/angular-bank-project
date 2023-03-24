import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CustomersService } from '../customers.service.';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-listing-route',
  templateUrl: './listing-route.component.html',
  styleUrls: ['./listing-route.component.css'],
})
export class ListingRouteComponent implements OnInit {
  customers: Customer[] = [];
  searchQuery = '';
  searchQuerySubject = new Subject<string>();
  isDeleteLoading: any[] = [];
  constructor(private customerService: CustomersService) {
    this.searchQuerySubject
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((query: string) => {
      this.search(query);
    });
  }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(customers =>{
      this.customers = customers.map(c=>c={...c});
      this.isDeleteLoading = customers.map((c) => ({
        id: c.id,
        isLoading: false,
      }));
    })
  }
  search(query: string) {
    this.customerService.search(query).subscribe((customers) => {
      this.customers = customers.map(c=>c={...c});
    });
  }
  onQuery(event: any) {
    this.searchQuerySubject.next(event.target.value);
  }
  delete(customer:Customer){
    this.setIsLoading(customer, true);
    this.customerService.deleteCustomer(customer).subscribe(() => {
      this.customers = this.customers.filter((c) => c.id !== customer.id);
      this.setIsLoading(customer, false);
    });
  }
  getIsDeleteLoading(customer: Customer) {
    return this.isDeleteLoading.find((c) => c.id === customer.id)?.isLoading;
  }
  private setIsLoading(customer: Customer, isLoading: boolean) {
    this.isDeleteLoading = this.isDeleteLoading.map((c) => {
      if (c.id === customer.id) {
        return { ...c, isLoading };
      }
      return c;
    });
  }
}
