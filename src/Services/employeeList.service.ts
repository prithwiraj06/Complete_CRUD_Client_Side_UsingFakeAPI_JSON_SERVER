import { Injectable, ErrorHandler } from '@angular/core';
import { Employee } from 'src/Models/employee.model';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch'

@Injectable()
export class EmployeeListService extends ErrorHandler {
    private employeeList: Employee[];
    baseUrl: string = 'http://localhost:3000/employees';
    constructor(private _httpClient: HttpClient) {
        super();
    }
    getAllEmployees(): Observable<Employee[]> {
        return this._httpClient.get<Employee[]>(this.baseUrl).pipe(catchError(this.handleError), delay(2000));
        //.catch(this.handleError)
        //return of( this.employeeList).pipe(delay(2000));
    }
    handleError(errorResponse: HttpErrorResponse): Observable<any> {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error("Client side error ", errorResponse.error.message);
        }
        else {
            console.log("Server side error ", errorResponse);
        }
        return throwError("Some problems occurred while processing your request and we are working on it please try again");
    }
    getEmployeeById(id: number): Observable<Employee> {
        return this._httpClient.get<Employee>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }
    addEmployee(employee: Employee): Observable<Employee> {
        return this._httpClient.post<Employee>('http://localhost:3000/employees', employee,
            {
                headers: new HttpHeaders({
                    'content-type': 'application/json'
                })
            }
        ).pipe(catchError(this.handleError));
    }
    updateEmployee(employee: Employee): Observable<void> {
        return this._httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee,
            {
                headers: new HttpHeaders({
                    'content-type': 'application/json'
                })
            });
    }
    deleteEmployeeById(id: number) :Observable<void>{
        return this._httpClient.delete<void>(`${this.baseUrl}/${id}`).pipe(catchError(this.handleError));
    }

}