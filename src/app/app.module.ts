import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { AgmCoreModule } from "@agm/core";
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  imports: [
    BrowserModule,
    AgmJsMarkerClustererModule,
    AgmSnazzyInfoWindowModule,
   AgmCoreModule.forRoot({
		  apiKey: 'AIzaSyCDhjF3LNn2qqYUivCkiyYD8lQMAzihz7I',
		  language: "en",
		  libraries: ['places','geometry']
		})
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}