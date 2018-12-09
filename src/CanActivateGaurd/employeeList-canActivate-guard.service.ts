import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { EmployeeListService } from "src/Services/employeeList.service";
import { Observable, of } from "../../node_modules/rxjs";
import { map, catchError } from "../../node_modules/rxjs/operators";
@Injectable()
export class EmployeeListCanActiveGuardService implements CanActivate
{
    constructor(private _router:Router,private _employeeListService:EmployeeListService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean>
    {
        return this._employeeListService.getEmployeeById(+route.paramMap.get('id')).pipe(
            map(employee =>{
                const employeeExists = !!employee;
                if(employeeExists)
                {
                    return true;
                }
                else
                {
                    this._router.navigate(['/notfound']);
                    return false;
                }
            } ),
        catchError((err)=>{
            console.log(err);
            return of(false);
        }
    ));
    }
}