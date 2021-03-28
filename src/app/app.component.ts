import {
  Component,
  OnInit,
  VERSION,
  NgZone,
  ViewChild,
  ElementRef
} from "@angular/core";
import { MouseEvent, LatLngLiteral } from "@agm/core";
import { BehaviorSubject } from "rxjs";
import { MapsAPILoader } from "@agm/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild("search", { static: false }) searchElementRef: ElementRef;
  name = "Angular " + VERSION.major;
  // google maps zoom level
  map_zoom: number = 4;
  clulster_max_zoom = 4;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  minClusterSize = 2;
  openedWindow: number = -1;
  centerLatitude = this.lat;
  centerLongitude = this.lng;

  mapOptions = {
    styles: [
      {
        url: "./assets/images/cluster.png",
        width: 70,
        height: 50,
        textColor: "rED",
        fontWeight: "bold",
        textSize: "14px",
        fontFamily: "nunito",
        lineHeight: "12px",
        paddingTop: "8px",
        backgroundSize: "cover"
      }
    ],
    calculator: markers => {
      for (let i = 0; i < markers.length; i++) {
        // you have access all the markers from each cluster
      }
      return {
        text: markers.length + " MARKERS",
        index: 1
      };
      // index: 1 -> for green icon
      // index: 2 -> for red icon
    }
  };
  public markers = new BehaviorSubject<any[]>(null);
  public searchControl: FormControl;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit(): void {
    //create search FormControl
    this.searchControl = new FormControl();
    this.searchControl.setValue("EUROPE");
    //set current position
    //this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.map_zoom = 12;
        });
      });
    });
    let items = [
      {
        lat: 51.673858,
        lng: 7.815982,
        label: "A",
        event_info: "info of A",
        draggable: false
      },
      {
        lat: 51.373858,
        lng: 7.215982,
        label: "B",
        event_info: "info of B",
        draggable: false
      },
      {
        lat: 51.723858,
        lng: 7.895982,
        label: "C",
        event_info: "info of C",
        draggable: false
      },
      {
        lat: 53.723858,
        lng: 8.895982,
        label: "D",
        event_info: "info of D",
        draggable: false
      },
      {
        lat: 54.723858,
        lng: 12.895982,
        label: "E",
        event_info: "info of E",
        draggable: false
      },
      {
        lat: 21.723858,
        lng: 75.895982,
        label: "F",
        event_info: "info of F",
        draggable: false
      },
      {
        lat: 41.723858,
        lng: 32.895982,
        label: "G",
        event_info: "info of G",
        draggable: false
      },
      {
        lat: 55.723858,
        lng: 34.895982,
        label: "H",
        event_info: "info of H",
        draggable: false
      },
      {
        lat: 56.723858,
        lng: 45.895982,
        label: "I",
        event_info: "info of I",
        draggable: false
      },
      {
        lat: 59.723858,
        lng: 75.895982,
        label: "J",
        event_info: "info of J",
        draggable: false
      }
    ];
    this.markers.next(items);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map_zoom = 12;
      });
    }
  }

  centerChange(coords: LatLngLiteral) {
    //console.log(event);
    this.centerLatitude = coords.lat;
    this.centerLongitude = coords.lng;
  }

  clickedMarker(label: string, index: number) {
    this.openedWindow = index;
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    /* this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }); */
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  mapReady(map) {
    map.setOptions({
      zoomControl: "true",
      zoomControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
      }
    });
    //this.loader = true;
    map.addListener("dragend", () => {
      //console.log(this.centerLatitude, this.centerLongitude)
      // do something with centerLatitude/centerLongitude
      //api call to load dynamic marker for your application
      //this.loader = false;
    });
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id; // alternative: check if id is in array
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
