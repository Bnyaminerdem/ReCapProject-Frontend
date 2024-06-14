import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../models/url';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { ResponseList } from '../models/responseList';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = URL + 'payments/';
  constructor(private httpClient: HttpClient) {}

  pay(payment: Payment): Observable<ResponseList> {
    let newPath = this.url + 'pay';
    return this.httpClient.post<ResponseList>(newPath, payment);
  }

  delete(payment: Payment): Observable<ResponseList> {
    let newPath = this.url + 'delete';
    return this.httpClient.post<ResponseList>(newPath, payment);
  }

  getAllByCustomerId(customerId: number) {
    let newPath = this.url + 'getAllByCustomerId?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Payment>>(newPath);
  }

  checkIfThisCardIsAlreadySavedForThisCustomer(payment: Payment): Observable<ResponseList> {
    return this.httpClient.post<ResponseList>(this.url + "checkIfThisCardIsAlreadySavedForThisCustomer", payment);
  }

  add(payment: Payment): Observable<ResponseList> { 
    return this.httpClient.post<ResponseList>(this.url + "add", payment);
  }
}
