import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarDetailService } from '../../services/car-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from '../../models/carDetail';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {


  imageUrl = 'https://localhost:44362/Uploads/Images/';
  carDetails:CarDetail[]=[] ;

  constructor(private carDetailService:CarDetailService,private activatedRoute :ActivatedRoute
    ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetails(params["carId"])
      }
    })
  }

  getCarDetails(carId:Number){
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.carDetails=response.data
    })
  }

  getCarImage(imagePath: string): string {
    if (imagePath) {
      return 'https://localhost:44310/Uploads/Images/' + imagePath
    } else {
      return 'https://localhost:44310/Uploads/Images/DefaultCarImage.jpg';
    }
  }
  getDefaultCarImage():string{
    return 'https://localhost:44310/Uploads/Images/DefaultCarImage.jpg';
  }


}