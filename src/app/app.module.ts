import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Login/login.component';
import { HomeComponent } from './Home/home.component';
import { AdminComponent } from './Admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { Service } from './Service/service.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, LoginComponent, HomeComponent, AdminComponent],
  bootstrap: [AppComponent],
  providers: [Service],
})
export class AppModule {}
