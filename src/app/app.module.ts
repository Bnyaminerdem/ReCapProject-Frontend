import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations"
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { UserComponent } from './components/user/user.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';
import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { PaymentComponent } from './components/payment/PaymentComponent';
import { PayWithSavedCardsComponent } from './components/pay-with-saved-cards/pay-with-saved-cards.component';
import { RentalComponent } from './components/rental/rental.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    UserComponent,
    CarDetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    CartSummaryComponent,
    FilterColorPipePipe,
    FilterBrandPipePipe,
    CarFilterComponent,
    CartDetailComponent,
    PaymentComponent,
    PayWithSavedCardsComponent,
    RentalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right",
      progressAnimation:"decreasing"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
