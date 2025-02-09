import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse, ReliefRequest} from '../models/disaster-relief-request.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = "https://uga-hacks.vercel.app/api/"
  constructor(private http : HttpClient) { }

  public checkLogin(username : string, password : string){
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/api/login/`,
      {"username": username, "password": password}
      )
  }

  public registerUser(username : string, password: string, email: string, firstName: string, lastName: string){
    return this.http.post(`${this.apiUrl}/signup/`, {
      "username":username,
      "password":password,
      "email":email,
      "first_name":firstName,
      "last_name":lastName
    })
  }
}
