import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RunsListComponent } from './components/runs-list/runs-list.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'runs-list', component: RunsListComponent },
  { path: 'info', component: InfoComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
