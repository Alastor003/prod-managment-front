import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)
  private authService = inject (AuthService)
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    name : ['', [Validators.required]],
    email : ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)] ],
    password: ['', [Validators.required]]
  });

  register() {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {
       Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
       return
    }

    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password)
      .subscribe({
        next: () => {
          Swal.fire('Éxito', 'Se registró correctamente.', 'success').then(() => {
            this.router.navigateByUrl('/login');
          });
        },
        error: (err) => {
          Swal.fire('Error', err.message || 'Ocurrió un error durante el registro.', 'error');
        }
      });
  }

}
