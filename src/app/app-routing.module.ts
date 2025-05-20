// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SurveysComponent } from './surveys/surveys.component';
import { SurveyComponent } from './survey/survey.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { addSurveyComponent } from './create-survey/create-survey.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: "surveys", component: SurveysComponent, canActivate: [AuthGuard] },
  {
    path: 'survey/:title',
    component: SurveyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-survey',
    component: addSurveyComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' } // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
