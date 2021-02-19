import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { url } from 'inspector';
import { UserService } from 'src/app/services/user/user.service';
declare var mapboxgl;
declare var MapboxGeocoder;

@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.page.html',
  styleUrls: ['./property-map.page.scss'],
})
export class PropertyMapPage implements OnInit {

  map
  arry1 = []
  arry2 = []
  arry3 = []
  mode

  img="../../../../../assets/icon/apartment1/outside/2.jfif"

  constructor(private router: Router, private userservice: UserService) { }

  ngOnInit() {

    let coodinates: any = this.userservice.getMapDetails();
    this.mode=this.userservice.mode;


    coodinates['lng'].forEach(a => {
      this.arry1.push(a);
    });
    coodinates['lat'].forEach(a => {
      this.arry2.push(a);
    });
    coodinates['names'].forEach(a => {
      this.arry3.push(a);
    });


    mapboxgl.accessToken = 'pk.eyJ1IjoidGVhcnoiLCJhIjoiY2toa2dqcmM3MWIwNjJ5cDlqazhyYzdteiJ9.jYlNVUpq4tkE1jva-mtyqg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [28.218370, -25.731340],
      zoom: 13
    });
    this.reSize();

    this.geoCoder();
    this.controls();
    this.markers();


    // this.displayType();

  }

  reSize() {

    this.map.on("load", () => {
      this.map.resize();
    });

  }

  // Search location
  geoCoder() {

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }))
  }

  controls() {
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }));
  }

  markers() {

    /* let arry1 = [28.218370, 28.212370, 28.215370];
     let arry2 = [-25.731340, -25.735340, -25.737340];
     let arry3 = ["Librito flets availeble", "D_head flets availeble", "vivis flets availeble"];*/
    let arry4 = ['../../../../../assets/icon/apartment1/outside/2.jfif',
      '../../../../../assets/icon/apartment1/outside/3.jpg', '../../../../../assets/icon/apartment1/outside/4.jfif']

    // 28.218370, -25.731340       
    for (let i = 0; i < 3; i++) {

      const innerHtmlContent = `<div style=" font-size: large;color : black;">
                  <h4 >${this.arry3[i]} </h4> </div>`;

      const divElement = document.createElement('div');
      const viewBtn = document.createElement('div');
      viewBtn.innerHTML = `<button style="border: 1px solid gray; width:'400px';" > View </button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(viewBtn);

      viewBtn.addEventListener('click', (e) => {
        // alert( arry3[i]);
         if (this.mode=='property') {
          this.router.navigate(['searched-property'])
         }
         if (this.mode=='car-wash') {
          this.router.navigate(['carwash-details'])
         }
        
      });

      var geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {
              'message': this.arry3[i],
              'iconSize': [45, 45]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [this.arry1[i], this.arry2[i]]
            }
          },
        ]
      };






      var map = this.map

      geojson.features.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage =el.style.backgroundImage ='url(https://placekitten.com/g/' +
        marker.properties.iconSize.join('/') +
        '/)';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({
            offset: 25
          }).setDOMContent(divElement))
          .addTo(map);
      });

    }








  }












  displayType() {
    var geojson = {
      'type': 'FeatureCollection',
      'features': [

        {
          'type': 'Feature',
          'properties': {
            'message': 'Foo',
            'iconSize': [60, 60]
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-66.324462890625, -16.024695711685304]
          }
        },

        {
          'type': 'Feature',
          'properties': {
            'message': 'Bar',
            'iconSize': [50, 50]
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-61.2158203125, -15.97189158092897]
          }
        },
        {
          'type': 'Feature',
          'properties': {
            'message': 'Baz',
            'iconSize': [40, 40]
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [-63.29223632812499, -18.28151823530889]
          }
        }
      ]
    };

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-65.017, -16.457],
      zoom: 5
    });

    // add markers to map
    geojson.features.forEach(function (marker) {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage =
        'url(https://placekitten.com/g/' +
        marker.properties.iconSize.join('/') +
        '/)';
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';

      el.addEventListener('click', function () {
        window.alert(marker.properties.message);
      });

      // add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });
  }



}


/*
    for (let i = 0; i < 3; i++) {

      const innerHtmlContent = `<div style=" min-width: 600px;font-size: large;color : black;">
                  <h4 >${arry3[i]} </h4> </div>`;

      const divElement = document.createElement('div');
      const viewBtn = document.createElement('div');
      viewBtn.innerHTML = `<button style="border: 1px solid gray; width:'400px';" > View </button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(viewBtn);

      viewBtn.addEventListener('click', (e) => {
        // alert( arry3[i]);
        this.router.navigate(['searched-property'])
      });

      let popUp = new mapboxgl.Popup({ maxWidth: '300px', })

      var marker = new mapboxgl.Marker()
        .setLngLat([arry1[i], arry2[i]])
        .setPopup(new mapboxgl.Popup({
          offset: 25
        }).setDOMContent(divElement)

        )
        .addTo(this.map);
    }


*/