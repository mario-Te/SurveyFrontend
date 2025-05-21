import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SurveysComponent } from './surveys/surveys.component';
import { JwtInterceptor } from './services/interceptors.service';
import { SurveyComponent } from './survey/survey.component';
import { StatsBarComponent } from './components/stats-bar/stats-bar.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { AnalyzeResultComponent } from './components/analyze-result/analyze-result.component';
import { ProfileComponent } from './profile/profile.component';
import { addSurveyComponent } from './create-survey/create-survey.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    SurveysComponent,
    SurveyComponent,
    StatsBarComponent,
    CreateSurveyComponent,
    AnalyzeResultComponent,
    ProfileComponent,
    addSurveyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [AuthService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
