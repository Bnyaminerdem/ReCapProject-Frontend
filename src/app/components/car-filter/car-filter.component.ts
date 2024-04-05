import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { Car } from '../../models/car';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { CarService } from '../../services/car.service';


@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit{

  brands: Brand[] = []
  colors: Color[] = []
  cars: Car[] = [];
  isDataLoaded = false
  selectedBrandId: number | null = null
  selectedColorId: number | null = null
  routeLink =""
  brandFilter:number;
  colorFilter:number;


  constructor(private brandService: BrandService, private colorService: ColorService, private carService:CarService) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
      this.isDataLoaded = true
    })
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
      this.isDataLoaded = true
    })
  }

  changeButtonClass() {
    if (this.selectedBrandId || this.selectedColorId) {
      return "btn btn-success"
    } else {
      return "btn btn-success disabled"
    }
  }

  changeRouteLink() {
    if (this.selectedBrandId !== null && this.selectedColorId !== null) {
      this.routeLink = "/cars/brands/" + this.selectedBrandId + "/colors/" + this.selectedColorId
      return this.routeLink
    } else if (this.selectedBrandId == null && this.selectedColorId !== null) {
      this.routeLink = "/cars/colors/" + this.selectedColorId
      return this.routeLink
    } else if (this.selectedBrandId !== null && this.selectedColorId == null) {
      this.routeLink = "/cars/brands/" + this.selectedBrandId
      return this.routeLink
    } else {
      this.routeLink = ""
      return this.routeLink
    }
  }
}