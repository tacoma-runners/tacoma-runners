import { Routes } from '@angular/router';
import { RunsListComponent } from './components/runs-list/runs-list.component';
import { HomeComponent } from './components/home/home.component';
import { Saturday5kComponent } from './components/saturday5k/saturday5k.component';
import { RegisterComponent } from './components/register/register.component';
import { RunDetailsComponent } from './components/run-details/run-details.component';
import { LoginComponent } from './components/admin/login/login.component';
import { RunEditComponent } from './components/admin/run-edit/run-edit.component';
import { AuthenticationGuard } from './services/authentication.service';
import { RunCreateComponent } from './components/admin/run-create/run-create.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'runs-list', component: RunsListComponent },
  { path: 'saturday5k', component: Saturday5kComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'details/:id', component: RunDetailsComponent },
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin/edit/:id', component: RunEditComponent, canActivate: [AuthenticationGuard]},
  { path: 'admin/create', component: RunCreateComponent, canActivate: [AuthenticationGuard]},
];

export default routes;
