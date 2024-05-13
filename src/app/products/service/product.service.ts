import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductBody } from '../interface/products.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private readonly http: HttpClient) { }

  private readonly baseUrl: string = environment.baseUrl;

  async getProducts() {
    return await this.http.get(this.baseUrl + '/products').toPromise()
    .then(
        (response)=>{
          return response;
        }
    ).catch(
      (error)=>{
        return error;
      }
    );
  }

  async deleteProduct(id) {
    return await this.http.delete(this.baseUrl + '/products/' + id).toPromise()
    .then(
        (response)=>{
          return response;
        }
    ).catch(
      (error)=>{
        return error;
      }
    );
  }

  addProduct(product: ProductBody) {
    const headers = { 'Content-Type': 'application/json' };

    const productToSend = {
      handle: product.handle,
      title: product.title,
      description: product.description,
      sku: Number(product.sku),
      grams: Number(product.grams),
      stock: Number(product.stock),
      price: Number(product.price),
      comparePrice: Number(product.comparePrice),
      barcode: Number(product.barcode)
    };

    return this.http.post(`${this.baseUrl}/products`, productToSend, { headers });
  }

   updateProduct(idProduct: number, product: ProductBody) {
    const headers = { 'Content-Type': 'application/json' };

    const productToSend = {
      handle: product.handle,
      title: product.title,
      description: product.description,
      sku: Number(product.sku),
      grams: Number(product.grams),
      stock: Number(product.stock),
      price: Number(product.price),
      comparePrice: Number(product.comparePrice),
      barcode: Number(product.barcode)
    };

    return this.http.put(this.baseUrl + '/products/' + idProduct, productToSend, { headers });
  }

  async getProductById(id) {
    return this.http.get(this.baseUrl + '/products/' + id).toPromise()
    .then(
        (response)=>{
          return response;
        }
    ).catch(
      (error)=>{
        return error;
      }
    );
  }

}
