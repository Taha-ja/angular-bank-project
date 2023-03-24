import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css']
})
export class CustomerCardComponent implements OnInit{
  firstCharFirstName :string | undefined="";
  firstCharLastName:string | undefined="";
  ngOnInit(): void {
    this.firstCharFirstName = this.customer?.firstName[0].toUpperCase();
    this.firstCharLastName=this.customer?.lastName[0].toUpperCase();
  }
  @Input() customer? : Customer;
  @Input() isDeleteLoading = false;
  @Output() delete = new EventEmitter<Customer>();

  onDelete(){
    this.delete.emit(this.customer);
  }
}
