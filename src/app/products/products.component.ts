import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from './interface/products.interface';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  columns: string[] = ['Title', 'SKU', 'Grams','Stock','Price','Barcode', 'edit', 'delete'];
  modal:boolean = false;
  products: Product[];
  id:number;
  dataSource : MatTableDataSource<Product>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private readonly _router:Router,
              private readonly _snackBar : MatSnackBar,
              private readonly _productService : ProductService
  ) {
  }

  async ngOnInit(){
    await this.getProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async openModal(id:number){
    this.modal=true;
    this.id = id;
  }

  closeModal(){
    this.modal = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 5000});
  }

  async getProducts() {
    let response = await this._productService.getProducts();
    this.products = response as Product[];

    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async deleteProduct(){
    let response = await this._productService.deleteProduct(this.id)
    .then(
        (response)=>{
          this.openSnackBar(`Producto eliminado correctamente`, '✔️');
        }
    ).catch(
      (error)=>{
        this.openSnackBar(`Error: ${error}`, '❌');
      }
    );
    this.closeModal();
    await this.getProducts();
   }
}
