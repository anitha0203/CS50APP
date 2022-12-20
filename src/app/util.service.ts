import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  login(){
    return this.http.get('api/login')
  }

  register(user:any){
    console.log(user)
    return this.http.get(user)
  }
}
