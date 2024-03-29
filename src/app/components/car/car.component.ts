import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { HttpClient } from '@angular/common/http';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  carDetails : CarDetail[]= []
  dataLoaded:boolean = false;


  constructor(private carDetailService :CarDetailService,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarDetailsByBrandId(params["brandId"])
      }
      else if(params["colorId"]){
        this.getCarDetailsByColorId(params["colorId"])
      }
      else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe(response=>{
      this.carDetails= response.data
      this.dataLoaded=true
    })
  }
  getCarDetailsByBrandId(brandId:number){
    this.carDetailService.getCarDetailsByBrandId(brandId).subscribe(response=>{
      this.carDetails= response.data
      this.dataLoaded=true
    })
  }
  getCarDetailsByColorId(colorId:number){
    this.carDetailService.getCarDetailsByColorId(colorId).subscribe(response=>{
      this.carDetails= response.data
      this.dataLoaded=true
    })
  }

  getCarImagePath(carDetail: CarDetail): string {
    if (carDetail.ImagePath && carDetail.ImagePath.length > 0) {
      return 'https://localhost:44383/Uploads/Images/' + carDetail.ImagePath[0].imagePath;
    } else {
     
      return 'https://localhost:44383/Uploads/Images/DefaultCarImage.jpg';
    }
  }
}


