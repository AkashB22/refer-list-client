import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signup/:uniqueId', component: SignUpComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'profile/:email', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
