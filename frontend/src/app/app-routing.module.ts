import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/common_components/login/login.component';
import { CoHeaderComponent } from './integrations/m3_integration/co-header/co-header.component';
import { UsersComponent } from './components/common_components/users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'coHeader',
    component: CoHeaderComponent,
  },
  {
    path: 'user',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
