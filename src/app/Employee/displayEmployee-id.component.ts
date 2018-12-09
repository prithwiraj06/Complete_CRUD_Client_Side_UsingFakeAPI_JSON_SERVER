import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeListService } from 'src/Services/employeeList.service';
import { Employee } from 'src/Models/employee.model';
@Component({
    templateUrl:'./displayEmployee-id.component.html',
    styleUrls:['./displayEmployee-id.component.css']
})
export class DisplayEmpolyeeBasedOnId implements OnInit
{
    employeeId:number;
    employee:Employee;
    constructor(private _activatedRoute:ActivatedRoute,private _employeeService:EmployeeListService,private _router:Router){

    }
    ngOnInit(){
      this._activatedRoute.paramMap.subscribe(params=>{
           this.employeeId = +params.get('id');
            this._employeeService.getEmployeeById(this.employeeId).subscribe(data=>{
                this.employee= data;
            },error=>{
                console.log(error);
            });
       })
       
    }
    viewNextEmployee(){
        if(this.employeeId<103){
            this.employeeId =+this.employeeId + 1;
        }
        else{
            this.employeeId=101;
        }        
        this._router.navigate(['employees',this.employeeId]);
    }
}