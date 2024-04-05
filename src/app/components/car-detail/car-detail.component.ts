import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarDetailService } from '../../services/car-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from '../../models/carDetail';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent implements OnInit {


  imageUrl = 'https://localhost:44383/Uploads/Images/';
  carDetails:CarDetail[]=[] ;
  cartItems:CartItem[]=[];
  itemLoaded :boolean;
  rentalMessage: string = '';
  rentDate : Date | null = null;
  returnDate : Date | null = null;
  rentalAddForm : FormGroup;
  
  constructor(private carDetailService:CarDetailService,
    private activatedRoute :ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService,
    private carService:CarService,
    private rentalService:CarDetailService,
    private formBuilder:FormBuilder
    ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetails(params["carId"])
      }
    })
  }

  getCarDetails(carId:Number){
    this.carDetailService.getCarDetailsById(carId).subscribe(response=>{
      this.carDetails=response.data
    })
  }

  getCarImage(imagePath: string): string {
    if (imagePath) {
      return 'https://localhost:44383/Uploads/Images/' + imagePath
    } else {
      return 'https://localhost:44383/Uploads/Images/DefaultCarImage.jpg';
    }
  }
  getDefaultCarImage():string{
    return 'https://localhost:44383/Uploads/Images/DefaultCarImage.jpg';
  }

addToCart(carDetail:CarDetail){
    if(carDetail.carId===8){
      this.toastrService.error("Araç sepete eklenemedi", "Araç başkası tarafından kiralanmış durumda",{
        progressBar:true
      })
    }else{
      console.log(carDetail)
      this.cartService.addToCart(carDetail);
      this.toastrService.success("Araç sepete eklendi",carDetail.brandName+" "+carDetail.carName,{
        progressBar:true
      })
    }

  }
}