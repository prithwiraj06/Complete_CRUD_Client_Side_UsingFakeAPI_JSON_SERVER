import {Injectable} from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Employee } from 'src/Models/employee.model';
import { Observable,of } from 'rxjs';
import { EmployeeListService } from 'src/Services/employeeList.service';
import { ResolvedEmployeeListModel } from './resolvedList.model';
import {catchError,map} from 'rxjs/operators'
@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string>
{
    constructor(private _employeeListService:EmployeeListService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] |string > 
    {
        return this._employeeListService.getAllEmployees()
        .pipe(
           // map((employeeList)=> new ResolvedEmployeeListModel(employeeList)),
            catchError((err:string) => of(err) )
        );
    }
}