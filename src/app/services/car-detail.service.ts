import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  private apiUrl:string = "https://localhost:44383/api/cars/"
  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl + "getcardetails")
  }
  getCarDetailsById(carId:Number):Observable<ListResponseModel<CarDetail>>{
    var url = this.apiUrl + "getcardetailsbyid/?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(url)
  }
  getCarDetailsByBrandId(brandId:Number):Observable<ListResponseModel<CarDetail>>{
    var url = this.apiUrl +"getcardetailsbywithbrandid/?brandId="+brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(url)
  }
  getCarDetailsByColorId(colorId:Number):Observable<ListResponseModel<CarDetail>>{
    var url = this.apiUrl +"getcardetailsbywithcolorid/?colorId="+colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(url)
  }
  
  getCarByBrandAndColor(brandId:number, colorId:number): Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl + "getcarbybrandandcolor?brandId=" + brandId + '&colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
}
