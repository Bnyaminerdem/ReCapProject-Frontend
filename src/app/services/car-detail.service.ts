import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  private apiUrl:string = "https://localhost:44383/api/cars/getcardetails"
  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl)
  }
  getCarDetailsByCarId(carId:Number):Observable<ListResponseModel<CarDetail>>{
    var url = this.apiUrl + "bycarid/?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(url)
  }
  getCarDetailsByBrandId(brandId:Number):Observable<ListResponseModel<CarDetail>>{
    var url = this.apiUrl + "bybrandid/?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(url)
  }
  getCarDetailsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    var url = this.apiUrl +"bycolorid/?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(url)
  }
}
