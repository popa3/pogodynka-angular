import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './services/weather.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({ 
      theme: {
        preset: Aura
      } 
    }),
    importProvidersFrom(FormsModule),
    WeatherService,
    provideHttpClient()
  ]
};
