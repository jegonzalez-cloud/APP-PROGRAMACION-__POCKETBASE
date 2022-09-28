import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Service } from '../Service/service.service';
import { showAlert } from '../Shared/Functions/functions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  createProductForm!: FormGroup;
  public items!: any;

  constructor(
    private router: Router,
    private service: Service,
    private fb: FormBuilder
  ) {
    this.getProducts();
    this.createForm();
  }

  createForm() {
    this.createProductForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
  }

  logOut() {
    showAlert('Sucess Logout', 'success');
    localStorage.clear();
    this.router.navigate(['']);
  }

  getProducts() {
    this.service.getProducts().subscribe((response: any) => {
      if (response.items.lenght != 0) {
        this.items = response.items;
      } else {
        showAlert('No data', 'warning');
      }
    });
  }

  createProduct() {
    this.service
      .createProducts(this.createProductForm.value)
      .subscribe((response: any) => {
        if (response.id != null) {
          showAlert('Sucess Create', 'success');
          this.getProducts();
        }
      });
  }

  async openProductsModal(data: any) {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Product',
      confirmButtonText: 'Edit',
      showDenyButton: true,
      denyButtonText: 'Delete',
      html:
        `<input placeholder="Name" id="swal-input1" class="swal2-input" value="${data.name}">` +
        `<input placeholder="Quantity" id="swal-input2" class="swal2-input" value="${data.quantity}">` +
        `<input placeholder="Unit" id="swal-input3" class="swal2-input" value="${data.unit}">` +
        `<input placeholder="Price" id="swal-input4" class="swal2-input" value="${data.price}">`,
      focusConfirm: false,
      preDeny: () => {
        this.deleteProducts(data.id);
      },
      preConfirm: () => {
        this.createProductForm
          .get('name')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input1')).value
          );

        this.createProductForm
          .get('quantity')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input2')).value
          );

        this.createProductForm
          .get('unit')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input3')).value
          );

        this.createProductForm
          .get('price')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input4')).value
          );
        return [];
      },
    });

    if (formValues) {
      this.updateProducts(this.createProductForm.value, data.id);
    }
  }

  updateProducts(form: any, id: any) {
    this.service.updateProducts(form, id).subscribe((response: any) => {
      if (response.id != null) {
        showAlert('Sucess Update', 'success');
        this.getProducts();
      }
    });
  }

  deleteProducts(id: any) {
    this.service.deleteProducts(id).subscribe((response: any) => {
      if (response == 'null' || response == null) {
        showAlert('Sucess Delete', 'success');
        this.getProducts();
      }
    });
  }

  async openCreateProductsModal() {
    const { value: formValues } = await Swal.fire({
      title: 'Create Product',
      confirmButtonText: 'Create',
      html:
        '<input placeholder="Name" id="swal-input1" class="swal2-input">' +
        '<input placeholder="Quantity" id="swal-input2" class="swal2-input">' +
        '<input placeholder="Unit" id="swal-input3" class="swal2-input">' +
        '<input placeholder="Price" id="swal-input4" class="swal2-input">',
      focusConfirm: false,
      preConfirm: () => {
        this.createProductForm
          .get('name')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input1')).value
          );

        this.createProductForm
          .get('quantity')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input2')).value
          );

        this.createProductForm
          .get('unit')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input3')).value
          );

        this.createProductForm
          .get('price')
          .setValue(
            (<HTMLInputElement>document.getElementById('swal-input4')).value
          );
        return [];
      },
    });

    if (formValues) {
      this.createProduct();
    }
  }
}
