import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  apiUrl = "https://uga-hacks.vercel.app/api/"
  constructor(private http : HttpClient) { }

  public updateComment(id : string,content : string){
    return this.http.put(`${this.apiUrl}comment/${id}}`, {"content":content})
  }

  public deleteComment(id : string,content : string){
    return this.http.delete(`${this.apiUrl}comment/${id}}`)
  }

  public postComment(username : string, relief_request : string, content : string){
    return this.http.post(`${this.apiUrl}comment/`, {
      "username":username,
      "relief_request":relief_request,
      "content":content
    })
  }

}
