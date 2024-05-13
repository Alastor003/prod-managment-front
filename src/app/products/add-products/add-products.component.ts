import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../service/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent implements OnInit {

  private fb = inject(FormBuilder)
  private productService = inject (ProductService)
  private router = inject(Router)
  private activadesRouter = inject (ActivatedRoute)

  id: number;

  public myForm: FormGroup = this.fb.group({
    handle : ['', [Validators.required] ],
    title: ['', [Validators.required] ],
    description: ['', [Validators.required] ],
    sku: ['', [Validators.required] ],
    grams: ['', [Validators.required] ],
    stock: ['', [Validators.required] ],
    price: ['', [Validators.required] ],
    comparePrice: ['', [Validators.required]],
    barcode: ['', [Validators.required]],
  });

  ngOnInit() {
    this.id = this.activadesRouter.snapshot.params['id'];

    if (this.id) {
      this.getProducto(this.id);
    }

  }

  onSubmit() {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {
       Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
       return
    }

    if (this.id) {
      this.productService.updateProduct(this.id, this.myForm.value)
        .subscribe({
          next: () => {
            Swal.fire('Éxito', 'Se actualizo correctamente.', 'success').then(() => {
              this.router.navigateByUrl('dashboard/products');
            });
          },
          error: (err) => {
            Swal.fire('Error', err.message || 'Ocurrio un error durante el registro.', 'error');
          }
        });
    } else {
      this.productService.addProduct(this.myForm.value)
      .subscribe({
        next: () => {
          Swal.fire('Éxito', 'Se agrego correctamente.', 'success').then(() => {
            this.router.navigateByUrl('dashboard/products');
          });
        },
        error: (err) => {
          Swal.fire('Error', err.message || 'Ocurrio un error durante el registro.', 'error');
        }
      });
    }
  }

  async getProducto(id: number) {
    try {
      const product = await this.productService.getProductById(id);
      this.myForm.patchValue(product);
    } catch (err) {
      Swal.fire('Error', err.message || 'Ocurrió un error durante la solicitud.', 'error');
    }
  }

}
