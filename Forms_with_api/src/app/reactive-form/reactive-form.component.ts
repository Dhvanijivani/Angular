import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WineserService } from '../wineser.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit {
  mywine: FormGroup;
  id: any;
  data: any;

  constructor(private fb: FormBuilder, private wineservice: WineserService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.mywine = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      age: ['', [Validators.required]],
      date: ['', [Validators.required]],
      flavour: [[], [Validators.required]],
      size: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
    this.route.queryParams.subscribe((queryParams: any) => {
      this.id = queryParams['id'];
    });
    if (this.id)
      this.getUser(this.id);
  }

  flavourList: any[] = [
    { id: 0, name: 'Chardonnay', value: "Chardonnay" },
    { id: 1, name: 'Pinot noir', value: "Pinot noir" },
    { id: 2, name: 'Red wine', value: "Red wine" },
    { id: 3, name: 'Sparkling wine', value: "Sparkling wine" },
    { id: 4, name: 'Rosé wine', value: "Rosé wine" }
  ]
  onSubmit() {
    let flavourLists = this.flavourList.filter(x => x.checked).map(ele => ele.name)
    this.mywine.get('flavour').setValue(flavourLists);
    this.mywine.value['isReactiveForm'] = true;
    if (this.id) {
      this.wineservice.updateUser(this.id, this.mywine.value).subscribe(() => {
        this.mywine.reset();
        this.router.navigate(['list']);
      })

    } else {
      this.wineservice.sumbituser(this.mywine.value).subscribe((result: any) => {
        this.mywine.reset();
        this.router.navigate(['list']);
      });
    }


  }
  getUser(id: any) {
    this.wineservice.getuser().subscribe((result: any) => {
      this.data = result;
      this.mywine.patchValue(this.data.find((x: { id: any; }) => x.id == this.id))
      this.flavourList.forEach(ele => {
        if (this.mywine.value.flavour.includes(ele.name)) ele.checked = true;
      })
    });
  }

}
