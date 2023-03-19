import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from 'src/models/weatherModel';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private ROOT_URL = 'http://localhost:8020/weather';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData> {
    return this.http.get<WeatherData>(this.ROOT_URL);
  }
}
