import { Routes } from '@angular/router';
import { TenderListComponent } from './components/tender-list/tender-list.component';
import { TenderDetailsComponent } from './components/tender-details/tender-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tenders', pathMatch: 'full' },
  { path: 'tenders', component: TenderListComponent },
  { path: 'tenders-details/:id', component: TenderDetailsComponent },
];
