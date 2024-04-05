import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { HttpClient } from '@angular/common/http';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent implements OnInit {
  
  colors:Color[] = []
  currentColor: Color;
  filterColorText="";
  constructor(private colorService:ColorService){}
  
  
    ngOnInit(): void {
      this.getColors();
    }
  
    setCurrentColor(color:Color){
      this.currentColor = color
    }
  
    getColors(){
      this.colorService.getColors().subscribe(response=>{
        this.colors = response.data
      })
    }

    clearCurrentColor(){ this.currentColor = null }
  
    getCurrentColorClass(color:Color){
      if(color == this.currentColor){
        return 'list-group-item active';
  
      }
      else{
        return 'list-group-item';
      }
      
  }
  
  getAllColorClass(){
    if(!this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  
  }
  