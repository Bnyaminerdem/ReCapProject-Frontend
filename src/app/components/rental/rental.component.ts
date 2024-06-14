import { Component, OnInit } from '@angular/core';
import { RentalDetail } from '../../models/rentalDetail';
import { CarDetail } from '../../models/carDetail';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit {

  rentalDetails : RentalDetail[] = [];
  carDetails:CarDetail[];

  constructor(private rentalService:RentalService){}
  ngOnInit(): void {
    this.getRentalDetails();
  }
  getRentalDetails(){
    this.rentalService.getRentalDetails().subscribe(response=>{
      this.rentalDetails = response.data
    });
  }
  }