import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Worker} from '../interfaces/Worker'
import {Role} from '../interfaces/Role'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angularProject';
  status = 0;
  workers : any;
  roles : any;
  constructor(private http: HttpClient) { }
  showWorkersClicked() : void{
    this.status = 0;    
    this.http.get<Worker[]>("/assets/workers.json")
    .subscribe((workers) => {this.workers = workers;})
  }
  showRolesClicked() : void{
    this.status = 1;
    this.http.get<Worker[]>("/assets/workers.json")
    .subscribe((workers) => {this.workers = workers;});
    this.http.get<Role[]>("/assets/roles.json")
    .subscribe((roles) => {this.roles = roles;
    this.roles.forEach((r:Role,i:number)=>{
      let sum = 0, count = 0;
      this.workers.filter((w:Worker) => w.roleId === r.roleId)
      .forEach((w:Worker) => {
        sum += w.salary;
        count++;
      })
      r.avg = sum/count;
    })});
  }
}
