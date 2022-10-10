import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { Sale } from 'src/app/models/sale';
import { ClientsService } from 'src/app/services/clients.service';
import { SalesService } from 'src/app/services/sales.service';
import { SaleDetailsDialogComponent } from '../sale-details-dialog/sale-details-dialog.component';

@Component({
  selector: 'app-sales-dashboard',
  templateUrl: './sales-dashboard.component.html',
  styleUrls: ['./sales-dashboard.component.css']
})
export class SalesDashboardComponent implements OnInit {

  client?: Client;
  date: String = "";

  dataSource = new MatTableDataSource<Sale>();
  displayedColumns: string[] = ["client", "date", "total", "details"]

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<SaleDetailsDialogComponent, any> | undefined;

  constructor(
    public matDialog: MatDialog,
    private salesService: SalesService,
    private clientService: ClientsService,
  ) { }

  ngOnInit(): void {
    this.getSalesWithTotal();
  }

  getSalesWithTotal() {
    this.salesService.getSalesWithTotal().subscribe(
      (data: Sale[]) => {
        console.log('dataTotal', data);
        this.dataSource = new MatTableDataSource(data);
      })
  }

  getClientInfo(clientId: number) {
    this.clientService.getClient(clientId).subscribe(
      (data: Client) => {
        this.client = {
          firstname: data.firstname,
          lastname: data.lastname,
          dni: data.dni,
          phone: data.phone,
          email: data.email,
        }
        return this.client;
      }
    )
  }

  addEvent(event: Date) {
    var res = event.toISOString().slice(0, 10);
    this.getSalesByDate(res);
  }

  getSalesByDate(date: string) {
    this.salesService.getSaleByDate(date).subscribe(
      (data: Sale[]) => {
        console.log(data);
      }
    )
  }

  getSaleInfo(saleId: number) {
    this.salesService.getSale(saleId).subscribe(
      (data: Sale) => {
        this.date = data.date;
        return this.date;
      }
    )
  }

  viewSaleDetails(saleId: number): void {
    this.getClientInfo(saleId);
    this.getSaleInfo(saleId);
    this.dialogConfig.id = "sale-details-dialog-component";
    this.dialogConfig.height = "500px";
    this.dialogConfig.width = "800px";
    this.dialogConfig.data = this.client;
    this.modalDialog = this.matDialog.open(SaleDetailsDialogComponent, {
      height: 'auto',
      hasBackdrop: true,
      data: {
        client: {
          firstname: this.client?.firstname,
          lastname: this.client?.lastname,
          dni: this.client?.dni,
          phone: this.client?.phone,
          email: this.client?.email
        },
        sale: {
          date: this.date
        }
      }
    });
  }

}
