import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl ="https://localhost:44383/api/brands/getall"


  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
}
}