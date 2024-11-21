import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WineserService {

  constructor(private http:HttpClient) { }

  url="http://localhost:3000/users"

  getuser(){
    return this.http.get(this.url);
  }
  getuserbyid(id:any){
    return this.http.get(this.url,id);
  }

  sumbituser(obj:any){
    return this.http.post(this.url,obj);
  }
  updateUser(id:any,obj:any){
    return this.http.put(`${this.url}/${id}`,obj);
  }
  deleteUser(id:any){
    return this.http.delete(`${this.url}/${id}`);
  }
}
