import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginResponse, ReliefRequest} from '../models/disaster-relief-request.model'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  public checkLogin(username : string, password : string){
    return this.http.post<LoginResponse>(
      "https://uga-hacks.vercel.app/api/login/",
      {"username": username, "password": password}
      )
  }
}
