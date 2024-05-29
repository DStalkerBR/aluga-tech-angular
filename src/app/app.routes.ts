import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserManualComponent } from './pages/user-manual/user-manual.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-manual', component: UserManualComponent },
  { path: '**', redirectTo: '' },
];
