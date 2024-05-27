import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymComponent } from './gym/gym.component';
import { FunctionHallComponent } from './function-hall/function-hall.component';
import { ServiceAvailableComponent } from './service-available/service-available.component';
import { FoodComponent } from './food/food.component';
import { DecorationComponent } from './decoration/decoration.component';
import { MiscelenousComponent } from './miscelenous/miscelenous.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { HospitalComponent } from './hospital/hospital.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: 'gym', component: GymComponent },
  { path: 'apt', component: ApartmentComponent },
  { path: 'terms', component: TermsAndConditionsComponent },
  { path: 'hosp', component: HospitalComponent },
  { path: 'fhall', component: FunctionHallComponent },
  { path: 'service1', component: FoodComponent },
  { path: 'service2', component: DecorationComponent},
  { path: 'service3', component: MiscelenousComponent },
  { path: 'service', component:ServiceAvailableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
