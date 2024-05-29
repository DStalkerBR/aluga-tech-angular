import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../shared/components/login/login.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isUserAuthenticated = false;
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    this.isUserAuthenticated = this.authService.isAuthenticated();
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('O diálogo foi fechado');
      this.isUserAuthenticated = this.authService.isAuthenticated();
    });
  }
}
