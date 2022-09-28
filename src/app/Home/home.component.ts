import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../Service/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public items!: any;

  constructor(private router: Router, private service: Service) {
    this.getUsers();
  }

  goLogin() {
    this.router.navigate(['']);
  }

  getUsers() {
    this.service.getProducts().subscribe((response: any) => {
      console.log(response.items);
      this.items = response.items;
    });
  }
}
