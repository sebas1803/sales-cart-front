import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private path = environment.apiUrl + '/clients'

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<Client[]>(this.path);
  }
  getClient(id: number) {
    return this.http.get<Client>(this.path + `/${id}`);
  }
  addClient(client: Client) {
    return this.http.post<Client>(this.path, client);
  }
  updateClient(id: number, client: Client) {
    return this.http.put<Client>(this.path + `/${id}`, client);
  }
  deleteClient(id: number) {
    return this.http.delete(this.path + `/${id}`);
  }
}
