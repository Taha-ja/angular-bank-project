import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../customers.service.';
import { Customer } from '../models/customer.model';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent {
  customerForm: FormGroup;
  isLoading = false;
  genders = ["Male","Female"];
  accountTypes = ["Saving","Checking"];
  image:any;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [
        "",[Validators.required, Validators.email],
      ],
      address: [
        "",
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      gender: [
        null,
      Validators.required],
      accountType: [
        null,
      Validators.required],
    });
  }
  public list: string[] = [];
  public gen() {
    this.list.push(uuid());
    return this.list[0];
  }
  submit() {

    this.isLoading = true;
    console.log(this.customerForm.value);
    this.customerService
      .createCustomer({...this.customerForm.value,id:this.gen(),image:this.image??""})
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        console.log(customer);
        this.customerForm.reset();
        this.router.navigate(['/details', customer.id]);
      });

  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canSubmit(): boolean {
    return this.customerForm.dirty && this.customerForm.valid;
  }
  handleUpload(event:any){
    let file;
    file = event.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.image=reader.result;
    };
  }
}
