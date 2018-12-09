import { PipeTransform, Pipe } from "@angular/core";
import { Employee } from "src/Models/employee.model";
@Pipe({
    name:'employeeFilter'
})
export class EmployeeNameFilterPipe implements PipeTransform
{
    transform(employees:Employee[],searchTerm:string) :Employee[]
    {
        if(!employees || !searchTerm)
        {
            return employees;
        }
        else
        {
            return employees.filter(emp=>emp.name.toLowerCase().indexOf(searchTerm.trim().toLowerCase()) !=-1)
        }
    }
}