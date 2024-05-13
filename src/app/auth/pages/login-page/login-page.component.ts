import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)
  private authService = inject (AuthService)
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email : ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)] ],
    password: ['', [Validators.required]]
  });

  login() {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {
       Swal.fire('Error', 'Email o contraseña no validos.', 'error');
       return
    }

    const {email, password} = this.myForm.value;

    this.authService.login(email, password)
                    .subscribe({
                      next: () => {
                        Swal.fire('Éxito', '¡Inicio de sesión exitoso!', 'success').then(() => {
                          this.router.navigateByUrl('/dashboard');
                        });
                      },
                      error: (message) => {
                        Swal.fire('Error', message, 'error')
                      }
                    })

  }

}
