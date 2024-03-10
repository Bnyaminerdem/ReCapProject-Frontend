import { Injectable } from '@angular/core';
import { ApiUrl } from '../models/url';
import { HttpClient } from '@angular/common/http';
import { CarImage } from '../models/carImage';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  url = ApiUrl+"carimages/"
  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.url+"getall");
  }

  getCarImagesByCarId():Observable<ListResponseModel<CarImage>>{
    return this.httpClient.get<ListResponseModel<CarImage>>(this.url+"getbycarid");
  }
}
