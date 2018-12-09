import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './Employee/employeeList.component';
import {RouterModule,Routes} from '@angular/router';
import { CreateEmployeeComponent } from './Employee/createEmployee.component';
import {FormsModule} from '@angular/forms';
import {BsDatepickerModule} from '../../node_modules/ngx-bootstrap/datepicker';
import {SelectRequiredValidatorDirective} from '../Shared/selectListRequired.directive';
import { ConfirmEqualValidatorDirective } from '../Shared/confirmPassword-equal-validator.directive';
import { EmployeeListService } from '../Services/employeeList.service';
import { DisplayEmployeeListComponent } from './Employee/displayEmployeeList.component';
import {CreateEmployeeCanDeactivateGaurd} from './Employee/createEmployee-can-deactivate-gaurd.service';
import { DisplayEmpolyeeBasedOnId } from './Employee/displayEmployee-id.component';
import { EmployeeNameFilterPipe } from './customPipes/employee-filter.pipe';
import { EmployeeListResolverService } from 'src/ResolveGaurd/employeeListResolver.service';
import { NotFoundComponent } from './NotFound/notfound.component';
import { EmployeeListCanActiveGuardService } from 'src/CanActivateGaurd/employeeList-canActivate-guard.service';
import { AccordianResuableComponent } from '../Shared/Resuable-Accordian/resuable-accordian.component';


const appRoutes:Routes=[
  {
    path:'employeeList',
    component:EmployeeListComponent,
    resolve:{'employeeListPrefetchData':EmployeeListResolverService}     
  },
  {
    path : 'editEmployee/:id',
    component:CreateEmployeeComponent,
    canDeactivate:[CreateEmployeeCanDeactivateGaurd]
  },
  {
    path:'employees/:id',
    component:DisplayEmpolyeeBasedOnId,
    canActivate:[EmployeeListCanActiveGuardService]  
  },
  {path : '',redirectTo:'/employeeList',pathMatch:'full'},
  {path:'notfound',component:NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayEmployeeListComponent,
    DisplayEmpolyeeBasedOnId,
    EmployeeNameFilterPipe,
    NotFoundComponent,
    AccordianResuableComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(appRoutes),FormsModule,BsDatepickerModule.forRoot(),HttpClientModule
  ],
  providers: [
    EmployeeListService,
    CreateEmployeeCanDeactivateGaurd,
    EmployeeListResolverService,
    EmployeeListCanActiveGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
