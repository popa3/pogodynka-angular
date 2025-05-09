import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-air',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './air.component.html',
  styleUrls: ['./air.component.css']
})
export class AirComponent {
  city: string = '';
  airData: any = null;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  getAirQuality(): void {
    if (!this.city) return;

    this.weatherService.getCityCoordinates(this.city).subscribe({
      next: (coordsRes) => {
        if (!coordsRes.length) {
          this.errorMessage = 'Nie znaleziono miasta.';
          this.airData = null;
          return;
        }
        const { lat, lon } = coordsRes[0];
        this.weatherService.getAirQuality(lat, lon).subscribe({
          next: (data) => {
            this.airData = data;
            this.errorMessage = '';
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Błąd podczas pobierania jakości powietrza.';
          }
        });
      },
      error: () => {
        this.errorMessage = 'Błąd podczas pobierania współrzędnych.';
      }
    });
  }
}
