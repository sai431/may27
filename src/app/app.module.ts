import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GymComponent } from './gym/gym.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FunctionHallComponent } from './function-hall/function-hall.component';
import { ServiceAvailableComponent } from './service-available/service-available.component';
import { FoodComponent } from './food/food.component';
import { DecorationComponent } from './decoration/decoration.component';
import { MiscelenousComponent } from './miscelenous/miscelenous.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { HospitalComponent } from './hospital/hospital.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';


@NgModule({
  declarations: [
    AppComponent,
    GymComponent,
    FunctionHallComponent,
    ServiceAvailableComponent,
    FoodComponent,
    DecorationComponent,
    MiscelenousComponent,
    ApartmentComponent,
    HospitalComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   

  ],
  providers: [
    provideClientHydration(),
    //provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


