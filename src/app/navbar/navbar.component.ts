import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CustomersService} from '../customers.service.';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  showMenu = false;
  customers : Customer[] = [];
  searchQuery = '';
  searchQuerySubject = new Subject<string>();

  constructor(private customerService :CustomersService){
    this.searchQuerySubject
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((query: string) => {
      this.search(query);
    });
  }
  ngOnInit(): void {

  }
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
  search(query: string) {
    this.customerService.search(query).subscribe((customers) => {
      this.customers = customers;
    });
  }
  onQuery(event: any) {
    this.searchQuerySubject.next(event.target.value);
  }
  // private setIsLoading(customer: Customer, isLoading: boolean) {
  //   this.isDeleteLoading = this.isDeleteLoading.map((p) => {
  //     if (p.id === customer.id) {
  //       return { ...p, isLoading };
  //     }
  //     return p;
  //   });
  // }
}
