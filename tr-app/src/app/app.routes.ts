import { Routes } from '@angular/router';
import { RunsListComponent } from './components/runs-list/runs-list.component';
import { HomeComponent } from './components/home/home.component';
import { Saturday5kComponent } from './components/saturday5k/saturday5k.component';
import { RegisterComponent } from './components/register/register.component';
import { RunDetailsComponent } from './components/run-details/run-details.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RunEditComponent } from './components/admin/run-edit/run-edit.component';
import { RunCreateComponent } from './components/admin/run-create/run-create.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutComponent } from './components/about/about.component';
import { MerchComponent } from './components/merch/merch.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'runs-list', component: RunsListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'saturday5k', component: Saturday5kComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'merch', component: MerchComponent },
  { path: 'details/:id', component: RunDetailsComponent },
  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin/edit/:id',
    component: RunEditComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/create',
    component: RunCreateComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
];

export default routes;
