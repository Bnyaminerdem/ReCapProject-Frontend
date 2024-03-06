import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarResponseList } from '../models/carResponseList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl ="https://localhost:44383/api/cars/getall"

  constructor(private httpClient:HttpClient) { }

getCars():Observable<CarResponseList> {
  return this.httpClient.get<CarResponseList>(this.apiUrl);
}
}

