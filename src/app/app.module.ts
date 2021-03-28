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
		  apiKey: 'AIzaSyCnn-_D68N95BaSpYRYn1E3N_DHGs1vz0Y',
		  language: "en",
		  libraries: ['places','geometry']
		})
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}