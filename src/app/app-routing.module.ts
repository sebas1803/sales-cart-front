import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SalesDashboardComponent } from './components/sales-dashboard/sales-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sales',
    pathMatch: 'full'
  },
  {
    path: 'sales',
    component: SalesDashboardComponent,
    title: 'Sales dashboard'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Sales dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
