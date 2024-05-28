import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
}
