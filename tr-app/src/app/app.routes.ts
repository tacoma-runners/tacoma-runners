import { Routes } from '@angular/router';
import { RunsListComponent } from './components/runs-list/runs-list.component';
import { HomeComponent } from './components/home/home.component';
import { Saturday5kComponent } from './components/saturday5k/saturday5k.component';
import { RegisterComponent } from './components/register/register.component';
import { RunDetailsComponent } from './components/run-details/run-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'runs-list', component: RunsListComponent },
  { path: 'saturday5k', component: Saturday5kComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details/:id', component: RunDetailsComponent }
];

export default routes;
