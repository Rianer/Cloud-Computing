import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/models/weatherModel';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weather: WeatherData;
  condition: string = '---';
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe((res) => {
      this.weather = res;
      this.decodeWeather();
    });
  }

  decodeWeather(): void {
    if (this.weather.weathercode == 0) {
      this.condition = 'Clear';
    } else if (this.weather.weathercode > 0 && this.weather.weathercode <= 3) {
      this.condition = 'Partly Cloudy';
    } else if (
      this.weather.weathercode == 45 ||
      this.weather.weathercode == 48
    ) {
      this.condition = 'Foggy';
    } else if (this.weather.weathercode > 60) {
      this.condition = 'Rainy';
    }
  }
}
