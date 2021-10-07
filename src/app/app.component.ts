import { Component } from '@angular/core';
import {Model} from './model';
import {UserService} from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tasks';
getForm:Model[];
addUser:Model=new Model();
editUser:Model=new Model();
editIndex:number=null;
deleteUser:Model=new Model();
deleteIndex:number=null;

  constructor(private s1:UserService){}

  ngOnInit(){
    this.s1.getUser().subscribe((response:any)=>{
      this.getForm=response;
    })
  }
  onSaveClick($event){
    this.s1.postUser(this.addUser).subscribe((response)=>{
      this.addUser=response;
      this.addUser.id=response.id;
      this.addUser.firstName=response.firstName;
      this.addUser.lastName=response.lastName;
      this.addUser.userName=response.userName;
      this.addUser.age=response.age;
      this.addUser.salary=response.salary;
      this.addUser.password=response.password;
      this.getForm.push(this.addUser);

    })
  }
  onEditClick($event,index:number){
   
this.editUser.id=this.getForm[index].id;
this.editUser.firstName=this.getForm[index].firstName;
this.editUser.lastName=this.getForm[index].lastName;
this.editUser.userName=this.getForm[index].userName;
this.editUser.age=this.getForm[index].age;
this.editUser.salary=this.getForm[index].salary;
this.editIndex=index;
  }
  onUpdateClick(){

    this.s1.updateUser(this.editUser).subscribe((response:Model)=>
    {
      this.editUser=response;
     var p:Model=new Model();
p.id=response.id;
p.firstName=response.firstName;
p.lastName=response.lastName;
p.userName=response.userName;
p.password=response.password;
p.age=response.age;
p.salary=response.salary;
this.getForm[this.editIndex]=p;
})
  }
onDeleteClick($event,index:number){
this.deleteIndex=index;
this.deleteUser.id=this.getForm[index].id;
this.deleteUser.firstName=this.getForm[index].firstName;
this.deleteUser.lastName=this.getForm[index].lastName;
this.deleteUser.userName=this.getForm[index].userName;
this.deleteUser.age=this.getForm[index].age;
this.deleteUser.salary=this.getForm[index].salary;
this.deleteUser.password=this.getForm[index].password;
}
onDeleteConfirm(){
  this.s1.deleteUser(this.deleteUser.id).subscribe((response)=>{
    this.getForm.splice(this.deleteIndex,1)
    this.deleteUser.id=null;
    this.deleteUser.firstName=null;
    this.deleteUser.lastName=null;
    this.deleteUser.userName=null;
    this.deleteUser.age=null;
    this.deleteUser.salary=null;
    this.deleteUser.password=null;
  })
}
}