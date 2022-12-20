import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
 hh1=true;hh2=false;hh3=false;hh4=false

 reltext1(){
    this.hh1=true;this.hh2=false;this.hh3=false;this.hh4=false
 }

 reltext2(){
  this.hh1=false;this.hh2=true;this.hh3=false;this.hh4=false
  }

  reltext3(){
    this.hh1=false;this.hh2=false;this.hh3=true;this.hh4=false
  }

  reltext4(){
    this.hh1=false;this.hh2=false;this.hh3=false;this.hh4=true
  }

}
