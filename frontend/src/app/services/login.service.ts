import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ReliefRequest } from '../models/disaster-relief-request.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  // public checkLogin(username : string, password : string){
  //   return this.http.get()
  // }
}
