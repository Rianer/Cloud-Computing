import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from 'src/models/vehicleModel';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/models/carsAPIResponseModel';
@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private ROOT_URL = 'http://localhost:8020/cars';

  constructor(private http: HttpClient) {}

  getAllCars(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.ROOT_URL);
  }

  deleteCar(id: string) {
    const URL = this.ROOT_URL + `/${id}`;
    return this.http.delete(URL);
  }

  getModels(make: string): Observable<APIResponse> {
    const URL = this.ROOT_URL + `/models/${make}`;
    return this.http.get<APIResponse>(URL);
  }

  createCar(car: any): Observable<string> {
    return this.http.post<string>(this.ROOT_URL, car);
  }
}
