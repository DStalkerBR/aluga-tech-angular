import { Component, OnInit } from '@angular/core';
import { Device } from '../../../models/interfaces/device.model';
import { DeviceService } from '../../../core/services/device.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css',
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  filteredDevices: Device[] = [];
  statusFilter: string = 'all';
  nameFilter: string = '';

  constructor(private deviceService: DeviceService, private router: Router) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices;
      this.filteredDevices = devices;
    });
  }

  deleteDevice(id: string): void {
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.devices = this.devices.filter((device) => device.id !== id);
      this.filterDevices();
    });
  }

  onNameFilterInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.applyNameFilter(inputElement.value);
  }

  applyNameFilter(name: string): void {
    this.nameFilter = name.toLowerCase();
    this.filterDevices();
  }

  applyStatusFilter(status: string): void {
    this.statusFilter = status;
    this.filterDevices();
  }

  filterDevices(): void {
    this.filteredDevices = this.devices.filter((device) => {
      const matchesName = device.name.toLowerCase().includes(this.nameFilter);
      const matchesStatus =
        this.statusFilter === 'all' || device.status === this.statusFilter;
      return matchesName && matchesStatus;
    });
  }

  // This method is only used for testing purposes
  testAddDevice(): void {
    let device: Device = {
      id: '',
      name: 'Device ' + Math.floor(Math.random() * 100),
      status: Math.random() > 0.5 ? 'available' : 'rented',
      category: 'category',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec turpis nec eros tempus laoreet nec nec nunc.',
      imageUrl: 'https://via.placeholder.com/150',
      rentalPrice: Math.floor(Math.random() * 100),
      availableFrom: new Date(),
      availableTo: new Date(),
    };
    // eu tenho o device que estou criando, o addDevice só vai retornar o id criado
    this.deviceService.addDevice(device).subscribe((id: any) => {
      device.id = id.name;
      this.devices.push(device);
      this.filterDevices();
    });
  }
}
