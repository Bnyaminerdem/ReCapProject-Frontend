import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl ="https://localhost:44383/api/cars/getall"

  constructor(private httpClient:HttpClient) { }

getCars():Observable<ListResponseModel<Car>> {
  return this.httpClient.get<ListResponseModel<Car>>(this.apiUrl);
}
}

