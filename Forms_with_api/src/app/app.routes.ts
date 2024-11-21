import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

export const routes: Routes = [
  {
    path:'', component:FormComponent
  },
  {
    path:'form', component:FormComponent
  },
  {
    path:'list', component:ListComponent
  },
  {
    path:'reactive', component:ReactiveFormComponent
  }

];
