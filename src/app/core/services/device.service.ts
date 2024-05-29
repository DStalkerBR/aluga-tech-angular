import { Injectable } from '@angular/core';
import { Device } from '../../models/interfaces/device.model';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceService extends DatabaseService<Device> {

  constructor(http: HttpClient) {
    super(http, 'devices');
  }

  addDevice(newDevice: Device): Observable<any> {
    return this.post(newDevice);
  }

  getDevices(): Observable<Device[]> {
    return this.getAll().pipe(
      map((data) =>
        Object.entries(data).map(([key, value]) => ({ ...value, id: key }))
      )
    );
  }

  getDeviceById(id: string): Observable<any> {
    return this.get(id).pipe(
      map((data) => ({ ...data, id }))
    );
  }

  updateDevice(updatedDevice: Device): Observable<any> {
    return this.put(updatedDevice.id, updatedDevice);
  }

  deleteDevice(id: string): Observable<any> {
    return this.delete(id);
  }
}
