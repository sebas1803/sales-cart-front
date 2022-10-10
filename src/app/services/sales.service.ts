import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../models/sale';
import { environment } from 'src/environments/environment';
import { SaleDetail } from '../models/sale-details';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private path = environment.apiUrl + '/sales'

  constructor(private http: HttpClient) { }

  getSales() {
    return this.http.get<Sale[]>(this.path);
  }
  getSalesWithTotal() {
    return this.http.get<Sale[]>(this.path + `/calculated`)
  }
  getAllSalesDetailWithTotal() {
    return this.http.get<SaleDetail[]>(this.path + `/detail`)
  }
  getSale(id: number) {
    return this.http.get<Sale>(this.path + `/${id}`);
  }
  getSaleByDate(date: string) {
    return this.http.get<Sale[]>(this.path + `/date?date=${date}`);
  }
  addProductToSale(productId: number, saleId: number) {
    return this.http.get<Sale>(this.path + `/product/${productId}/sale/${saleId}`);
  }
  addSale(clientId: number, sale: Sale) {
    return this.http.post<Sale>(this.path + `/client/${clientId}`, sale);
  }
  updateSale(id: number, sale: Sale) {
    return this.http.put<Sale>(this.path + `/${id}`, sale);
  }
  deleteSale(id: number) {
    return this.http.delete(this.path + `/${id}`);
  }
}
