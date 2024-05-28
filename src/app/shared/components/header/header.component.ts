import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isUserAuthenticated = false;
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit() {
    this.checkUserAuthentication();
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.checkUserAuthentication();
    });
  }

  checkUserAuthentication() {
    this.isUserAuthenticated = this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.isUserAuthenticated = false;
    window.location.reload();
  }
}
