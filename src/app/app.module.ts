import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { AgmCoreModule } from "@agm/core";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AgmJsMarkerClustererModule,
    AgmSnazzyInfoWindowModule,
   AgmCoreModule.forRoot({
		  apiKey: 'AIzaSyAdOm0iSDuwMF8XT9T1WJgN0Fsi0B8RDAo',
		  language: "en",
		  libraries: ['places','geometry']
		})
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}