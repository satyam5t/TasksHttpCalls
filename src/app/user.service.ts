import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Model} from './model'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private ht:HttpClient) { }
  getUser():Observable<Model[]>{
    return this.ht.get<Model[]>("http://localhost:3000/users",{responseType:"json"})
  }
  postUser(addUser:Model):Observable<Model>{
    return this.ht.post<Model>("http://localhost:3000/users/",addUser,{responseType:"json"})
  }
  updateUser(editUser:Model):Observable<Model>{
    return this.ht.put<Model>("http://localhost:3000/users/"+editUser.id,editUser,{responseType:"json"})
  }
  deleteUser(id:number):Observable<string>{
    return this.ht.delete<string>("http://localhost:3000/users/"+id)
  }
}
