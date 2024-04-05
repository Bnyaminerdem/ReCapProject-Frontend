import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl ="https://localhost:44383/api/"

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
  let newPath=this.apiUrl + "Cars/getcardetailsbywithbrandid?brandId="+brandId
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}
getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
  let newPath=this.apiUrl + "Cars/getcardetailsbywithcolorid="+colorId
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}
getCarDetails(carId:number):Observable<ListResponseModel<CarDetail>>{
  let newPath=this.apiUrl + "Cars/getcardetailsbyid?carId="+carId
  return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}


}

