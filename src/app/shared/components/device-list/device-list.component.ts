import { Component, OnInit } from '@angular/core';
import { Device } from '../../../models/interfaces/device.model';
import { DeviceService } from '../../../core/services/device.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];

  constructor(private deviceService: DeviceService, private router: Router) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((devices: Device[]) => {
      this.devices = devices;
    });
  }

  editDevice(id: number): void {
    this.router.navigate(['/devices', id, 'edit']);
  }

  deleteDevice(id: number): void {
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.devices = this.devices.filter(device => device.id !== id);
    });
  }
}
