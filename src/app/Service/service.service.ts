import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {}

  doLogin(data: any) {
    return this.http.post(
      'http://localhost:8090/api/admins/auth-via-email',
      data
    );
  }

  getProducts() {
    return this.http.get(
      'http://localhost:8090/api/collections/products/records'
    );
  }

  createProducts(data: any) {
    const token = localStorage.getItem('token');
    this.headers = this.headers.set('Authorization', token);
    return this.http.post(
      'http://localhost:8090/api/collections/products/records',
      data,
      { headers: this.headers }
    );
  }

  updateProducts(data: any, id: any) {
    const token = localStorage.getItem('token');
    this.headers = this.headers.set('Authorization', token);
    return this.http.patch(
      `http://localhost:8090/api/collections/products/records/${id}`,
      data,
      { headers: this.headers }
    );
  }

  deleteProducts(id: any) {
    const token = localStorage.getItem('token');
    this.headers = this.headers.set('Authorization', token);
    return this.http.delete(
      `http://localhost:8090/api/collections/products/records/${id}`,
      { headers: this.headers }
    );
  }
}
