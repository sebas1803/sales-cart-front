import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private path = environment.apiUrl + '/products'

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.path);
  }
  getProduct(id: number) {
    return this.http.get<Product>(this.path + `/${id}`);
  }
  addProduct(product: Product) {
    return this.http.post<Product>(this.path, product);
  }
  updateProduct(id: number, product: Product) {
    return this.http.put<Product>(this.path + `/${id}`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.path + `/${id}`);
  }
}
