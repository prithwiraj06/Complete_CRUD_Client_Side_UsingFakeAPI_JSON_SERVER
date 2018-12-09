import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../Models/department.model';
import { Employee } from '../../Models/employee.model'
import { BsDatepickerConfig } from 'node_modules/ngx-bootstrap/datepicker'
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeListService } from '../../Services/employeeList.service'

@Component({
    templateUrl: './createEmployee.component.html'
})
export class CreateEmployeeComponent implements OnInit {
    @ViewChild('employeeForm') public createEmployeeVariable: NgForm;
    photoPath: boolean = false;
    employee: Employee;
    panelTitle: string;

    bsdatepickerconfig: Partial<BsDatepickerConfig>;
    constructor(private _employeeListService: EmployeeListService, private _router: Router, private _activatedRoute: ActivatedRoute) {
        this.bsdatepickerconfig = Object.assign({},
            {
                containerClass: "theme-dark-blue",
                showWeekNumbers: false,
                dateInputFormat: "DD/MM/YYYY"
            })

    }
    departments: Department[] = [
        { id: 1, name: 'HR' },
        { id: 2, name: 'IT' },
        { id: 3, name: 'Finance' },
        { id: 4, name: 'Admin' }
    ];
    ngOnInit() {
        this._activatedRoute.paramMap.subscribe(parameterMap => {
            const employeeId = +parameterMap.get('id');
            this.getEmployee(employeeId);
        })
    }
    getEmployee(id: number) {
        if (id === 0) {
            this.employee = {
                id: null,
                name: null,
                isactive: null,
                gender: null,
                imagePath: null,
                dateofbirth: null,
                email: '',
                phonenumber: null,
                contactprefrences: null,
                department: 0
            };
            this.panelTitle = "Create Employee";
            this.createEmployeeVariable.reset();
        }
        else {
            this.panelTitle = "Edit Employee";
            this._employeeListService.getEmployeeById(id).subscribe(data => {
                this.employee = data;
            }, error => {
                console.log(error);
            });
        }
    }
    toggleImage() {
        this.photoPath = !this.photoPath;
    }
    saveEmployee() {
        if (this.employee.id == null) {
            const newEmployee: Employee = Object.assign({}, this.employee);
            this._employeeListService.addEmployee(this.employee).subscribe(
                (data: Employee) => {
                    if (data) {
                        this.createEmployeeVariable.reset();
                        this._router.navigate(['employeeList']);
                    }
                },
                (error: any) => console.log(error));
        }
        else {
            this._employeeListService.updateEmployee(this.employee).subscribe(
                (data) => {
                    this.createEmployeeVariable.reset();
                    this._router.navigate(['employeeList']);
                },
                (error: any) => console.log(error));
        }
    }
}