import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
    <h1>Device Management System</h1>
    <nav>
      <a routerLink="/devices" routerLinkActive="active">Devices</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'aluga-tech-angular';

  constructor(authService: AuthService) {
    authService.autoLogin();
  }
}
