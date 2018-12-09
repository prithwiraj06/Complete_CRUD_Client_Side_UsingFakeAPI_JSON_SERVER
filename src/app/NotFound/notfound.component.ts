import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    templateUrl:'./notfound.component.html'
})
export class NotFoundComponent
{
    constructor(private _router:Router){

    }
    backToList(){
        this._router.navigate(['/employeeList']);
    }
}