import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isRegistering = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (this.isRegistering) {
      this.authService.cadastrarUser(email, password).subscribe(
        () => {
          this.snackBar.open('Registro realizado com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        (error) => {
          this.snackBar.open('Erro ao registrar. Tente novamente.', 'Fechar', {
            duration: 3000,
          });
        }
      );
    } else {
      this.authService.login(email, password).subscribe(
        () => {
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        (error) => {
          this.snackBar.open(
            'Erro ao fazer login. Verifique suas credenciais.',
            'Fechar',
            {
              duration: 3000,
            }
          );
        }
      );
    }
  }

  toggleMode() {
    this.isRegistering = !this.isRegistering;
    this.loginForm.reset();
  }

  onClose() {
    this.dialogRef.close();
  }
}
