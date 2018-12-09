import { Employee } from "../Models/employee.model";

export class ResolvedEmployeeListModel 
{
    constructor(public employeeList:Employee[],public error:any = null)
    {

    }
}