import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/models/vehicleModel';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private ROOT_URL = "http://localhost:8020/cars";

  constructor(private http: HttpClient) { }

  getAllCars() : Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(this.ROOT_URL);
  }
}
