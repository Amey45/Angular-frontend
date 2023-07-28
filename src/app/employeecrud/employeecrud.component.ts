import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employeecrud',
  templateUrl: './employeecrud.component.html',
  styleUrls: ['./employeecrud.component.scss'],
})
export class EmployeecrudComponent {
  EmployeeArray: any[] = [];
  currentEmployeeID = '';

  name: string = '';
  address: string = '';
  phone: string = '';

  constructor(private http: HttpClient) {
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.http
      .get('http://localhost:8000/user/getAll')
      .subscribe((resultData: any) => {
        console.log(resultData);
        this.EmployeeArray = resultData.data;
      });
  }

  setDelete(data: any) {
    this.http
      .delete("http://localhost:8000/user/delete/" + data._id)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee deleted successfully');
        this.getAllEmployee();
      });
  }

  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;

    this.currentEmployeeID = data._id;
  }

  UpdateRecords() {
    let bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .patch(
        'http://localhost:8000/user/update/' + this.currentEmployeeID,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Employee updated successfully');
        this.getAllEmployee();
        this.name = '';
        this.address = '';
        this.phone = '';
      });
  }

  save() {
    if (this.currentEmployeeID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  register() {
    let bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .post('http://localhost:8000/user/create', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student registered successfully');
        this.getAllEmployee();
        this.name = '';
        this.address = '';
        this.phone = '';
      });
  }
}
