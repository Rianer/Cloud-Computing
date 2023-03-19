import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/models/vehicleModel';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  vehicles : Vehicle[] = [];

  constructor(private carService : CarsService){}

  ngOnInit(){
    console.log("Hello")
    this.carService.getAllCars().subscribe((res) => {
      console.log(res);
    });
  }
}
