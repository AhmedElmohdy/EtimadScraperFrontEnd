import { Routes } from '@angular/router';
import { TenderListComponent } from './components/tender-list/tender-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tenders', pathMatch: 'full' },
  { path: 'tenders', component: TenderListComponent },
];
