import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CustomersService } from '../customers.service.';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrls: ['./update-route.component.css']
})
export class UpdateRouteComponent implements OnInit{
  customerForm: FormGroup;
  isLoading = false;
  genders = ["Male","Female"];
  accountTypes = ["Saving","Checking"];
  updatedCustomer !: Customer;
  image: any;
  firstCharFirstName :string | undefined="";
  firstCharLastName:string | undefined="";
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomersService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.customerForm = this.formBuilder.group({
      file:[
        "../../assets/0080eeaeaa2f2fba77af3e1efeade565.jpg",
        Validators.required,
      ],
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
    },{ updateOn: 'blur' });
  }
  ngOnInit(): void {
    this.activeRoute.params
    .pipe(switchMap((params) => this.customerService.getCustomerById(params['id'])))
    .subscribe({
      next: (customer) => {
        this.updatedCustomer = customer;
        this.image=customer.image;
        this.firstCharFirstName = this.updatedCustomer.firstName[0].toUpperCase();
        this.firstCharLastName=this.updatedCustomer.lastName[0].toUpperCase();
      },
      error: () => {
        this.router.navigate(['/not-found']);
      },
    });
}
  submit() {
    this.isLoading = true;
    this.customerService
      .updateCustomer({...this.updatedCustomer,image:this.image})
      .subscribe((customer: Customer) => {
        this.isLoading = false;
        this.customerForm.reset();
        this.router.navigate(['/details', customer.id]);
      });
  }

  getControl(controlName: string) {
    return this.customerForm.get(controlName);
  }

  canSubmit(): boolean {
    return (this.customerForm.valid && this.customerForm.dirty) || this.image!=this.updatedCustomer.image;
  }
  handleUpload(event:any){
    //this.edit=true;
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
