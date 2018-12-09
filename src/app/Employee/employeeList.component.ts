import { Component, OnInit } from "@angular/core";
import { Employee } from "../../Models/employee.model";
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedEmployeeListModel } from "../../ResolveGaurd/resolvedList.model";

@Component({
    selector: 'employeeList',
    templateUrl: 'employeeList.component.html',
    styleUrls: ['employeeList.component.css']
})
export class EmployeeListComponent implements OnInit {

    employees: Employee[];
    filteredEmployee: Employee[];
    error:string =null;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
        const resolvedEmployeeListData:Employee[]|string = this._activatedRoute.snapshot.data['employeeListPrefetchData'];
        if(Array.isArray(resolvedEmployeeListData)){
            this.employees = resolvedEmployeeListData;
        }
        else{
            this.error=resolvedEmployeeListData;
        }
        this.filteredEmployee=this.employees;
        if (this._activatedRoute.snapshot.queryParamMap.has('searchTerm')) {
            this.searchTerm = this._activatedRoute.snapshot.queryParamMap.get('searchTerm');
        }
        else {
            this.filteredEmployee = this.employees;
        }
    }
    ngOnInit() {
        
    }
    private _searchTerm: string;
    get searchTerm(): string {
        return this._searchTerm;
    }
    set searchTerm(value: string) {
        this._searchTerm = value;
        this.filteredEmployee = this.filterEmployeeByName(this._searchTerm);

    }
    filterEmployeeByName(empname: string) {
        return this.employees.filter(employee => employee.name.toLowerCase().indexOf(empname.trim().toLowerCase()) != -1);
    }
    //for changing employee name
    // changeEmployeeName() {
    //     this.employees[0].name = "Ram";
    //     this.filteredEmployee = this.filterEmployeeByName(this.searchTerm);
    //     // const newEmployeeArray :Employee[]=Object.assign([],this.employees);
    //     // newEmployeeArray[0].name='Pankaj';
    //     // this.employees=newEmployeeArray;
    // }

    onDeleteButtonClicked(id:number){
        const employeeId = this.filteredEmployee.findIndex(e=>e.id === id);        
        this.filteredEmployee.splice(employeeId,1);
    }
}