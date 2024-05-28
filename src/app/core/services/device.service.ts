import { Injectable } from '@angular/core';
import { Device } from '../../models/interfaces/device.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {
  private devices: Device[] = [
    { id: 1, name: 'Device 1', status: 'available' },
    { id: 2, name: 'Device 2', status: 'rented' },
    { id: 3, name: 'Device 3', status: 'available' },
  ];

  constructor() {}

  getDevices(): Observable<Device[]> {
    return of(this.devices);
  }

  getDeviceById(id: number): Observable<Device> {
    const device = this.devices.find(device => device.id === id);
    return of(device!);
  }

  updateDevice(updatedDevice: Device): Observable<void> {
    const index = this.devices.findIndex(device => device.id === updatedDevice.id);
    if (index !== -1) {
      this.devices[index] = updatedDevice;
    }
    return of();
  }

  deleteDevice(id: number): Observable<void> {
    this.devices = this.devices.filter(device => device.id !== id);
    return of();
  }
}
