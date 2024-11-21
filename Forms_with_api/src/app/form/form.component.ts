import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WineserService } from '../wineser.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface WineField {
  id?: string;
  name: string;
  email: string;
  address: string;
  gender: string;
  phone: string;
  age: number;
  date: string;
  flavour: string[];
  size: string;
  type: string;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  flavourList: any[] = [
    { id: 0, name: 'Chardonnay', value: "Chardonnay" },
    { id: 1, name: 'Pinot noir', value: "Pinot noir" },
    { id: 2, name: 'Red wine', value: "Red wine" },
    { id: 3, name: 'Sparkling wine', value: "Sparkling wine" },
    { id: 4, name: 'Rosé wine', value: "Rosé wine" }
  ]
  wineForm: WineField = {
    name: '',
    email: '',
    address: '',
    gender: '',
    phone: '',
    age: 0,
    date: '',
    flavour: [],
    size: '',
    type: ''
  };
  id: any;
  data: any[];

  constructor(private wineservice: WineserService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams['id'];
    });
    if (this.id)
      this.getUser(this.id);

  }
  getUser(id: any) {
    this.wineservice.getuser().subscribe((result: any) => {
      this.data = result;
      this.wineForm = this.data.find((x: { id: any; }) => x.id == this.id);
      this.flavourList.forEach(ele => {
        if (this.wineForm.flavour.includes(ele.name)) ele.checked = true;
      })
    });
  }

  saveUser() {
    let flavourLists = this.flavourList.filter(x => x.checked).map(ele => ele.name)
    this.wineForm.flavour = flavourLists
    this.wineForm['isTemplateDriven'] = true;
    if (this.id) {
      this.wineservice.updateUser(this.id, this.wineForm).subscribe(() => {
        this.resetForm(true);
        this.router.navigate(['list']);
      })

    } else {
      this.wineservice.sumbituser(this.wineForm).subscribe((result: any) => {
        this.resetForm(true);
        this.router.navigate(['list']);
      });
    }


  }

  resetForm(isIdReset) {
    this.wineForm = {
      id: isIdReset ? null:this.id,
      name: '',
      email: '',
      address: '',
      gender: '',
      phone: '',
      age: 0,
      date: '',
      flavour: [],
      size: '',
      type: ''
    }
  }
}
