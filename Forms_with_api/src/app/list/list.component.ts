import { Component, OnInit } from '@angular/core';
import { WineserService } from '../wineser.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  data: any[];
  id: any;
  constructor(private wineservice: WineserService, private router: Router) { }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.wineservice.getuser().subscribe((result: any) => {
      this.data = result;
      console.log(this.data);
    });
  }

  onEdit(data: any) {
    if(data.isTemplateDriven) this.router.navigate(['form'], { queryParams: { id: data.id }, queryParamsHandling: 'merge' });
    if(data.isReactiveForm) this.router.navigate(['reactive'], { queryParams: { id: data.id }, queryParamsHandling: 'merge' })
  }

  onDelete(id: any) {
    this.wineservice.deleteUser(id).subscribe((result) => {
      this.getUser();
    });
  }
}
