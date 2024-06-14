import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RentalDetail } from '../models/rentalDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { PaymentService } from './payment.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseList } from '../models/responseList';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl: string = "https://localhost:44383/api/rentals/";

  constructor(
    private httpClient: HttpClient,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl + "getrentaldetails");
  }

  getRentals(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + "getdetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  checkAvailability(carId: number, rentDate: Date, returnDate: Date): Observable<any> {
    let newPath = `${this.apiUrl}checkAvailability?carId=${carId}&rentDate=${rentDate.toISOString()}&returnDate=${returnDate.toISOString()}`;
    return this.httpClient.get<any>(newPath);
  }

  add(rental: RentalDetail): Observable<ResponseList> {
    return this.httpClient.post<ResponseList>(this.apiUrl + "add", rental);
  }

  payAndRent(payment: Payment, rent: RentalDetail): Observable<any> {
    return this.paymentService.pay(payment).pipe(
      switchMap(response => {
        return this.add(rent).pipe(
          map(rentResponse => {
            this.toastrService.success(rentResponse.message);
            this.toastrService.success(response.message);
            return response;
          }),
          catchError(rentResponseError => {
            this.toastrService.error(rentResponseError.error.message);
            throw rentResponseError;
          })
        );
      }),
      catchError(responseError => {
        this.toastrService.error(responseError.error.message);
        return of(responseError);
      })
    );
  }
}
