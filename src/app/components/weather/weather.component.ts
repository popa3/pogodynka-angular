import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})



export class WeatherComponent implements OnInit {
  city: string = '';
  weatherData: any;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('lastCity')) {
      this.city = localStorage.getItem('lastCity')!;
      this.getWeather();
    }
  }
  

  getWeather(): void {
    if (!this.city) return;

    this.weatherService.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.errorMessage = '';
        localStorage.setItem('lastCity', this.city);
      },
      error: (error) => {
        this.weatherData = null;
        this.errorMessage = 'Nie udało się pobrać danych.';
        console.error(error);
      }
    });
  }
}
