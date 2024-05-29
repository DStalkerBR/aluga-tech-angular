import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DeviceDetailComponent } from './shared/components/device-detail/device-detail.component';
import { DeviceEditComponent } from './shared/components/device-edit/device-edit.component';
import { NgModule } from '@angular/core';
import { DeviceListComponent } from './shared/components/device-list/device-list.component';
import { UserManualComponent } from './pages/user-manual/user-manual.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: 'devices/:id/edit', component: DeviceEditComponent },
  { path: 'devices/:id', component: DeviceDetailComponent },
  { path: 'user-manual', component: UserManualComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

