import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Payment } from '../../models/payment';
import { RentalDetail } from '../../models/rentalDetail';
import { RentKey } from '../../models/constants/local-storage-key';
import { FormIsMissing, SaveYourCreditCard } from '../../models/constants/messages';
import { RentalService } from '../../services/rental.service';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payFormGroup: FormGroup;
  customer: Customer | null = null;

  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPayFormGroup();
    this.loadCustomer();
  }

  createPayFormGroup() {
    this.payFormGroup = this.formBuilder.group({
      fullName: ["", Validators.required],
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  loadCustomer() {
    const rent: RentalDetail = this.localStorageService.get(RentKey);
    if (rent) {
      this.customer = { customerId: rent.customerId } as Customer; // assuming you have a Customer interface
    }
  }

  pay() {
    if (this.payFormGroup.valid) {
      const rent: RentalDetail = this.localStorageService.get(RentKey);
      if (rent) {
        const payment: Payment = Object.assign({ customerId: rent.customerId }, this.payFormGroup.value);

        this.paymentService.pay(payment).subscribe(
          (response) => {
            this.toastrService.success("Ödeme başarılı", "", { progressBar: true });
            this.router.navigate(['/cars']); // Ödeme sonrası yönlendirme
            this.askForSave(payment); // Ödeme sonrası kartı kaydetmeyi sor
          },
          (error) => {
            this.toastrService.error(error.error.message);
          }
        );
      } else {
        this.toastrService.error("Kiralama bilgisi bulunamadı.");
      }
    } else {
      this.toastrService.error(FormIsMissing);
    }
  }

  askForSave(payment: Payment) {
    this.paymentService.checkIfThisCardIsAlreadySavedForThisCustomer(payment).subscribe(response => {
      if (response.success && confirm(SaveYourCreditCard)) {
        this.paymentService.add(payment).subscribe(
          () => this.toastrService.success("Kart kaydedildi"),
          () => this.toastrService.error("Kart kaydedilemedi")
        );
      }
    });
  }
}
