import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {

  brands : Brand[] = []
  currentBrand : Brand;
  filterBrandText=""

  constructor(private brandService : BrandService){}

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=> {
      this.brands = response.data
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }
  
  clearCurrentBrand(){ this.currentBrand = null }

  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return 'list-group-item active';

    }
    else{
      return 'list-group-item';
    }
    
}

getAllBrandClass(){
  if(!this.currentBrand){
    return "list-group-item active"
  }else{
    return "list-group-item"
  }
}
}
