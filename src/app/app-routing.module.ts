import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';

const routes: Routes = [
  {path:'',component:CarComponent},
  {path:'cars',component:CarComponent},
  {path:'cars/brands/:brandId',component:CarComponent},
  {path:'cars/colors/:colorId',component:CarComponent},
  {path:'carDetail/:carId',component:CarDetailComponent},
  {path:'cars/brands/:brandId/colors/:colorId',component:CarComponent},
  { path: 'carDetail/cartItem/:carId', component: CartDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
