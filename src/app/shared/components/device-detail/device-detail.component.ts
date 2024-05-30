import { Component, OnInit, computed, signal } from '@angular/core';
import { Device } from '../../../models/interfaces/device.model';
import { DeviceService } from '../../../core/services/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.css',
})
export class DeviceDetailComponent implements OnInit {
  device!: Device;
  isLoading = true;
  selectedDays: number;
  selectedDaySignal: any;
  daysOptions: number[];
  subTotalSignal: any;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.selectedDays = 1;
    this.daysOptions = Array.from({ length: 30 }, (_, i) => i + 1);
    this.selectedDaySignal = signal(this.selectedDays);
    this.subTotalSignal = computed(
      () => this.device.rentalPrice * this.selectedDaySignal()
    );
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.deviceService.getDeviceById(id!).subscribe((device) => {
      this.device = device;
      this.isLoading = false;
    });
  }

  updateDays() {
    this.selectedDaySignal.set(this.selectedDays);
  }

  goBack(): void {
    this.router.navigate(['/devices']);
  }

  rentDevice() {
    this.device.status = 'rented';
    this.device.availableFrom = new Date();
    this.device.availableFrom.setDate(
      this.device.availableFrom.getDate() + this.selectedDays
    );
    this.device.availableTo = this.device.availableFrom;
    this.deviceService.updateDevice(this.device).subscribe({
      next: () => {
        this.snackBar.open('Dispositivo alugado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/devices']);
      },
      error: (error) => {
        this.snackBar.open(
          'Erro ao alugar dispositivo. Tente novamente.',
          'Fechar',
          {
            duration: 3000,
          }
        );
      },
    });
  }
}
