import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment';
import { LocalStorageService } from '../../services/local-storage.service';
import { RentalDetail } from '../../models/rentalDetail';
import { RentKey } from '../../models/constants/local-storage-key';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-pay-with-saved-cards',
  templateUrl: './pay-with-saved-cards.component.html',
  styleUrl: './pay-with-saved-cards.component.css'
})
export class PayWithSavedCardsComponent {
  payments:Payment[];
  currentRent:RentalDetail
  constructor(
    private paymentService:PaymentService,
    private rentalService:RentalService,
    private localStorageService:LocalStorageService
  ){}

  ngOnInit(): void {
    this.getCurrentRent()
    this.getAllByCustomerId()
  }

  payWithSavedCard(payment:Payment){
   this.rentalService.payAndRent(payment,this.currentRent)
  }

  getAllByCustomerId(){
    this.paymentService.getAllByCustomerId(this.currentRent.customerId).subscribe(response=>{
      this.payments = response.data
    })
  }

  getCurrentRent(){
    let currentRent = this.localStorageService.getWithType<RentalDetail>(RentKey)
    if (currentRent  !== null){
      this.currentRent = currentRent
    }
  }
}
