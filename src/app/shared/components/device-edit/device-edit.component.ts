import { Component, OnInit } from '@angular/core';
import { Device } from '../../../models/interfaces/device.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceService } from '../../../core/services/device.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-device-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css'],
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
      imageUrl: [''],
      description: ['', Validators.required],
      category: ['', Validators.required],
      rentalPrice: ['', [Validators.required, Validators.min(0)]],
      availableFrom: ['', Validators.required],
      availableTo: [''],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.deviceService.getDeviceById(id).subscribe((device) => {
        this.device = device;
        this.deviceForm.patchValue(device);
      });
    }
  }

  onSubmit(): void {
    if (this.deviceForm.valid && this.device) {
      const updatedDevice: Device = {
        ...this.device,
        ...this.deviceForm.getRawValue(),
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
