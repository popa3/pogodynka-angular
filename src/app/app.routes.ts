import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { AirComponent } from './components/air/air.component';

//import { AirComponent } from './components/air/air.component';


export const routes: Routes = [
    { path: 'home', component: WeatherComponent },
    { path: 'air', component: AirComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'weather', redirectTo: '/home' },
];