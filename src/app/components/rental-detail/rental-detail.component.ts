import { Component, OnInit } from '@angular/core';
import { RentalDetail } from '../../models/rentalDetail';
import { RentalDetailService } from '../../services/rental-detail.service';
import { CarDetail } from '../../models/carDetail';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrl: './rental-detail.component.css'
})
export class RentalDetailComponent implements OnInit {

  rentalDetails : RentalDetail[] = [];
  carDetails:CarDetail[];

  constructor(private rentalDetailService:RentalDetailService){}
  ngOnInit(): void {
    this.getRentalDetails();
  }
  getRentalDetails(){
    this.rentalDetailService.getRentalDetails().subscribe(response=>{
      this.rentalDetails = response.data
    });
  }
  }