import { Component, VERSION } from "@angular/core";
import { MouseEvent } from "@agm/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  // google maps zoom level
  zoom: number = 8;

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
        textColor: "#fff",
        fontWeight: "bold",
        textSize: "14px",
        fontFamily: "nunito",
        lineHeight: "12px",
        paddingTop: "8px",
        backgroundSize: "cover"
      }
    ],
    calculator: markers => {
      console.log(markers);
      let min = markers[0].label.text.replace(/\$/g, "");
      for (let i = 0; i < markers.length; i++) {
        // you have access all the markers from each cluster
        if (min > markers[i].label.text.replace(/\$/g, "")) {
          min = markers[i].label.text.replace(/\$/g, "");
        }
      }
      //return { text: markers.length + " Hotels " + 'from $' + min, index: 1 };
      //return { text: `<span class="cluster"> ${markers.length} + " Hotels " + 'from $' + ${min}, index: 1</span>` };
      return {
        text: `<span class="cluster"> ${
          markers.length
        } Properties from $${min}</span>`,
        index: 1
      };
      // index: 1 -> for green icon
      // index: 2 -> for red icon
    }
  };

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
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

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: "B",
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: "C",
      draggable: true
    }
  ];
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
