import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { UtilService } from '../util.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  progessbar=false
  progessbars=false

  mess: string='';
  formData = new FormData();

  constructor(private router:Router,private http: HttpClient,private uservice: UtilService,private formBuilder:FormBuilder) { }

  empidPattern="^([0-9]|[1-2][0-9]|[3][0-5])$";
  userNamePattern="^[a-zA-Z0-9 ]{1,30}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  loginfrm!:FormGroup
  passwordsMatching: boolean = false;
  isConfirmPasswordDirty: boolean = false;
  confirmPasswordClass: string = 'form-control';

  ngOnInit(): void {
    this.loginfrm = this.formBuilder.group({
      Username: new FormControl('', [Validators.required, Validators.pattern(this.userNamePattern)]),
      Password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      cpassword: new FormControl('',[Validators.required]),
      Qualification: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]), 
    })

    console.log("secong")
    this.loginfrm.controls['cpassword'].valueChanges.subscribe((val) => {
      if (this.loginfrm.controls['Password'].value === val) {
        this.passwordsMatching = true;
        this.confirmPasswordClass = 'form-control is-valid';
      } else {
        this.passwordsMatching = false;
        this.confirmPasswordClass = 'form-control is-invalid'
      }
    })

  }

  get regCard() {
    return this.loginfrm.controls;
  }
  isFormSaved = false;
  saveCardDetails()
  {
    this.isFormSaved = true;
    if (this.loginfrm.invalid) {
    return;
    }

    console.log('Form has Been Saved Successfully');
    console.log('this is formdata',this.loginfrm.value)
    this.uservice.register('api/addUser/?username=' + this.loginfrm.value.Username + 
    '&email=' + this.loginfrm.value.Email + 
     '&qualification=' + this.loginfrm.value.Qualification + '&password=' + this.loginfrm.value.Password)
    .subscribe((response) => {
          //  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          alert(" You are Successfully Registered ")
            this.router.navigate(['/']);  // ********************************************************************************************
        },
        (error) => {
          //  this.alertService.error(error);
          //  this.loading = false;
          this.mess=error.error
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        
    });
   

  }


  formdata:FormData=new FormData();
  uploadedFiles: any[] = [];

  message:string='';
  fileName = '';

  // uploadquestionsExcel(files:FileList){
 
  //   const myformdata: FormData = new FormData();
  //   myformdata.append('Questionsmaster', files[0]);


  uploadquestionsExcel(files:FileList){

    this.progessbar=true
    debugger
    //const myformdata: FormData = new FormData();
    //const file:File=event.target.files[0];
    console.log("hi");
    
this.loginfrm.controls['Username'].setValue(this.loginfrm.get('FirstName')?.value);

    this.formData.append('Resume', files[0],files[0].name);
   

    //this.formdata=myformdata
    console.log("files ",this.formData)
    setTimeout(() => {
      this.progessbar=false
      this.progessbars=true

    }, 2000);
    

  }


  onUpload(event:any) {
    debugger
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }


  }

}
