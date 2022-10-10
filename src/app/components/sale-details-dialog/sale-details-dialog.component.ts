import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'src/app/models/client';
import { SaleDetail } from 'src/app/models/sale-details';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sale-details-dialog',
  templateUrl: './sale-details-dialog.component.html',
  styleUrls: ['./sale-details-dialog.component.css']
})
export class SaleDetailsDialogComponent implements OnInit {

  dataSource = new MatTableDataSource<SaleDetail>();
  displayedColumns: string[] = ["product", "unitPrice", "quantity", "subtotal"]

  constructor(
    public dialogRef: MatDialogRef<SaleDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.getSalesDetail();
  }

  getSalesDetail() {
    this.salesService.getAllSalesDetailWithTotal().subscribe(
      (data: SaleDetail[]) => {
        console.log('detailData', data);
        this.dataSource = new MatTableDataSource(data);
      });
  }

  closeModal() {
    this.dialogRef.close();
  }

}
