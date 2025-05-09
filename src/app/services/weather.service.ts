import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = API.URL;
  private apiKey = API.KEY; 

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}${API.WEATHER}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getCityCoordinates(city: string): Observable<any> {
    const url = `${API.GEO_CODING_URL}?q=${city}&limit=1&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}${API.WEATHER}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  getCityNameByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${API.REVERSE_GEO_CODING_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getAirQuality(lat: number, lon: number): Observable<any> {
    const url = `${this.apiUrl}${API.AIR_QUALITY}?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  getAirQualityByCity(city: string): Observable<any> {
    return new Observable((observer) => {
      this.getCityCoordinates(city).subscribe(
        (cityData) => {
          if (cityData && cityData.length > 0) {
            const lat = cityData[0].lat;
            const lon = cityData[0].lon;

            this.getAirQuality(lat, lon).subscribe(
              (airQualityData) => {
                observer.next(airQualityData);
                observer.complete();
              },
              (airQualityError) => {
                observer.error('Nie udało się pobrać danych o jakości powietrza.');
              }
            );
          } else {
            observer.error('Nie znaleziono miasta.');
          }
        },
        (cityError) => {
          observer.error('Nie udało się pobrać współrzędnych miasta.');
        }
      );
    });
  }
}
