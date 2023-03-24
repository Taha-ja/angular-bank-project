import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Customer } from './models/customer.model';
const API_URL = "http://localhost:3000/customers";
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient:HttpClient) { }
  getCustomers(): Observable<Customer[]>{
    return this.httpClient
                          .get<Customer[]>(API_URL)
                          .pipe(map(
                            (customers :Customer[]) =>
                                  customers.sort(
                                    (c1, c2) => (c1.firstName < c2.firstName) ? -1 : (c1.firstName > c2.firstName) ? 1 : 0
                                  ))
                            );
  }
  getCustomerById(id:string):Observable<Customer>{
    return this.httpClient.get<Customer>(`${API_URL}/${id}`);
  }
  getCustomerByName(fname: string,lname: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}?firstName=${fname}&lastName=${lname}`);
  }
  search(name: string): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${API_URL}?q=${name}`);
  }
  deletePokemon(customer:Customer):Observable<Customer>{
    return this.httpClient.delete<Customer>(`${API_URL}/${customer.id}`);
  }
  createCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(API_URL, customer);
  }
  updateCustomer(customer : Customer) : Observable<Customer>{
    return this.httpClient.put<Customer>(`${API_URL}/${customer.id}`,customer);
  }
}
