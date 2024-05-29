import { Component, OnInit } from '@angular/core';
import { Device } from '../../../models/interfaces/device.model';
import { DeviceService } from '../../../core/services/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css'
})
export class DeviceDetailComponent implements OnInit {
  device: Device | undefined;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'));
    this.deviceService.getDeviceById(id!).subscribe(device => {
      this.device = device;
    });
  }

  goBack(): void {
    this.router.navigate(['/devices']);
  }
}
