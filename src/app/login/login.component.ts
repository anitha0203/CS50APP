import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  val=false;

  constructor(private router:Router,private route:ActivatedRoute, private utilservice: UtilService) { }
  password!:string;
  mess:any
  users:any;message!:string;
  pass!:String
  details:any
  d:any
  user:any

  ngOnInit(): void {

  }

  loginfrm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required])
  })
  get regCard() {
    return this.loginfrm.controls;
  }
  isFormSaved = false;
  saveDetails()
  {
    this.message=''
    this.isFormSaved = true;
    if (this.loginfrm.invalid) {
    return;
    }
    console.log(this.loginfrm.value)
    this.utilservice.login()
    .pipe(first())
      .subscribe({ next:(users)   => {
        this.d=users
        for(var i=0;i<this.d.length;i++){
          if(this.d[i].username == this.loginfrm.value.name && this.d[i].password == this.loginfrm.value.password )
          {
            this.val = true;
            console.log('success ')
            this.router.navigate(['/home'])
          }
        }
        localStorage.setItem('user',JSON.stringify(users))
         if(!this.val){
          this.message='Wrong Credentials'
         }
      },
      error: error => {
    
         this.message='Wrong Credentials'
      }
    })
  }

  messs(){
    this.message=""
  }

}
