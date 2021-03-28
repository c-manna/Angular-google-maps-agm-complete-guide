import { Component, OnInit, VERSION } from "@angular/core";
import { MouseEvent, LatLngLiteral } from "@agm/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
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
        textColor: "green",
        fontWeight: "bold",
        textSize: "24px",
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
      //return { text: markers.length + " Hotels " + 'from $' + min, index: 1 };
      //return { text: `<span class="cluster"> ${markers.length} + " Hotels " + 'from $' + ${min}, index: 1</span>` };
      return {
        text: markers.length,
        index: 1
      };
      // index: 1 -> for green icon
      // index: 2 -> for red icon
    }
  };
  public markers = new BehaviorSubject<any[]>(null);

  ngOnInit(): void {
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

  centerChange(coords: LatLngLiteral) {
    //console.log(event);
    this.centerLatitude = coords.lat;
    this.centerLongitude = coords.lng;
  }

  clickedMarker(label: string, index: number) {
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
      //this.loader = false;
      //console.log(this.centerLatitude, this.centerLongitude)
      // do something with centerLatitude/centerLongitude
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
