import { Component, OnInit } from '@angular/core';
import { Device } from '../../../models/interfaces/device.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './device-edit.component.html',
  styleUrl: './device-edit.component.css'
})
export class DeviceEditComponent implements OnInit {
  deviceForm: FormGroup;
  device: Device | undefined;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.deviceForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.deviceService.getDeviceById(id).subscribe(device => {
      this.device = device;
      this.deviceForm.patchValue(device);
    });
  }

  onSubmit(): void {
    if (this.deviceForm.valid && this.device) {
      const updatedDevice: Device = {
        id: this.device.id,
        name: this.deviceForm.get('name')!.value,
        status: this.deviceForm.get('status')!.value
      };

      this.deviceService.updateDevice(updatedDevice).subscribe(() => {
        this.router.navigate(['/devices']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/devices']);
  }
}