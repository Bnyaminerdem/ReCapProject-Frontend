import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { HttpClient } from '@angular/common/http';
import { CarService } from '../../services/car.service';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent implements OnInit {

  carDetails : CarDetail[]= []
  dataLoaded:boolean = false;
  filterText = "";


  constructor(
    private carDetailService :CarDetailService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarByBrandAndColor(params["brandId"], params["colorId"]);
      }
      else if(params["brandId"]){
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

  getCarByBrandAndColor(brandId: number, colorId: number) {
    this.carDetailService.getCarByBrandAndColor(brandId, colorId).subscribe(response =>{
      this.carDetails = response.data
      this.dataLoaded = true
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
    if (carDetail.carImage && carDetail.carImage.length > 0 ) {
      const firstImagePath = carDetail.carImage[0].imagePath;
      return 'https://localhost:44383/Uploads/Images/' + firstImagePath;
    } else {
     
      return 'https://localhost:44383/Uploads/Images/DefaultCarImage.jpg';
    }
  }

  addToCart(carDetail:CarDetail) {
    this.toastrService.success("Sepete Eklendi",carDetail.carName)
   this.cartService.addToCart(carDetail);
  }
}


