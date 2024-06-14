import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CarDetail } from '../../models/carDetail';
import { CarDetailService } from '../../services/car-detail.service';
import { CarService } from '../../services/car.service';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../models/carItems';
import { CarImage } from '../../models/carImage';
import { CarImageService } from '../../services/car-ımage.service';
import { ToastrService } from 'ngx-toastr';
import { RentalDetail } from '../../models/rentalDetail';


@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

  cartItems:CartItem[]=[];
  carDetail:CarDetail[]=[];
  payamount:CartItem[]=[];
  baseUrl="https://localhost:44383/uploads/images/";

  constructor(private cardetailService:CarDetailService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastrService:ToastrService
    ){}

  ngOnInit(): void {
    this.getCart();
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response=>{
      this.carDetail = response.data
    })
  }

  getCart(){
    this.cartItems = this.cartService.list();
  }

  totalpay(cardetail:CarDetail){
    let item = CartItems.find(c=>c.carDetail.carId===cardetail.carId);
    if(item){
      item.payamount+=item.carDetail.dailyPrice
    }else{
      let cartItem = new CartItem();
      cartItem.payamount= cartItem.totalamount;
    }

  }

  removeFromCart(cardetail:CarDetail){
    this.cartService.removeFromCart(cardetail);
    this.toastrService.error(cardetail.brandName+" "+cardetail.carName +" "+"Sepetten Silindi","",{
      progressBar:true
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


  gotopay(){
    this.toastrService.info("Ödeme sayfasına yönlendirildiniz","",{
      progressBar:true
    })
  }


}