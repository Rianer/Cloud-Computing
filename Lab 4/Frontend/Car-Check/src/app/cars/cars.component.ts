import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Vehicle } from 'src/models/vehicleModel';
import { CarsService } from '../services/cars.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
})
export class CarsComponent implements OnInit {
  vehicles: Vehicle[] = [];
  otherModels: string[] = [];
  showingCarList: boolean = false;
  showingModels: boolean = false;
  showingNewCarDialog: boolean = false;
  currentMake: string = '';

  newCar: FormGroup;

  constructor(private carService: CarsService, private fg: FormBuilder) {}

  ngOnInit() {
    this.fetchCarList();
    this.newCar = this.fg.group({
      make: '',
      model: '',
      year: 2023,
      type: '',
    });
    this.newCar.valueChanges.subscribe();
  }

  toggleShowingCarList(): void {
    this.showingCarList = !this.showingCarList;
    this.showingModels = false;
  }

  fetchCarList() {
    this.vehicles = [];
    this.carService.getAllCars().subscribe((res) => {
      res.forEach((car) => {
        this.vehicles.push(car);
      });
    });
  }

  deleteCar(id: string) {
    this.carService.deleteCar(id).subscribe((res) => {
      this.fetchCarList();
    });
  }

  findModels(make: string) {
    this.currentMake = make;
    this.showingModels = true;
    this.otherModels = [];
    this.carService.getModels(make).subscribe((res) => {
      if (res.collection.count > 0) {
        res.data.forEach((element) => {
          this.otherModels.push(element.name);
        });
      } else {
        this.otherModels.push(`Can't find other ${make} models.`);
      }
    });
  }

  toggleOverlay() {
    this.showingNewCarDialog = !this.showingNewCarDialog;
  }

  createCar() {
    this.carService.createCar(this.newCar.value).subscribe((res) => {
      this.toggleOverlay();
      this.fetchCarList();
    });
  }
}
